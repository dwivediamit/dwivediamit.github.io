angular.module('quiz.service', []);
angular.module('quiz.directive', []);
angular.module('quiz.filter', []);

angular.module('quiz', ['quiz.service','quiz.directive','quiz.filter']);

var QuizController = function($scope){
 
  "use strict";
  $scope.questions = [
    {"questionText": "When was the last time india won the cricket world cup?", "answers": [
        {"answerText":"2011", "correct": true},
        {"answerText":"2015", "correct": false},
        {"answerText":"2003", "correct": false},
        {"answerText":"2017", "correct": false},
        {"answerText":"1996", "correct": false},
        {"answerText":"1987", "correct": false}
      ]},
    {"questionText": "What is the highest individual score by a batsman in test cricket?", "answers": [
      {"answerText":"400", "correct": false},
      {"answerText":"380", "correct": false},
      {"answerText":"375", "correct": true},
      {"answerText":"300", "correct": false},
      {"answerText":"319", "correct": false},
      {"answerText":"355", "correct": false}
      ]},
    {"questionText": "Who has won the most number of cricket world cups?", "answers": [
      {"answerText":"Australia", "correct": true},
      {"answerText":"India", "correct": false},
      {"answerText":"West Indies", "correct": false},
      {"answerText":"South Africa", "correct": false},
      {"answerText":"England", "correct": false},
      {"answerText":"New Zealand", "correct": false}
      ]},
    {"questionText": "How many international centuries does sachin tendulkar has under his name?", "answers": [
      {"answerText":"49", "correct": true},
      {"answerText":"45", "correct": false},
      {"answerText":"40", "correct": false},
      {"answerText":"48", "correct": false},
      {"answerText":"50", "correct": false},
      {"answerText":"55", "correct": false}
      ]}
  ];
  $scope.answers ={};
  $scope.correctCount = 0;
  $scope.showResult = function(){
    $scope.correctCount = 0;
    var qLength = $scope.questions.length;
    for(var i=0;i<qLength;i++){
      var answers = $scope.questions[i].answers;
      $scope.questions[i].userAnswerCorrect = false;
      $scope.questions[i].userAnswer = $scope.answers[i];
      for(var j=0;j<answers.length;j++){
        answers[j].selected = "donno";
        if ($scope.questions[i].userAnswer === answers[j].answerText && answers[j].correct===true){
          $scope.questions[i].userAnswerCorrect = true;
          answers[j].selected = "true";
          $scope.correctCount++;
        }else if($scope.questions[i].userAnswer === answers[j].answerText && answers[j].correct===false){
          answers[j].selected = "false";
        }
      }
    }
    
    //console.log($scope.answers);
    
  };
   $scope.CheckPassport = function () {
                window.location.reload();
            };
};
