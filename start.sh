#minikube start --memory 6000 --cpus 2 --disk-size 40g  --insecure-registry "europa.192.168.99.100.xip.io:80"

#docker login -u TOKEN -p 0u5gzdtjn3m8102lmjxnt8t87u 192.168.42.134:30861

# docker push 192.168.42.134:30861/nginx:latest

# sudo vim /usr/lib/systemd/system/docker.service # --insecure-registry="192.168.42.134:30861"

# deploy europa.192.168.42.134.xip.io:80/nginx:latest