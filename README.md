# Kubernetes ci/cd whitepaper for Linux.com

 This readme is dynamically generated when the interactive tutorial is run

## Interactive tutorial version
* clone this repo

* Ensure you are starting with a clean slate: `minikube delete; minikube rm -rf ~/.minikube; rm -rf ~/.kube`

* run `npm install`

Begin the tutorial `npm start`

## Manual tutorial version

## Part 1


### Part 1

### Step1

Start up the cluster with minikibe

`minikube start --memory 6000 --cpus 2 --kubernetes-version v1.6.0`

### Step2

Enable addons

`minikube addons enable heapster; minikube addons enable ingress`

### Step3

Wait 20 seconds and view minikube dashboard

`sleep 20; minikube service kubernetes-dashboard --namespace kube-system`

### Step4

Deploy the public nginx image from DockerHub

`kubectl run nginx --image nginx --port 80`

### Step5

Create a service for deployment

`kubectl expose deployment nginx --type NodePort --port 80`

### Step6

Launch browser to test service

`minikube service nginx`

### Step7

Install registry

`kubectl apply -f manifests/registry.yml`

### Step8

Wait for registry to deploy

`kubectl rollout status deployments/registry`

### Step9

View registry UI

`minikube service registry-ui`

### Step10

Edit the contents of applications/hello-kenzan/index.html. This will open the file with the nano editor. When finished press ctrl + x to exit and confirm save.

`nano applications/hello-kenzan/index.html`

### Step11

We will now build the image with a special name that is pointing at our cluster registry.

`docker build -t 127.0.0.1:30400/hello-kenzan:latest -f applications/hello-kenzan/Dockerfile applications/hello-kenzan`

### Step12

Before we can push our image we need to set up a temporary proxy. This is a container that listens on 127.0.0.1:30400 and forwads to our cluster. By default the docker client can only push to non https via localhost.

`docker stop docat-registry; docker rm socat-registry; docker run -d -e "REGIP=`minikube ip`" --name socat-registry -p 30400:5000 chadmoon/socat:latest bash -c "socat TCP4-LISTEN:5000,fork,reuseaddr TCP4:`minikube ip`:30400"`

### Step13

We can now push our image.

`docker push 127.0.0.1:30400/hello-kenzan:latest`

### Step14

Stop the registry proxy.

`docker stop socat-registry;`

### Step15

Now that our image is on the cluster we can deploy the manifests

`kubectl apply -f applications/hello-kenzan/k8s/deployment.yaml`

### Step16

View the app

`minikube service hello-kenzan`## Part 2


### Part 2

### Step1

Install Jenkins

`kubectl apply -f manifests/jenkins.yml; kubectl rollout status deployment/jenkins`

### Step2

Get Jenkins admin password

`kubectl exec -it `kubectl get pods --selector=app=jenkins --output=jsonpath={.items..metadata.name}` cat /root/.jenkins/secrets/initialAdminPassword`

### Step3

Enter the admin password from above and choose "suggested plugins". Create a new job with type pipeline. Scroll down and under "pipeline script" choose "Pipeline script from SCM". Under SCM choose GIT. Fork repo and put "repository url" as your fork, such as https://github.com/kenzanlabs/kubernetes-ci-cd.git. Save and run the job.

`minikube service jenkins`

### Step4

View updated application

`minikube service hello-kenzan`

### Step5

Push a change to your fork. Run job again. View changes

`minikube service hello-kenzan`## Part 4


### Part 4

### Step1

Bootstrap etcd operator on the cluster

`scripts/etcd.sh`

### Step2

Run job to create etcd directory

`kubectl create -f manifests/etcd-job.yml`

### Step3

Check job status

`kubectl describe jobs/etcd-job`

### Step4

build kubescale image

`docker build -t 127.0.0.1:30400/kubescale:latest -f applications/kubescale/Dockerfile applications/kubescale`

### Step5

build scaling image

`docker build -t 127.0.0.1:30400/set:latest -f applications/kubescale/set/Dockerfile applications/kubescale/set`

### Step6

Start the registry proxy.

`docker stop socat-registry; docker rm socat-registry; docker run -d -e "REGIP=`minikube ip`" --name socat-registry -p 30400:5000 chadmoon/socat:latest bash -c "socat TCP4-LISTEN:5000,fork,reuseaddr TCP4:`minikube ip`:30400"`

### Step7

Push the kubescale image

`docker push 127.0.0.1:30400/kubescale:latest`

### Step8

Push the scaling image

`docker push 127.0.0.1:30400/set:latest`

### Step9

Stop the registry proxy

`docker stop socat-registry`

### Step10

Deploy kubescale

`kubectl apply -f applications/kubescale/k8s/kubescale.yml; kubectl rollout status deployment/kubescale`

### Step11

Deploy scaling set

`kubectl apply -f applications/kubescale/k8s/set.yml; kubectl rollout status deployment/set`

### Step12

View kubescale application

`minikube service kubescale`