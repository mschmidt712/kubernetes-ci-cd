## Part 3

```
cd part3
```

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

### Port-forward into jenkins and complete setup with defaults
```
kubectl port-forward JENKINSPOD 8888:8080
open http://localhost:8888
```

### Create a new Jenkins Pipeline Job

### Choose "Jenkinsfile from SCM" and put `https://github.com/kenzanlabs/kubernetes-ci-cd.git` for the target repository. For `Jenkinsfile path` put `part3/Jenkinsfile`

### Run Job


Ensure job finishes correctly and new version of hello-kenzan has been deployed i nthe dashboard