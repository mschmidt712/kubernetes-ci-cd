#!/bin/bash

# echo "creating pod-list etcd directory"
# kubectl exec -it example-etcd-cluster-0000 apk update
# kubectl exec -it example-etcd-cluster-0000 apk add ca-certificates
# kubectl exec -it example-etcd-cluster-0000 apk update-ca-certificates
# kubectl exec -it example-etcd-cluster-0000 apk add bash wget
# kubectl exec -it example-etcd-cluster-0000 wget https://gist.githubusercontent.com/moondev/86ebfc39998049d3f0c10848f4c72c57/raw/62cb237a115d4884cec4c5d94751cf5586f44b4b/mkdir.sh
# kubectl exec -it example-etcd-cluster-0000 chmod +x mkdir.sh


kubectl exec -it example-etcd-cluster-0000 echo "#!/usr/bin/env bash\n\nexport ETCDCTL_ENDPOINT='http://example-etcd-cluster-client-service:2379'\nectdctl mkdir pod-list" > /mkd.sh
kubectl exec -it example-etcd-cluster-0000 chmod 0777 /mkd.sh

kubectl exec -it example-etcd-cluster-0000 cat /mkd.sh

# echo "building kubescale image"

# TAG=latest

# docker build -t 127.0.0.1:30400/kubescale:$TAG -f 

# # echo "building set image"

# cd set; docker build -t 127.0.0.1:30400/set:$TAG -f set/Dockerfile .


# echo "forwarding registry port"

# export MINIKUBEIP=`minikube ip`

# #temp container for forwarding to registry
# docker run -d -e "MINIKUBEIP=$MINIKUBEIP" --name socat-registry -p 30400:5000 chadmoon/socat:latest bash -c "socat TCP4-LISTEN:5000,fork,reuseaddr TCP4:$MINIKUBEIP:30400"

# sleep 5

# echo "pushing kubescale image"
# docker push 127.0.0.1:30400/kubescale:latest
# docker push 127.0.0.1:30400/set:latest

# echo "pushing set image"

# docker push 127.0.0.1:30400/set:latest

# sleep 2
# echo "killing port-forward"

# docker stop socat-registry
# docker rm socat-registry

# echo "deploying kubescale and set"

# kubectl apply -f k8s/kubescale.yml
# kubectl rollout status deployment/kubescale 

# kubectl apply -f k8s/set.yml
# kubectl rollout status deployment/set


# #temp container for forwarding to registry


# docker stop socat-minikube
# docker rm socat-minikube

# proxy container for ingress

# docker run -d -e "MINIKUBEIP=$MINIKUBEIP" --name socat-minikube -p 80:80 chadmoon/socat:latest bash -c "socat TCP4-LISTEN:80,fork,reuseaddr TCP4:$MINIKUBEIP:80"

# # kubectl apply -f k8s/ing.yml

# kubectl apply -f k8s/jenkins.yml
# kubectl rollout status deployments/jenkins

# sleep 10

# open http://$MINIKUBEIP:31980 || true
# xdg-open http://$MINIKUBEIP:31980 || true