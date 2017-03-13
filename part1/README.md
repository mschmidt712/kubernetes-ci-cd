start minikube

`minikube start --memory 4000`

once finished test status

`kubectl cluster-info`

enable addons

`minikube addon enable heapster; minikube enable ingress`

wait for all pods to finish deploying

`kubectl get pods --all-namespaces`

Deploy public image from dockerhub: https://hub.docker.com/_/nginx/

`kubectl run nginx image=nginx:latest`

get pod name

`kubectl get pods`

port forward to pod via name

`kubectl port-forward PODNAME 8888:80`

view running on http://localhost:8888

setup registry

`kubectl apply -f volumes.yml`

`kubectl apply -f mysql.yml`

`kubectl apply -f europa.yml`

wait for pods with `kubectl get pods`

get registry pod with `kubectl get pods`

`kubectl port-forward REGISTRYPOD 5000:80`

setup registry at `http://localhost:5000`
set /europa for storage. Generate token

login to registry

`docker login -u TOKEN -p TOKENHERE localhost:5000`

buld custom image locally first

`cd part1/hello-kenzan;`

`docker build -t localhost:30912/hellokenzan:latest .`

`docker push localhost:30912/hellokenzan:latest`

put minikube ip `minkube ip` in deployment.yaml

`kubectl apply -f k8s/deployment.yaml`

view at `http://hello-kenzan.MINIKUBEIP.xipio`