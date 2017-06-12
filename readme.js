#!/usr/bin/node

YAML = require('yamljs');
var fs = require('fs');

var markdown = "# Linux.com Kubernetes CI/CD Blog Series by Kenzan\n\n To generate this readme: `node readme.js`";
markdown = markdown + "\n\n## Interactive Tutorial Version"
markdown = markdown + "\nTo complete the tutorial using the interactive script:\n"
markdown = markdown + "\n* Clone this repository.\n"
markdown = markdown + "\n* To ensure you are starting with a clean slate: `minikube delete; sudo rm -rf ~/.minikube; sudo rm -rf ~/.kube`\n"
markdown = markdown + "\n* To run: `npm install`\n"
markdown = markdown + "\nBegin the desired section:\n"
markdown = markdown + "\n* `npm run part1`\n"
markdown = markdown + "\n* `npm run part2`\n"
markdown = markdown + "\n* `npm run part3`\n"
markdown = markdown + "\n* `npm run part4`\n"
markdown = markdown + "\n\n## Manual Tutorial Version\n\n"
markdown = markdown + "\nTo complete the tutorial manually, follow the steps below.\n"


YAML.load('steps.yml', function(docs)
{
    docList = docs.parts;
    var parts = docs.parts;

    parts.forEach(function (item) {
        var part = item.name;
        var stepNum = 0;
        var stepList = item.steps;
        
        markdown = markdown + "\n\n## " + part;

        stepList.forEach(function (step) {
            stepNum++;
            markdown = markdown + "\n\n#### Step" + stepNum
            markdown = markdown + "\n\n" + step.cap
            markdown = markdown + "\n\n`" + step.com + "`"
        })

    
    })


      fs.writeFile("README.md", markdown, function(err) {
    if(err) {
        return console.log(err);
    }

        console.log("README.md saved!");
    }); 

});