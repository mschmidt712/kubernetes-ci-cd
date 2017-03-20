kubectl create -f k8s/etcd-operator.yml
kubectl rollout status deployment/etcd-operator
sleep 5
kubectl create -f k8s/etcd-cluster.yml
kubectl create -f k8s/etcd-service.yml



kubectl create -f k8s/set.yml

#kubectl create -f k8s/deployment.yml