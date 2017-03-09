
IP=`minikube ip`

sed 's#MINIKUBE_IP#'$IP'#' $1 | kubectl apply -f -