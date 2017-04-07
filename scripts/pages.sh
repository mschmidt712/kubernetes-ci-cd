#!/bin/bash

#Retrieve the latest git commit hash
TAG=`git rev-parse --short HEAD` 

#Build the docker image
docker build -t 127.0.0.1:30400/kr8sswordz:$TAG -f old/part2/pages/Dockerfile old/part2/pages

#Setup the proxy for the registry
docker stop socat-registry; docker rm socat-registry; docker run -d -e "REGIP=`minikube ip`" --name socat-registry -p 30400:5000 chadmoon/socat:latest bash -c "socat TCP4-LISTEN:5000,fork,reuseaddr TCP4:`minikube ip`:30400"

#Push the images
docker push 127.0.0.1:30400/kr8sswordz:$TAG

#Stop the registry proxy
docker stop socat-registry

# Create the deployment and service for the front end aka kr8sswordz
sed 's#127.0.0.1:30400/kr8sswordz:latest#127.0.0.1:30400/kr8sswordz:'$TAG'#' old/part2/pages/k8s/deployment.yaml | kubectl apply -f -
