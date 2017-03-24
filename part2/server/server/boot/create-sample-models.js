'use strict';

module.exports = function(app) {
  app.dataSources.db.automigrate('Crossword', function(err) {
    if (err) throw err;
    app.models.Crossword.find(function(err, crosswords) {
      if (err) throw err;
      console.log("Found " + crosswords.length + " existing crosswords");
      if(!crosswords.length) {
        app.models.Crossword.create({
          fromCache: true,
          words: [
            {
              word: "Kenzan",
              wordNbr: 1,
              startX: 6,
              startY: 0,
              wordOrientation: "down",
              hint: "Our company name :-)"
            },
            {
              word: "Minikube",
              wordNbr: 2,
              startX: 9,
              startY: 0,
              wordOrientation: "down",
              hint: "Tool that makes it easy to run kubernetes locally"
            },
            {
              word: "Replication",
              wordNbr: 3,
              startX: 11,
              startY: 0,
              wordOrientation: "down",
              hint: "Controller that ensures a specific number of pods are running at a given time"
            },
            {
              word: "Service",
              wordNbr: 4,
              startX: 5,
              startY: 1,
              wordOrientation: "across",
              hint: "Abstraction which defines a logical set of pods"
            },
            {
              word: "Kubectl",
              wordNbr: 5,
              startX: 3,
              startY: 4,
              wordOrientation: "down",
              hint: "cli tool for running commands against Kubernetes clusters"
            },
            {
              word: "Deployment",
              wordNbr: 6,
              startX: 2,
              startY: 7,
              wordOrientation: "across",
              hint: "Defines declarative updates for pods and replica sets"
            },
            {
              word: "Yaml",
              wordNbr: 7,
              startX: 0,
              startY: 10,
              wordOrientation: "across",
              hint: "Configuration format other then json"
            },
            {
              word: "k8s",
              wordNbr: 5,
              startX: 3,
              startY: 4,
              wordOrientation: "across",
              hint: "Shorthand for Kubernetes"
            }
          ]
        }, function (err, crossword) {
          if (err) throw err;
          console.log('Model created: \n', crossword);
        });
      }
    });
  });
};
