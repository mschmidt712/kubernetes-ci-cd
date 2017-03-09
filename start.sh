#minikube start --memory 10000 --cpus 2 --disk-size 50g

#docker login -u TOKEN -p 0u5gzdtjn3m8102lmjxnt8t87u 192.168.42.134:30861

# docker push 192.168.42.134:30861/nginx:latest

# sudo vim /usr/lib/systemd/system/docker.service # --insecure-registry="192.168.42.134:30861"

# deploy europa.192.168.42.134.xip.io:80/nginx:latest

#minikube start --vm-driver kvm --memory 10000 --cpus 4 --disk-size 50

#minikube addons enable heapster; minikube addons enable ingress