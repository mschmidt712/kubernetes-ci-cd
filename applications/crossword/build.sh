#!/bin/bash

TAG=`git rev-parse --short HEAD`
echo $TAG

docker build -t `minikube ip`:30912/services:$TAG .
docker push `minikube ip`:30912/services:$TAG


sed 's#__TAG__#'$TAG'#' k8s/deployment.yaml | kubectl apply -f -