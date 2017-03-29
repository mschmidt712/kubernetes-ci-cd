#!/usr/bin/env bash
# minikube delete

# echo "starting cluster"

# minikube start --memory 5000 --cpus 4 --kubernetes-version v1.6.0-rc.1

# # echo "enabling addons"

# # minikube addons enable heapster

# minikube addons enable ingress

# echo "installing etcd operator"
# kubectl create -f https://raw.githubusercontent.com/coreos/etcd-operator/master/example/deployment.yaml
# kubectl rollout status -f https://raw.githubusercontent.com/coreos/etcd-operator/master/example/deployment.yaml


# until kubectl get thirdpartyresource cluster.etcd.coreos.com
# do
#     echo "waiting for operator"
#     sleep 2
# done

# echo "installing registry"
# kubectl apply -f k8s/registry.yml
# kubectl rollout status deployment/registry

# echo "pausing for 10 seconds for operator to settle"
# sleep 10

# kubectl create -f https://raw.githubusercontent.com/coreos/etcd-operator/master/example/example-etcd-cluster.yaml

# echo "installing etcd cluster service"
# kubectl create -f https://raw.githubusercontent.com/coreos/etcd-operator/master/example/example-etcd-cluster-nodeport-service.json

# echo "waiting for etcd cluster to turnup"

# until kubectl get pod example-etcd-cluster-0002
# do
#     echo "waiting for etcd cluster to turnup"
#     sleep 2
# done

# sleep 5

# echo "creating pod-list etcd directory"
# kubectl exec -it example-etcd-cluster-0000 apk update
# kubectl exec -it example-etcd-cluster-0000 apk add ca-certificates
# kubectl exec -it example-etcd-cluster-0000 apk update-ca-certificates
# kubectl exec -it example-etcd-cluster-0000 apk add bash wget
# kubectl exec -it example-etcd-cluster-0000 wget https://gist.githubusercontent.com/moondev/86ebfc39998049d3f0c10848f4c72c57/raw/62cb237a115d4884cec4c5d94751cf5586f44b4b/mkdir.sh
# kubectl exec -it example-etcd-cluster-0000 chmod +x mkdir.sh
# kubectl exec -it example-etcd-cluster-0000 /mkdir.sh

echo "building kubescale image"

docker build -t 127.0.0.1:30400/kubescale:latest .

# echo "building set image"

# docker build -t 127.0.0.1:30400/set:latest -f set/Dockerfile set


echo "forwarding registry port"

export MINIKUBEIP=`minikube ip`

#temp container for forwarding to registry
docker run -d -e "MINIKUBEIP=$MINIKUBEIP" --name socat-registry -p 30400:5000 chadmoon/socat:latest bash -c "socat TCP4-LISTEN:5000,fork,reuseaddr TCP4:$MINIKUBEIP:30400"

sleep 5

echo "pushing kubescale image"
docker push 127.0.0.1:30400/kubescale:latest
#docker push 127.0.0.1:30400/set:latest

echo "pushing set image"

# docker push 127.0.0.1:30400/set:latest

sleep 2
echo "killing port-forward"

docker stop socat-registry
docker rm socat-registry

echo "deploying kubescale and set"

kubectl apply -f k8s/kubescale.yml
kubectl rollout status deployment/kubescale 

kubectl apply -f k8s/set.yml
kubectl rollout status deployment/set


#temp container for forwarding to registry


#docker stop socat-minikube
#docker rm socat-minikube

#proxy container for ingress

#docker run -d -e "MINIKUBEIP=$MINIKUBEIP" --name socat-minikube -p 80:80 chadmoon/socat:latest bash -c "socat TCP4-LISTEN:80,fork,reuseaddr TCP4:$MINIKUBEIP:80"

#kubectl apply -f k8s/ing.yml

# kubectl apply -f k8s/jenkins.yml
# kubectl rollout status deployments/jenkins

# sleep 10

# #open http://kubescale.127.0.0.1.xip.io || true
# #xdg-open http://kubescale.127.0.0.1.xip.io || true

# PODID=`kubectl get pods --selector=app=kubescale --output=jsonpath={.items..metadata.name}`

# echo "starting forward for $PODID"
# echo "open http://localhost:3434 to view kubescale"

# kubectl port-forward $PODID 3434:3000

sleep 2

open http://$MINIKUBEIP:31980

