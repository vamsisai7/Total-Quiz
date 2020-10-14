
var questions = [{
    question: "Who was the first Indian woman in Space?",
    choices: ["Sunita Williams", "Kalpana Chawla", "Colonel Rossum", "Koneru Humpy"],
    correctAnswer: 1
}, {
    question: "What is the world's largest country?",
    choices: ["Russia", "England", "China", "Australia"],
    correctAnswer: 0
}, {
    question: "What is the Capital of Argentina?",
    choices: ["Rosario", "Buenos Aires", "Cordoba","Mendoza"],
    correctAnswer: 1
}, {
    question: "Which planet is the hottest in the solar system?",
    choices: ["Mars", "Jupiter", "Neptune", "Venus"],
    correctAnswer: 3
}, {
    question: "Who is often called the father of the computer?",
    choices: ["James Gosling", "Charles Babbage", "Albert Einstein", "Thomas Alva Edison"],
    correctAnswer: 1
}, {
    question: "What does “HTTP” stand for?",
    choices: ["HyperText Telnet Protocol", "HyperText Telecom Protocol", "HyperText Transmission Protocol", "HyperText Transfer Protocol"],
    correctAnswer: 3

}, {
    question: "What is the symbol for potassium?",
    choices: ["Li", "K", "Na", "P"],
    correctAnswer: 1
}, {
    question: "Which animal can be seen on the Porsche logo?",
    choices: ["Cheetah", "Horse", "Whale", "Fox"],
    correctAnswer: 1
}, {
    question: "What was the name of the actor who played Jack Dawson in Titanic?",
    choices: ["James Bond", "Tom Cruise", "Leonardo DiCaprio", "Tom Hardy"],
    correctAnswer: 2

}, {
    question: "What sport is featured in the video game “FIFA”?",
    choices: ["Tennis", "Basketball", "Rugby", "Football"],
    correctAnswer: 3

}, {
    question: "Which god is considered the “destroyer” and is part of the Hindu Trinity?",
    choices: ["Shiva", "Hanuman", "Ganesh", "Vishnu"],
    correctAnswer: 0

	}, {
    question: "What is the tallest building in the world?",
    choices: ["Petronas Towers", "Newyork Manhattan", "Burj Khalifa", "None of the above"],
    correctAnswer: 2
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}
