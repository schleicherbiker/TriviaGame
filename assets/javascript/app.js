//Questions
var questions = [];
var q1 = new question("Who stars in the TV series Sherlock?", ["Benedict Cumberbatch", "Benjamin Cinderbatch", "Bimpleton Cabbagepatch", "Sherlock Holmes"], 2);
var q2 = new question("Is it 'Sex in the City' or 'Sex and the City'?", ["Sex in the City", "Sex and the City", "Both", "Who Cares"], 3);
var q3 = new question("Who was the first U.S. President?", ["John Adams", "George Washington Carver", "George Washington", "Thomas Jefferson"], 1);
var q4 = new question("What is the best movie?", ["Twilight", "Pulp Fiction", "Avatar", "Despicable Me"], 3);
var q5 = new question("What will be my grade on this assignment?", ["A+", "B", "C", "A"], 0);
var q6 = new question("Im running out of question ideas.", ["That's okay, you'll think of some more", "Im bored anyways", "You're a failure", "Im running out of answer ideas"], 3);
var q7 = new question("Which band wrote 'I Want to Hold Your Hand'?", ["The Supremes", "Snoop Dog", "The Beatles", "The Beach Boys"], 1);
var q8 = new question("What is 2 + 2?", ["4", "3", "5", "69"], 0);

var questionTime = 20;
var qNum = 0;
var correctNum = 0;
var wrongNum = 0;
var unansweredNum = 0;
var canAnswer = false;
var timer;

//Start Game when button is pressed
$(document).ready(function() {
    //Draw start screen
    drawStart();
})

function drawStart() {
    //Set Variables
    qNum = 0;
    correctNum = 0;
    wrongNum = 0;
    unansweredNum = 0;
    canAnswer = false;

    //Clear Screen
    $("#main1, #main2").empty();
    
    //Draw Title
    $("#main1").append("<h1 id='mainTitle'>Total Tumultuous Trivia</h1>");
    $("#main1").append("<h2 id='secondTitle'>What a Cool Title</h2>");

    //Draw Start Button
    var start = $("<div id='start'>Start</div>");
    $("#main2").append(start);
    start.click(function() {
        drawQuestion();
    });

}

function startTimer(time) {
    var timeDiv = $("<div id='timer'>");
    timeDiv.text(time);
    timer = setInterval(function() {
        time--;
        timeDiv.text(time);
        if (time <= 0) {
            answeredQuestion(false);
            clearInterval(timer);
        }
    }, 1000);
    $("#main1").append(timeDiv);
}

function drawQuestion() {
    //Clear Screen
    $("#main1, #main2").empty();

    //Start the timer for the question
    startTimer(questionTime);

    //Draw the Question
    question = $("<div>");
    question.addClass("question")
    question.text(questions[qNum].question);
    $("#main1").append(question);

    //Draw the Answers
    for (i=0; i<questions[qNum].answers.length; i++) {
        var answer = $("<div>");
        answer.addClass("text-center answer");
        answer.attr("id", i);
        answer.text(questions[qNum].answers[i]);
        answer.data("answer", questions[qNum].answers[questions[qNum].correctAnswer]);
        
        //On answer click...
        answer.click(function() {
            if (canAnswer)
                answeredQuestion(this);
        })

        answer.css("opacity", "0");
        $("#main2").append(answer);
    }

    //Animate the Answers
    for (i=0; i<questions[qNum].answers.length; i++) {
        $("#"+i).animate({opacity: '0'}, 500*i + 500);
        $("#"+i).animate({opacity: '1'}, 500);
    }
    setTimeout(function() {
        canAnswer = true;
    }, 2000);
}

function answeredQuestion(question) {
    //Show the answer
    $("#" + questions[qNum].correctAnswer).css("backgroundColor", "green");
    if (question === false)
        unansweredNum++;
        //show correct
    else if ($(question).text() === $(question).data("answer"))
        correctNum++;
    else {
        wrongNum++;
        $("#" + $(question).attr("id")).css("backgroundColor", "red");
    }

    clearInterval(timer);
    canAnswer = false;
    
    setTimeout(function() {
        //Draw new question or end game
        qNum++;
        if (qNum < questions.length)
            drawQuestion();
        else {
            qNum = 0;
            endGame();
        }
    }, 3000);
}

function endGame() {
    $("#main1, #main2").empty();
    //Show right, wrong, and unanswered questions
    right = $("<h3>");
    right.text("Right Answers: " + correctNum);
    wrong = $("<h3>");
    wrong.text("Wrong Answers: " + wrongNum);
    unanswered = $("<h3>");
    unanswered.text("Unanswered: " + unansweredNum);
    
    //Print Results
    $("#main1").append("<div id='results'></div>");
    $("#results").append(right, wrong, unanswered);

    //Draw Reset Button
    var refresh = $("<div id='refresh'>")
    refresh.click(function() {
        drawStart();
    });
    $("#main2").append(refresh);
    $("#refresh").append("<div id='icon' class='glyphicon glyphicon-refresh'></div>");
}

function question(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    questions.push(this);
}