#!/bin/bash

TAG=`git rev-parse --short HEAD`
echo $TAG

docker build --no-cache=true -t `minikube ip`:30912/monitor-scale:$TAG .
docker push `minikube ip`:30912/monitor-scale:$TAG
kubectl apply -f k8s/monitor-scale.yaml
