
IP=`minikube ip`
sed 's#INSERT_HERE#'$IP'#' $1 | kubectl apply -f -