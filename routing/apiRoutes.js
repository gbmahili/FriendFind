var path = require('path');
var fs = require('fs');
var friendsData = require("../app/data/friends");




module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
    res.json(friendsData);
    });


app.post('/api/friends', function(req, res) {
    // Capture the user input object
    
    var userInput = req.body;
    console.log("Line 18", userInput);
    //var userResponses = parseInt(userInput.scores);
var userResponses = userInput.scores;
console.log("Line 21", userResponses);
for (var j = 0; j < userInput.scores.length; j++) {
        userInput.scores[j] = parseInt(userResponses[j])
    }
     console.log('userName = ' + JSON.stringify(userInput.name) + 'Scores =' + JSON.stringify(userInput.scores));

    

   

   
    var matchName = '';
    //Have to make array in friends JS a integer
    var matchImage = '';
    var totalDifference = 10000; 
    for (var i = 0; i < friendsData.length; i++) {
      
        var eachDifference = 0;
        for (var j = 0; j < userResponses.length; j++) {
            var score = userResponses[j];
            
            eachDifference += Math.abs(friendsData[i].scores[j] - score);
        }
        
        if (eachDifference < totalDifference) {
            

            totalDifference = eachDifference;
            matchName = friendsData[i].name;
            matchImage = friendsData[i].photo;
        }
    }

    friendsData.push(userInput);

   
    res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
});

};