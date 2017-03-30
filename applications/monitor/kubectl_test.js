var K8s = require('k8s')
 
// use kubectl 
 
var kubectl = K8s.kubectl({
    endpoint:  'http://192.168.10.10:8080'
    , namespace: 'namespace'
    , binary: '/usr/local/bin/kubectl'
})
 
//use restful api 
var kubeapi = K8s.api({
    endpoint: 'http://192.168.10.10:8080'
    , version: '/api/v1'
})
 
// Configure using kubeconfig 
var kube = K8s.kubectl({
    binary: '/bin/kubectl'
    ,kubeconfig: '/etc/cluster1.yaml'
    ,version: '/api/v1'
});