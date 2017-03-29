#!/usr/bin/env bash
minikube delete

echo "starting cluster"

minikube start --memory 5000 --cpus 4 --kubernetes-version v1.6.0-rc.1

echo "enabling addons"

minikube addons enable heapster

minikube addons enable ingress

echo "installing etcd operator"
kubectl create -f https://raw.githubusercontent.com/coreos/etcd-operator/master/example/deployment.yaml
kubectl rollout status -f https://raw.githubusercontent.com/coreos/etcd-operator/master/example/deployment.yaml

echo "installing registry"
kubectl apply -f k8s/registry.yml
kubectl rollout status deployment/registry

echo "installing etcd cluster"

kubectl create -f https://raw.githubusercontent.com/coreos/etcd-operator/master/example/example-etcd-cluster-nodeport-service.json


echo "creating pod-list etcd directory"
kubectl exec -it example-etcd-cluster-0000 apk update
kubectl exec -it example-etcd-cluster-0000 apk add ca-certificates
kubectl exec -it example-etcd-cluster-0000 apk update-ca-certificates
kubectl exec -it example-etcd-cluster-0000 apk add bash wget
kubectl exec -it example-etcd-cluster-0000 wget https://gist.githubusercontent.com/moondev/86ebfc39998049d3f0c10848f4c72c57/raw/62cb237a115d4884cec4c5d94751cf5586f44b4b/mkdir.sh
kubectl exec -it example-etcd-cluster-0000 chmod +x mkdir.sh
kubectl exec -it example-etcd-cluster-0000 /mkdir.sh

echo "building kubescale image"

docker build -t 127.0.0.1:30400/kubescale:latest .

echo "forwarding registry port"

registrypod=`kubectl get pods --selector=app=registry --output=jsonpath={.items..metadata.name}`


kubectl port-forward $registrypod 30400:5000 &
sleep 5
pfid=$!
echo "pushing kubecale image"
docker push 127.0.0.1:30400/kubescale:latest

echo "building set image"

docker build -t 127.0.0.1:30400/set:latest -f set/Dockerfile set

echo "pushing set iage"

docker push 127.0.0.1:30400/set:latest

sleep 2
echo "killing port-forward"

kill $pfid

echo "deploying kubescale and set"

kubectl apply -f k8s/set.yml
kubectl apply -f k8s/kubescale.yml