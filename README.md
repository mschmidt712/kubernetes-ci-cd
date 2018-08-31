# Linux.com Kubernetes CI/CD Blog Series by Kenzan

The kubernetes-ci-cd project is [Kenzan's](http://techblog.kenzan.com/) crossword puzzle application that runs as several containers in Kubernetes (we call it the Kr8sswordz Puzzle). It showcases Kubernetes features like spinning up multiple pods and running a load test at scale. It also features Jenkins running on its own a container and a JenkinsFile script to demonstrate how Kubernetes can be integrated into a full CI/CD pipeline. 

To get it up and running, see the following week-by-week Linux.com blog posts, or simply follow the directions below. 

[Linux.com Part 1](https://www.linux.com/blog/learn/chapter/Intro-to-Kubernetes/2017/5/set-cicd-pipeline-kubernetes-part-1-overview)

[Linux.com Part 2](https://www.linux.com/blog/learn/chapter/Intro-to-Kubernetes/2017/6/set-cicd-pipeline-jenkins-pod-kubernetes-part-2)

[Linux.com Part 3](https://www.linux.com/blog/learn/chapter/intro-to-kubernetes/2017/6/run-and-scale-distributed-crossword-puzzle-app-cicd-kubernetes-part-3)

[Linux.com Part 4](https://www.linux.com/blog/learn/chapter/intro-to-kubernetes/2017/6/set-cicd-distributed-crossword-puzzle-app-kubernetes-part-4)

To generate this readme: `node readme.js`

## Prerequisites 

* Install VirtualBox
* Install the latest versions of Docker, Kubectl, and Minikube
* Clone this repository
* To ensure you are starting with a clean slate: `minikube delete; sudo rm -rf ~/.minikube; sudo rm -rf ~/.kube`

## Tutorial Steps

## Part 1

#### Step1

Start up the Kubernetes cluster with Minikube, giving it some extra resources.

`minikube start --memory 8000 --cpus 2 --kubernetes-version v1.11.0`

#### Step2

Enable the Minikube add-ons Heapster and Ingress.

`minikube addons enable heapster; minikube addons enable ingress`

#### Step3

View the Minikube Dashboard, a web UI for managing deployments.

`minikube service kubernetes-dashboard --namespace kube-system`

#### Step4

Deploy the public nginx image from DockerHub into a pod. Nginx is an open source web server that will automatically download from Docker Hub if it’s not available locally.

`kubectl run nginx --image nginx --port 80`

#### Step5

Create a service for deployment. This will expose the nginx pod so you can access it with a web browser.

`kubectl expose deployment nginx --type NodePort --port 80`

#### Step6

Launch a web browser to test the service. The nginx welcome page displays, which means the service is up and running.

`minikube service nginx`

#### Step7 
Delete the nginx deployment and service you created. 

`kubectl delete service nginx`

`kubectl delete deployment nginx`

#### Step8

Set up the cluster registry by applying a .yaml manifest file.

`kubectl apply -f manifests/registry.yaml`

#### Step9

Wait for the registry to finish deploying. Note that this may take several minutes.

`kubectl rollout status deployments/registry`

#### Step10

View the registry user interface in a web browser.

`minikube service registry-ui`

#### Step11

Let’s make a change to an HTML file in the cloned project. Open the /applications/hello-kenzan/index.html file in your favorite text editor. (For example, you could use nano by running the command 'nano applications/hello-kenzan/index.html' in a separate terminal). Change some text inside one of the `<p>` tags. For example, change “Hello from Kenzan!” to “Hello from Me!”. Save the file.

#### Step12

Now let’s build an image, giving it a special name that points to our local cluster registry.

`docker build -t 127.0.0.1:30400/hello-kenzan:latest -f applications/hello-kenzan/Dockerfile applications/hello-kenzan`

#### Step13

We’ve built the image, but before we can push it to the registry, we need to set up a temporary proxy. By default the Docker client can only push to HTTP (not HTTPS) via localhost. To work around this, we’ll set up a container that listens on 127.0.0.1:30400 and forwards to our cluster. First, build the image for our proxy container. 

`docker build -t socat-registry -f applications/socat/Dockerfile applications/socat`

#### Step14

Now run the proxy container from the newly created image. (Note that you may see some errors; this is normal as the commands are first making sure there are no previous instances running.)

``docker stop socat-registry; docker rm socat-registry; docker run -d -e "REG_IP=`minikube ip`" -e "REG_PORT=30400" --name socat-registry -p 30400:5000 socat-registry``

#### Step15

With our proxy container up and running, we can now push our image to the local repository.

`docker push 127.0.0.1:30400/hello-kenzan:latest`

#### Step16

The proxy’s work is done, so you can go ahead and stop it.

`docker stop socat-registry;`

#### Step17

With the image in our cluster registry, the last thing to do is apply the manifest to create and deploy the hello-kenzan pod based on the image.

`kubectl apply -f applications/hello-kenzan/k8s/deployment.yaml`

#### Step18

Launch a web browser and view the service.

`minikube service hello-kenzan`

#### Step19

Delete the hello-kenzan deployment and service you created. 

`kubectl delete service hello-kenzan`

`kubectl delete deployment hello-kenzan`

## Part 2


#### Step1

First, let's build the Jenkins image we'll use in our Kubernetes cluster.

`docker build -t 127.0.0.1:30400/jenkins:latest -f applications/jenkins/Dockerfile applications/jenkins`

#### Step2

Once again we'll need to set up the Socat Registry proxy container to push images, so let's build it (feel free to skip this step in case it already exists from Part 1). 

`docker build -t socat-registry -f applications/socat/Dockerfile applications/socat`

#### Step3

Run the proxy container from the image. 

``docker stop socat-registry; docker rm socat-registry; docker run -d -e "REG_IP=`minikube ip`" -e "REG_PORT=30400" --name socat-registry -p 30400:5000 socat-registry``

#### Step4

With our proxy container up and running, we can now push our Jenkins image to the local repository.

`docker push 127.0.0.1:30400/jenkins:latest`

#### Step5

The proxy’s work is done, so you can go ahead and stop it.

`docker stop socat-registry`

#### Step6

Deploy Jenkins, which we’ll use to create our automated CI/CD pipeline. It will take the pod a minute or two to roll out.

`kubectl apply -f manifests/jenkins.yaml; kubectl rollout status deployment/jenkins`

#### Step7

Open the Jenkins UI in a web browser.

`minikube service jenkins`

#### Step8

Display the Jenkins admin password with the following command, and right-click to copy it. 

``kubectl exec -it `kubectl get pods --selector=app=jenkins --output=jsonpath={.items..metadata.name}` cat /var/jenkins_home/secrets/initialAdminPassword``

#### Step9

Switch back to the Jenkins UI. Paste the Jenkins admin password in the box and click Continue. Click **Install Suggested Plugins** and wait for the process to complete. Plugins have been pre-downloaded during the Jenkins image build, so this step should finish fairly quickly. 

#### Step10

Create an admin user and credentials, and click **Save and Continue**. (Make sure to remember these credentials as you will need them for repeated logins.) On the Instance Configuration page, click **Save and Finish**. On the next page, click **Restart** (if it appears to hang for some time on restarting, you may have to refresh the browser window). Login to Jenkins. 

#### Step11

Before we create a pipeline, we first need to provision the Kubernetes Continuous Deploy plugin with a kubeconfig file that will allow access to our Kubernetes cluster. In Jenkins on the left, click on **Credentials**, select the **Jenkins** store, then **Global credentials (unrestricted)**, and **Add Credentials** on the left menu.

#### Step12

The following values must be entered precisely as indicated: 
- Kind: `Kubernetes configuration (kubeconfig)`
- ID: `kenzan_kubeconfig`
- Kubeconfig: `From a file on the Jenkins master`
- specify the file path: `/var/jenkins_home/.kube/config`

Finally click *Ok*.

#### Step13

We now want to create a new pipeline for use with our Hello-Kenzan app. Back on Jenkins home, on the left, click **New Item**. Enter the item name as "Hello-Kenzan Pipeline", select **Pipeline**, and click **OK**.

#### Step14

Under the Pipeline section at the bottom, change the **Definition** to be **Pipeline script from SCM**.

#### Step15

Change the **SCM** to **Git**.

#### Step16

Change the **Repository URL** to be the URL of your forked Git repository, such as `https://github.com/[GIT USERNAME]/kubernetes-ci-cd`. Click **Save**. On the left, click **Build Now** to run the new pipeline.

#### Step17

Now view the Hello-Kenzan application.

`minikube service hello-kenzan`

#### Step18

Push a change to your fork. Run job again. View the changes.

`minikube service hello-kenzan`

## Part 3

### Step1 

Initialize Helm. This will install Tiller (Helm's server) into our Kubernetes cluster. 

`helm init --wait --debug; kubectl rollout status deploy/tiller-deploy -n kube-system`

#### Step2

We will deploy the etcd operator onto the cluster using a Helm Chart. 

`helm install stable/etcd-operator --version 0.8.0 --name etcd-operator --debug --wait`

#### Step3

Deploy the etcd cluster and K8s Services for accessing the cluster. 

* `kubectl  create -f manifests/etcd-cluster.yaml`
* `kubectl  create -f manifests/etcd-service.yaml`

#### Step4

The crossword application is a multi-tier application whose services depend on each other. We will create three K8s Services ahead of time, so that the deployments are aware of them.

`kubectl apply -f manifests/all-services.yaml`

#### Step5

Now we're going to walk through an initial build of the monitor-scale application.

``docker build -t 127.0.0.1:30400/monitor-scale:`git rev-parse --short HEAD` -f applications/monitor-scale/Dockerfile applications/monitor-scale``

#### Step6

Once again we'll need to set up the Socat Registry proxy container to push the monitor-scale image to our registry, so let's build it (feel free to skip this step in case it already exists from Parts 1 or 2).

`docker build -t socat-registry -f applications/socat/Dockerfile applications/socat`

#### Step7

Run the proxy container from the newly created image. 

``docker stop socat-registry; docker rm socat-registry; docker run -d -e "REG_IP=`minikube ip`" -e "REG_PORT=30400" --name socat-registry -p 30400:5000 socat-registry``

#### Step8

Push the monitor-scale image to the registry.

``docker push 127.0.0.1:30400/monitor-scale:`git rev-parse --short HEAD` ``

#### Step9

The proxy’s work is done, so go ahead and stop it.

`docker stop socat-registry`

#### Step10

Open the registry UI and verify that the monitor-scale image is in our local registry.

`minikube service registry-ui`

#### Step11
The monitor-scale application is a used to scale instances of our puzzle application up and down, sending commands to our Kubernetes cluster. Because of this, we need to create a Service Account and Role (RBAC) so that monitor-scale has access to interact with the cluster. 


`kubectl apply -f manifests/monitor-scale-serviceaccount.yaml`

#### Step12

Create the monitor-scale deployment and service.

``sed 's#127.0.0.1:30400/monitor-scale:$BUILD_TAG#127.0.0.1:30400/monitor-scale:'`git rev-parse --short HEAD`'#' applications/monitor-scale/k8s/deployment.yaml | kubectl apply -f -``

#### Step13

Wait for the monitor-scale deployment to finish.

`kubectl rollout status deployment/monitor-scale`

#### Step14

View pods to see the monitor-scale pod running.

`kubectl get pods`

#### Step15

View services to see the monitor-scale service.

`kubectl get services`

#### Step16

View ingress rules to see the monitor-scale ingress rule.

`kubectl get ingress`

#### Step17

View deployments to see the monitor-scale deployment.

`kubectl get deployments`

#### Step18

We will run a script to bootstrap the puzzle and mongo services, creating Docker images and storing them in the local registry. The puzzle.sh script runs through the same build, proxy, push, and deploy steps we just ran through manually for both services.

`scripts/puzzle.sh`

#### Step19

Check to see if the puzzle and mongo services have been deployed.

`kubectl rollout status deployment/puzzle`

#### Step20

Bootstrap the kr8sswordz frontend web application. This script follows the same build proxy, push, and deploy steps that the other services followed.

`scripts/kr8sswordz-pages.sh`

#### Step21

Check to see if the frontend has been deployed.

`kubectl rollout status deployment/kr8sswordz`

#### Step22

Check to see that all the pods are running.

`kubectl get pods`

#### Step23

Start the web application in your default browser. You may have to refresh your browser so that the puzzle appears properly.

`minikube service kr8sswordz`

## Part 4

#### Step1

Enter the following command to open the Jenkins UI in a web browser. Log in to Jenkins using the username and password you previously set up.

`minikube service jenkins`

#### Step2

We’ll want to create a new pipeline for the puzzle service that we previously deployed. On the left in Jenkins, click New Item.

#### Step3

Enter the item name as "Puzzle-Service", click Pipeline, and click OK.

#### Step4

Under the Build Triggers section, select Poll SCM. For the Schedule, enter the the string H/5 * * * * which will poll the Git repo every 5 minutes for changes.

#### Step5

In the Pipeline section, change the Definition to "Pipeline script from SCM". Set the SCM property to GIT. Set the Repository URL to your forked repo (created in Part 2), such as https://github.com/[GIT USERNAME]/kubernetes-ci-cd.git. Set the Script Path to applications/puzzle/Jenkinsfile

#### Step6

When you are finished, click Save. On the left, click Build Now to run the new pipeline. You should see it successfully run through the build, push, and deploy steps in a few minutes.

#### Step7

View the Kr8sswordz application.

`minikube service kr8sswordz`

#### Step8

Spin up several instances of the puzzle service by moving the slider to the right and clicking Scale. For reference, click on the Submit button, noting that the green hit does not register on the puzzle services.

#### Step9

Edit applications/puzzle/common/models/crossword.js in your favorite text editor (for example, you can use nano by running the command 'nano applications/puzzle/common/models/crossword.js' in a separate terminal). You'll see a commented section on lines 42-43 that indicates to uncomment a specific line. Uncomment line 43 by deleting the forward slashes and save the file. 

#### Step10

Commit and push the change to your forked Git repo.

#### Step11

In Jenkins, open up the Puzzle-Service pipeline and wait until it triggers a build. It should trigger every 5 minutes.

#### Step12

After it triggers, observe how the puzzle services disappear in the Kr8sswordz Puzzle app, and how new ones take their place.

#### Step13

Try clicking Submit to test that hits now register as light green.



## Automated Scripts to Run Tutorial
If you need to walk through the steps in the tutorial again (or more quickly), we’ve provided npm scripts that automate running the same commands in the separate parts of the Tutorial.

- Install NodeJS. 
- Install the scripts.  
    - `cd ~/kubernetes-ci-cd`
    - `npm install`

Begin the desired section:

- `npm run part1`
- `npm run part2`
- `npm run part3`
- `npm run part4`


 ## LICENSE
Copyright 2017 Kenzan, LLC <http://kenzan.com>
 
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
    http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
