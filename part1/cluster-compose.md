## Using cluster-compose instead of minikube

The only requirements are docker and kubectl

### Increase Docker memory settings to 4gb

Screenshot of settings for osx/windows here? Linux does not need this.

### Download and install kubectl

### Launch cluster

```
git clone https://github.com/moondev/cluster-compose.git; cd cluster-compose
sudo ./cluster-compose.sh up
```

### Start tutorial

```
git clone https://github.com/kenzanlabs/kubernetes-ci-cd.git; cd kubernetes-ci-cd
```

### setup registry

`kubectl apply -f volumes.yml`

`kubectl apply -f mysql.yml`

`kubectl apply -f europa.yml`

wait for pods with `kubectl get pods`

setup registry at `http://europa.127.0.0.1.xip.io`

set /europa for storage. 

Generate token on settigs page

login to registry

```
docker login -u TOKEN -p TOKENHERE 127.0.0.1:30912
```

build custom image locally first

`cd part1/hello-kenzan;`

`docker build -t 127.0.0.1:30912/hellokenzan:latest .`

`docker push 127.0.0.1:30912/hellokenzan:latest`

ensure image is pushed by viewing ui at `http://europa.127.0.0.1.xip.io`. 

In settings change private to public


`kubectl apply -f k8s/deployment.yaml`

view at `http://hello-kenzan.127.0.0.1.xip.io`

stop cluster with `./cluster-compose.sh down`