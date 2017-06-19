//Questions
var questions = [];
var q1 = new question("Who stars in the TV series Sherlock?", ["Benedict Cumberbatch", "Benjamin Cinderbatch", "Bimpleton Cabbagepatch", "Sherlock"], 2);
var q2 = new question("Is it 'Sex in the City' or 'Sex and the City'?", ["Sex in the City", "Sex and the City", "One in the show and the other is the movie", "Who Cares"], "Who Cares")


function question(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    questions.push(this);
}

//Time ()
var time = 2000;
var qNum = 0;
var correctNum = 0;
var wrongNum = 0;
var unansweredNum = 0;

//Start Game when button is pressed
$(document).ready(function() {
    $("#start").click(function() {startGame()});
})

function startGame() {
    startTimer();
    
    drawQuestion(qNum);
}

function startTimer() {
    $("#time").empty();
    $("#time").text("Time Remaining: " + time);
    timer = setInterval(function() {
        time--;
        $("#time").text("Time Remaining: " + time);
        if (time <= 0) {
            //TODO finish game
            alert("Times up!");
            clearInterval(timer);
        }
    }, 1000)
}

function drawQuestion() {
    //Draw the Question
    $("#questionBox").empty();
    question = $("<div>");
    question.addClass("question")
    question.text(questions[qNum].question);
    $("#questionBox").append(question);

    //Draw the Answers
    $("#answerBox").empty();
    for (i=0; i<questions[qNum].answers.length; i++) {
        answer = $("<div>");
        answer.addClass("text-center answer");
        answer.text(questions[qNum].answers[i]);
        answer.data("answer", questions[qNum].answers[questions[qNum].correctAnswer]);
        //On answer click...
        answer.click(function() {
            qNum++;
            if ($(this).text() === $(this).data("answer")) {
                correctNum++;
            
            } else {
                wrongNum++;
                alert("you wrong");
            }
            drawQuestion();
        })
        $("#answerBox").append(answer);
    }
}