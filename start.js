#!/usr/bin/node

YAML = require('yamljs');
var inquirer = require('inquirer');

var questions = [];
inquirer.prompt(questions);

console.log('Welcome to the Linux.com interactive Kubernetes tutorial by Kenzan');


function start() {
var inquirer = require('inquirer');
    inquirer.prompt([{type: 'confirm',name: 'start', message: caption, default: true},]).then(function (answers) {
        if (answers.start){
           if (command == "begin"){
               start();
           }
        }
    });

}
YAML.load('steps.yml', function(docs)
{
    var parts = docs.parts;

    parts.forEach(function (item) {

        var part = item.name;
        var stepNum = 0;
        var stepList = item.steps;
        console.log(item.name)

        // console.log(item.steps);
        stepList.forEach(function (step) {
            console.log(part + " - Step " + stepNum);
            console.log(step.cap);

            ask(step.cap, step.com)
        })

        

    })
});



function ask(caption, command) {
    // questions.push();
    prompts.onNext({type: 'confirm',name: 'start', message: caption, default: true});
}

start();