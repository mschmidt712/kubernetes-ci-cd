var express = require('express')
var app = express()

var sleep = require('sleep')

var exec = require('child_process').exec;



app.get('/', function (req, res) {
  
  exec('export HOSTNAME=`hostname`; curl http://kubescale:3000/hit/$HOSTNAME', function(error, stdout, stderr) {
  sleep.sleep(1);
  res.send("done");
});
})



app.listen(80, function () {
  console.log('Example app listening on port 80!')
})

