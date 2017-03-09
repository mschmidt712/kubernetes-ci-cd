kubectl apply -f namespace.yml
kubectl delete --namespace spinnaker configmap spinnaker-config
sleep 2
kubectl create --namespace spinnaker configmap spinnaker-config --from-file=config/front50.yml --from-file=config/clouddriver.yml --from-file=config/orca.yml  --from-file=config/gate.yml  --from-file=config/settings.js 