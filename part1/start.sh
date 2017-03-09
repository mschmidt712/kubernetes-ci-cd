#minikube start --memory 10000 --cpus 2 --disk-size 50g

#docker login -u TOKEN -p 0u5gzdtjn3m8102lmjxnt8t87u 192.168.42.134:30861

# docker push 192.168.42.134:30861/nginx:latest

# sudo vim /usr/lib/systemd/system/docker.service # --insecure-registry="192.168.42.134:30861"

# deploy europa.192.168.42.134.xip.io:80/nginx:latest

sudo virsh net-start default
sudo virsh net-start docker-machines

minikube delete

rm -rf ~/.kube

minikube start --vm-driver kvm --memory 10000 --cpus 4 --disk-size 50g


#minikube addons enable heapster
#minikube addons enable ingress
#minikube start --vm-driver kvm --memory 10000 --cpus 4 --disk-size 50g

#curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl