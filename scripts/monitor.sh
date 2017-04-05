docker build -t 127.0.0.1:30400/kubescale:latest -f applications/monitor/Dockerfile applications/monitor
docker build -t 127.0.0.1:30400/kubescale:latest -f applications/crossword/Dockerfile applications/crossword

#Setup the proxy for the registry
docker stop socat-registry; docker rm socat-registry; docker run -d -e "REGIP=`minikube ip`" --name socat-registry -p 30400:5000 chadmoon/socat:latest bash -c "socat TCP4-LISTEN:5000,fork,reuseaddr TCP4:`minikube ip`:30400"

#Push the images
docker push 127.0.0.1:30400/monitor-scale:latest
docker push 127.0.0.1:30400/services:latest

#Stop the registry proxy
docker stop socat-registry

# Create the deployment and service for the monitoring and scaling server
kubectl apply -f applications/monitor/k8s/monitor-scale.yaml; kubectl rollout status deployment/monitor-scale

# Create the deployment and service for the crossword server aka services
kubectl apply -f applications/crossword/k8s/deployment.yaml; kubectl rollout status deployment/services