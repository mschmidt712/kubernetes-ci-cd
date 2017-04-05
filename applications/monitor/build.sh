#!/bin/bash

TAG=`git rev-parse --short HEAD`
echo $TAG

docker build -t `minikube ip`:30912/monitor-scale:$TAG .
docker push `minikube ip`:30912/monitor-scale:$TAG


sed 's#__TAG__#'$TAG'#' k8s/monitor-scale.yaml | kubectl apply -f -
