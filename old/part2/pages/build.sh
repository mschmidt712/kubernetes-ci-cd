#!/bin/bash

docker build -t `minikube ip`:30912/kr8sswordz:1.0.4 .
docker push `minikube ip`:30912/kr8sswordz:1.0.4
kubectl apply -f k8s/deployment.yaml