kubectl apply -f namespace.yml
kubectl delete --namespace spinnaker configmap spinnaker-config
kubectl create --namespace spinnaker configmap spinnaker-config --from-file=config/front50.yml --from-file=config/clouddriver.yml