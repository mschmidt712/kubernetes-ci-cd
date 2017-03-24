## Part 3

```
cd part3
```

### Edit jenkins.yml with minikube ip

### Install jenkins

```
kubectl apply -f jenkins.yml; kubectl rollout status deployment/jenkins
```

### Get jenkins pod name

```
kubectl get pods
```

### Get jenkins admin token
```
kubectl exec JENKINSPOD cat /root/.jenkins/secrets/initialAdminPassword
```

### Setup Jenkins with defaults
```
open http://jenkins.MINIKUBEIP.xip.io
```

### Create a new Jenkins Pipeline Job

Choose "Jenkinsfile from SCM" and put `https://github.com/kenzanlabs/kubernetes-ci-cd.git` for the target repository (or your fork). For `Jenkinsfile path` put `part3/Jenkinsfile`

### Run Job


Ensure job finishes correctly and new version of hello-kenzan has been deployed i nthe dashboard

If you have pointed the targer repo in the job at your fork, try to make some changes to the application and run your job to see the changes deployed