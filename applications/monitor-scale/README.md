=== monitor-scale server ===
This appication provides an API to track when servers go up and down, caching that data and sending the list of crossword servers to the frontend using websockets.  Additionally, this API provides an endpoint to scale the crossword deployment.

## Kr8sswordz Monitor-Scale Kubernetes CI / CD , Microservices Example

# setup
From the root directory of the repository, use 'npm run part1' to setup the minikube cluster.

### Building
    Use or review <root>/scripts/monitor-scale.sh for build/deployment steps 