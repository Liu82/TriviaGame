var card = $("#quiz-area");


var questions = [
  {
    question: "How Did Daenerys Targaryen Eventually Hatch Her Dragon Eggs?",
    answers: ["In A Lightning Storm", "In A Funeral Pyre", "In A Frozen Cave"],
    correctAnswer: "In A Funeral Pyre"
  },
  {
    question: "What Is The Only Thing That Can Put Out Vilatile Wildfire?",
    answers: ["Sand", "Water", "Dragon Blood","Sunlight"],
    correctAnswer: "Sand"
  },
  {
    question: "Besides Dragon Glass, What Is The Only Other Substance Capable Of Defeating White Walkers?",
    answers: ["Weirwood", "Fire", "Valyrian Steel", "Icicles"],
    correctAnswer: "Valyrian Steel"
  },
  {
    question: "Which Direwolf Was Killed In Retaliation For the Attack On Prince Joffrey?",
    answers: ["Ghost", "Lady", "Nymeria", "Summer"],
    correctAnswer: "Lady"
  },
  {
    question: "Arya's Punishment For Stealing From The Many-Faced God is?",
    answers: ["Weight Gain","Memory Loss","Blindness", "Loss Of Appetite"],
    correctAnswer: "Blindness"
  },
  {
    question:
      "The Name Of King Tommens Favorite Cat is?",
    answers: ["Little Lion","Boo","Kitty","Ser Pounce"],
    correctAnswer: "Ser Pounce"

  }
];


var timer;

var game = {
  correct: 0,
  incorrect: 0,
  counter: 120,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend(
      "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
    );

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      card.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append("<input type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    card.append("<button id='done'>Done</button>");
  },

  done: function() {
    var inputs = card.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  result: function() {
    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    card.html("<h2>Game Complete!</h2>");
    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  }
};


$(document).on("click", "#start", function() {
  game.start();
});

$(document).on("click", "#done", function() {
  game.done();
});
