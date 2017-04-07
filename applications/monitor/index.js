var express = require('express')
var app = express()

var http = require('http').Server(app);
var request = require('request');
var async = require('async');
var io = require('socket.io')(http);
var path    = require("path");
var Etcd = require('node-etcd')
var cors = require('cors');

app.use(express.static('public'))

var bodyParser = require("body-parser");

var servicesHost = process.env.SERVICES_SERVICE_HOST;
var servicesPort = process.env.SERVICES_SERVICE_PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

etcd = new Etcd("http://example-etcd-cluster-client-service:2379")

var watcher = etcd.watcher("pod-list", null, {recursive: true})
watcher.on("change", console.log);

function showVal(val) {

  var pods = etcd.getSync("pod-list",{ recursive: true });
  io.emit('pods', { pods: pods.body.node.nodes });
}

app.post('/scale', function (req, res) {
  var scale = req.body.count;
  console.log('Count requested is: %s', scale);
  var url = "http://127.0.0.1:2345/apis/extensions/v1beta1/namespaces/default/deployments/services/scale";
  var putBody = {
    kind:"Scale",
    apiVersion:"extensions/v1beta1",
    metadata: { 
      name:"services",
      namespace:"default"
    },
    spec: {
      replicas:1
    },
    status:{}
  };
  putBody.spec.replicas = scale;

  request({ url: url, method: 'PUT', json: putBody}, function (err, httpResponse, body) {
    if (err) {
      return console.error('Failed to scale:', err);
    }
    console.log('Scale success!');
    res.send('success');
  });
});

app.post('/loadtest/concurrent', function (req, res) {

  var count = req.body.count;
  console.log('Count requested is: %s', count);
  var url = "http://" + servicesHost + ":" + servicesPort + "/puzzle/v1/crossword";
  var myUrls = [];
  for (var i = 0; i < req.body.count; i++) {
    myUrls.push(url);
  } 
  async.map(myUrls, function(url, callback) {
    request(url, function(error, response, html){
      if (response && response.hasOwnProperty("statusCode")) {
        console.log(response.statusCode);
      } else {
        console.log("Error: " + error);
      }
    });
  }, function(err, results) {
    console.log(results);
  });
  res.send('concurrent done');
});

app.post('/loadtest/consecutive', function (req, res) {
  
  var count = req.body.count;
  var url = "http://" + servicesHost + ":" + servicesPort + "/puzzle/v1/crossword";
  for (var i = 0; i < req.body.count; i++) {
    request(url, function(error, response, html) {
      if (response && response.hasOwnProperty("statusCode")) {
        console.log(response.statusCode);
      } else {
        console.log("Error:" + error);
      }
    });
  }
  res.send('consecutive done');
});

app.get('/up/:podId', function (req, res) {
  console.log('Server UP: %s', req.params.podId);
  etcd.setSync("pod-list/" + req.params.podId, req.params.podId);
  res.send('up done');
})

app.get('/down/:podId', function (req, res) {
  console.log('Server DOWN: %s', req.params.podId);
  etcd.delSync("pod-list/" + req.params.podId, req.params.podId);
  res.send('down done');
})

app.get('/hit/:podId', function (req, res) {

  var d = new Date();
  var n = d.getTime();

  console.log("Emitting hit from %s", req.params.podId);
  io.emit('hit', { podId: req.params.podId, time: n });
  res.send('hit done')
})

app.get('/pods', function (req, res) {

  var pods = etcd.getSync("pod-list",{ recursive: true });
  io.emit('pods', { pods: pods.body.node.nodes });
  res.send('pods sent')
})

app.delete('/pods', function (req, res) {

  var pods = etcd.delSync("pod-list/",{ recursive: true });
  res.send('pods deleted')
})

io.on('connection', function(socket){
  
  console.log("Websocket connection established.");
  socket.on('disconnect', function() {
    console.log("Websocket disconnect.");
  })
});

app.get('/', function(req,res){
  res.send('basic GET successful');
});

http.listen(3001, function () {
  console.log('Listening on port 3001!');
  
});

