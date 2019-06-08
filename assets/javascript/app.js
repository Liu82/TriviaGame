

$(document).ready(function(){
  $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
var interval;

function countdown() {
  clearInterval(interval);
  interval = setInterval( function() {
      var timer = $('.js-timeout').html();
      timer = timer.split(':');
      var minutes = timer[0];
      var seconds = timer[1];
      seconds -= 1;
      if (minutes < 0) return;
      else if (seconds < 0 && minutes != 0) {
          minutes -= 1;
          seconds = 59;
      }
      else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

      $('.js-timeout').html(minutes + ':' + seconds);

      if (minutes == 0 && seconds == 0) clearInterval(interval);
  }, 1000);
}






  var trivia = {
  
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    
    questions: {
      1: 'How Did Daenerys Targaryen Eventually Hatch Her Dragon Eggs?',
      2: 'What Is The Only Thing That Can Put Out Vilatile Wildfire? ',
      3: 'Besides Dragon Glass, What Is The Only Other Substance Capable Of Defeating White Walkers?',
      4: 'Which Direwolf Was Killed In Retaliation For the Attack On Prince Joffrey?',
      5: "Arya's Punishment For Stealing From The Many-Faced God is?",
      6: 'The Name Of King Tommens Favorite Cat is?',
    
    Options: 
      1: ['In A Lightning Storm', 'In A Funeral Pyre', 'In A Frozen Cave'],
      2: ['Sand', 'Water', 'Dragon Blood','Sunlight]',
      3: ['Weirwood', 'Fire', 'Valyrian Steel', 'Icicles'],
      4: ['Ghost', 'Lady', 'Nymeria', 'Summer'],
      5: ['Weight Gain','Memory Loss','Blindness','Loss Of Appetite'],
      6: ['Little Lion','Boo','Kitty','Ser Pounce'],
    
    Answers:
      1: 'In A Funeral Pyre',
      2: 'Sand',
      3: 'Valyrian Steel',
      4: 'Lady',
      5: 'Blindness',
      6: 'Ser Pounce',
    
    }
        startGame: function (){
     
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();
      
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
    
      $('#start').hide();
  
      $('#remaining-time').show();
      
   
      trivia.nextQuestion();
      
    }
 
    nextQuestion : function(){
      
   
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
     
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
    
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
     
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    }

    timerRunning : function(){
      
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
     
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
   
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
      
        $('#game').hide();
        
      
        $('#start').show();
      }
      
    }
    guessChecker : function() {
      
     
      var resultId;
      
   
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
    
      if($(this).text() === currentAnswer){
      
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }

      else{
      
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    }
    guessResult : function(){
      
     
      trivia.currentSet++;
      
      
      $('.option').remove();
      $('#results h3').remove();
      
    
      trivia.nextQuestion();
       
    }
  
  }