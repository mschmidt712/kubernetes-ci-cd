## Kr8ssword Puzzle Kubernetes CI / CD , Microservices Example

# Setup
Go through part1. Ensure that:
 - europa is up and running

### Update pages/k8s/deployment.yaml to replace MINIKUBEIP with your minikube ip
    host: kr8sswordz.MINIKUBEIP.xip.io
    
### Update server/k8s/deployment.yaml to replace MINIKUBEIP with your minikube ip
    host: services.kr8sswordz.MINIKUBEIP.xip.io

## Manual steps to build and deploy pages
### Build and Push to Europa
    docker build -t `minikube ip`:30912/kr8sswordz:1.0.0 .
    docker push `minikube ip`:30912/kr8sswordz:1.0.0

### Make europa Repo public
Note: Replace MINIKUBEIP with your minikube ip

1) Go to http://europa.MINIKUBEIP.xip.io/repositories/kr8sswordz
2) Go to repository settings 
3) Select Public

## Manual steps to build and deploy services
### Build and Push to Europa
    docker build -t `minikube ip`:30912/services:1.0.0 .
    docker push `minikube ip`:30912/services:1.0.0

### Make europa Repo public
Note: Replace MINIKUBEIP with your minikube ip

1) Go to http://europa.MINIKUBEIP.xip.io/repositories/services
2) Go to repository settings 
3) Select Public

### Deploy to kubernetes
    kubectl apply -f server/k8s/deployment.yaml
    kubectl apply -f pages/k8s/deployment.yaml
        
## Automated script
    ./build.sh
    
## Load application
Change MINIKUBEIP to your minikube ip and load the application below

    http://kr8sswordz.MINIKUBEIP.xip.io/ 

