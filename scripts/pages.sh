docker build -t 127.0.0.1:30400/kr8sswordz:latest -f old/part2/pages/Dockerfile old/part2/pages

#Setup the proxy for the registry
docker stop socat-registry; docker rm socat-registry; docker run -d -e "REGIP=`minikube ip`" --name socat-registry -p 30400:5000 chadmoon/socat:latest bash -c "socat TCP4-LISTEN:5000,fork,reuseaddr TCP4:`minikube ip`:30400"

#Push the images
docker push 127.0.0.1:30400/kr8sswordz:latest

#Stop the registry proxy
docker stop socat-registry

# Create the deployment and service foddr the crossword server aka services
kubectl apply -f old/part2/pages/k8s/deployment.yaml; kubectl rollout status deployment/kr8sswordz
