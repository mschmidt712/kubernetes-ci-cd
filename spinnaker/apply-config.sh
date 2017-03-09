kubectl delete --namespace spinnaker configmap spinnaker-config
kubectl create --namespace spinnaker configmap spinnaker-config --from-file=config/front50.yml