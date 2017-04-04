#!/usr/bin/node

YAML = require('yamljs');
var inquirer = require('inquirer');
var Rx = require('rx');
const execSync = require('child_process').execSync;
var environment = process.env;

var config = {
    maxBuffer: 10000 * 1024,
    env: environment
};

var prompts = new Rx.Subject();

var stepIndex = 1;
var commands = [];

inquirer.prompt(prompts).ui.process.subscribe(

  function (answers) {
    answerIndex = answers.name*1
    answerIndex = answerIndex - 1;
    cmd = commands[answerIndex];
    execSync(cmd, {stdio:[0,1,2], env: environment})
},
  function(err){
    console.log('error')
},
  function(message){
    console.log('complete')
  }
);

prompts.onNext({type: 'confirm',name: "Begin", message: "Welcome to the Linux.com interactive Kubernetes tutorial by Kenzan. Press enter to begin\n", default: true});


YAML.load('steps.yml', function(docs)
{
    docList = docs.parts;
    var parts = docs.parts;

    parts.forEach(function (item) {
        var part = item.name;
        var stepNum = 0;
        var stepList = item.steps;
        stepList.forEach(function (step) {
            stepNum++;
            commands.push(step.com)
            prompts.onNext({type: 'confirm',name: stepIndex, message: "\n \n \n" + part + " Step: " + stepNum + "\n" + step.cap + "\n \n" + step.com + "\n \nPress enter to the run the above command for the step.", default: true});
            stepIndex++;
        })

    
    })
    prompts.onCompleted();


});