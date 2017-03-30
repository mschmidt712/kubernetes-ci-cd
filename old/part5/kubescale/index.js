var express = require('express')
var app = express()

var http = require('http').Server(app);
var io = require('socket.io')(http);
var path    = require("path");
var Etcd = require('node-etcd')
app.use(express.static('public'))
var exec = require('child_process').exec;

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//etcd = new Etcd("http://localhost:2379")
///tmp/test-etcd/etcdctl --endpoints "http://example-etcd-cluster-client-service:2379" mkdir pod-list
etcd = new Etcd("http://example-etcd-cluster-client-service:2379")

//etcd.mkdir("pods");

watcher = etcd.watcher("pod-list", null, {recursive: true})

watcher.on("change", showVal);

function showVal(val) {
 pods = etcd.getSync("pod-list",{ recursive: true })
  io.emit('pods', { pods: pods.body.node.nodes });

}

app.post('/scale', function (req, res) {
  exec('kubectl scale --replicas=' + req.body.count + ' deployment/set', function(error, stdout, stderr) {
  res.send("scaled to " + req.body.count);
});
})

app.post('/loadtest/concurrent', function (req, res) {
  //svc = "http://localhost:8001/api/v1/proxy/namespaces/default/services/set:80"
  svc = "http://set:80/"
//  exec('loadtest -c ' + req.body.count + ' -n ' + req.body.count + ' http://set', function(error, stdout, stderr) {
    exec('ab -c ' + req.body.count + ' -n ' + req.body.count + ' ' + svc, function(error, stdout, stderr) {
  console.log(stdout);
  res.send(stdout);
});
})

app.post('/loadtest/consecutive', function (req, res) {
  svc = "http://set:80/"
//  exec('loadtest -c ' + req.body.count + ' -n ' + req.body.count + ' http://set', function(error, stdout, stderr) {
    exec('ab -c 1 -n ' + req.body.count + ' ' + svc, function(error, stdout, stderr) {
  console.log(stdout);
  res.send(stdout);
});
})



app.get('/up/:podId', function (req, res) {
  etcd.set("pod-list/" + req.params.podId, req.params.podId);
  res.send('done');
})

app.get('/down/:podId', function (req, res) {
  etcd.del("pod-list/" + req.params.podId, req.params.podId);
  res.send('done');
})

app.get('/hit/:podId', function (req, res) {

var d = new Date();
var n = d.getTime();

io.emit('hit', { podId: req.params.podId, time: n });
console.log('hit!');
res.send('done')
})

io.on('connection', function(socket){
  
    pods = etcd.getSync("pod-list",{ recursive: true })
    io.emit('pods', { pods: pods.body.node.nodes });
});

app.get('/',function(req,res){
       
     res.sendFile(path.join(__dirname+'/public/index.html'));

});


http.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

