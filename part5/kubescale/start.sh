# # #!/usr/bin/env bash
# minikube delete

# echo "starting cluster"

# minikube start --memory 5000 --cpus 4 --kubernetes-version v1.6.0-rc.1

# # echo "enabling addons"

# # minikube addons enable heapster

# # minikube addons enable ingress

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

# echo "building kubescale image"

# docker build -t 127.0.0.1:30400/kubescale:latest .

# echo "building set image"

# docker build -t 127.0.0.1:30400/set:latest -f set/Dockerfile set



echo "forwarding registry port"

#minikubeip=`minikube ip`

#temp container for forwarding to registry
docker run -d --name socat-registry -p 4000:5000 chadmoon/socat:latest bash -c "socat TCP4-LISTEN:5000,fork,reuseaddr TCP4:192.168.99.108:30400"

sleep 5

echo "pushing kubescale image"
docker tag nginx:latest 127.0.0.1:4000/rad:latest
docker push 127.0.0.1:4000/rad:latest

echo "pushing set image"

# docker push 127.0.0.1:30400/set:latest

sleep 2
echo "killing port-forward"

docker stop socat-registry
docker rm socat-registry

# echo "deploying kubescale and set"

# kubectl apply -f k8s/set.yml
# kubectl apply -f k8s/kubescale.yml



# #temp container for forwarding to registry
# docker run -d --name socat-minikube -p 80:80 chadmoon/socat:latest bash -c "socat TCP4-LISTEN:80,fork,reuseaddr TCP4:$minikubeip:80"

# kubectl apply -f k8s/ing.yml