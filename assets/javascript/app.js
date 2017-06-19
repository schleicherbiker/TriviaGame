//Questions
var questions = [];
var q1 = new question("Who stars in the TV series Sherlock?", ["Benedict Cumberbatch", "Benjamin Cinderbatch", "Bimpleton Cabbagepatch", "Sherlock"], 2);
var q2 = new question("Is it 'Sex in the City' or 'Sex and the City'?", ["Sex in the City", "Sex and the City", "One in the show and the other is the movie", "Who Cares"], 3);


function question(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    questions.push(this);
}

//Variables
var questionTime = 40;
var qNum = 0;
var correctNum = 0;
var wrongNum = 0;
var unansweredNum = 0;

//Start Game when button is pressed
$(document).ready(function() {
    $("#start").click(function() {startGame()});
})

function startGame() {  
    drawQuestion(qNum);
}

function startTimer(time) {
    $("#time").empty();
    $("#time").text("Time Remaining: " + time);
    timer = setInterval(function() {
        time--;
        $("#time").text("Time Remaining: " + time);
        if (time <= 0) {
            answeredQuestion(false);
        }
    }, 1000)
}

function drawQuestion() {
    //Start the timer for the question
    startTimer(questionTime);

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
            answeredQuestion(this);
        })
        
        $("#answerBox").append(answer);
    }
}

function answeredQuestion(question) {
    qNum++;
    clearInterval(timer);
    if (question === false)
        unansweredNum++;
    else if ($(question).text() === $(question).data("answer"))
        correctNum++;
    else
        wrongNum++;

    //Draw new question or end game
    if (qNum < questions.length)
        drawQuestion();
    else
        endGame();
}

function endGame() {
    $("#time").empty();
    $("#questionBox").empty();
    $("#answerBox").empty();
    //Show right, wrong, and unanswered questions
    right = $("<div>");
    right.text("Right Answers: " + correctNum);
    wrong = $("<div>");
    wrong.text("Wrong Answers: " + wrongNum);
    unanswered = $("<div>");
    unanswered.text("Unanswered: " + unansweredNum);
    $("#time").append(right, wrong, unanswered);
}