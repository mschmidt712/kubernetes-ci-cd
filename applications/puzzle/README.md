=== puzzle server ===

## Kr8sswordz Puzzle Kubernetes CI / CD , Microservices Example

# setup
From the root directory of the repository, use 'npm run part1' to setup the minikube cluster.

### Building (Note: Lifecycle hooks in the k8s/deployment.yaml require the monitor-scale service to be up)
    Use or review <root>/scripts/puzzle.sh for build/deployment steps 

## Load application
Change MINIKUBEIP to your minikube ip and use the URL below to review the puzzle API

    http://puzzle.MINIKUBEIP.xip.io/explorer

