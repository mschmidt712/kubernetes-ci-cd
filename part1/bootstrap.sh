kubectl apply -f volumes.yml
sleep 2
kubectl apply -f mysql.yml
sleep 2
kubectl apply -f europa.yml
kubectl spinnaker rollout status deployment/europa
sleep 2

kubectl apply -f jenkins.yml
kubectl spinnaker rollout status deployment/jenkins
sleep 2
./apply.sh ingress.yml

sleep 2

./svc.sh jenkins