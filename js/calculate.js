window.addEventListener("load", function (e) {
    document.getElementById("grades").addEventListener("reset", resetPage);
    document.getElementById("grades").addEventListener("submit", validate);
    $("input").on("click", removeError)

});

let finalMark;
let finalGrade;
let gradeArray=[];
let total = 0;

function validate(e){
    e.preventDefault();
    let quizMark = $("input[name=quizzes]").val();
    let ass1 = $("input[name=assignment1]").val();
    let ass2 = $("input[name=assignment2]").val();
    let ass3 = $("input[name=assignment3]").val();
    let exam = $("input[name=exam]").val();

    if (isNaN(quizMark) || quizMark == null || quizMark == "") {
        addError("You must enter a number in quizzes");
    } else if (quizMark > 60) {
        addError("Quiz score must be under 60");
    } else if (isNaN(ass1) || ass1 == null || ass1 == "") {
        addError("You must enter a number in Assignment 1");
    } else if (ass1 > 100) {
        addError("Assignment 1 grade is out of 100");
    } else if (isNaN(ass2) || ass2 == null || ass2 == "") {
        addError("You must enter a number in Assignment 2");
    } else if (ass2 > 100) {
        addError("Assignment 2 grade is out of 100");
    } else if (isNaN(ass3) || ass3 == null || ass3 == "") {
        addError("You must enter a number in Assignment 3");
    } else if (ass3 > 100) {
        addError("Assignment 3 grade is out of 100");
    } else if (isNaN(exam) || exam == null || exam == "") {
        addError("You must enter a number in Exam");
    } else if (exam > 100) {
        addError("Exam grade is out of 100");
    } else {
        removeError();
        displayFinalGrades();
    }
}

function addError(message){
    $("#error").append("<div id='error1'>"+message+"</div>");

}

function removeError(e){
    $("#error").html("");
}

function calculateGrade() {
    finalMark = 0;
    let quizzes = parseInt(document.getElementsByClassName("input_box")[0].value);
    let assignment1 = parseInt(document.getElementsByClassName("input_box")[1].value);
    let assignment2 = parseInt(document.getElementsByClassName("input_box")[2].value);
    let assignment3 = parseInt(document.getElementsByClassName("input_box")[3].value);
    let exam = parseInt(document.getElementsByClassName("input_box")[4].value);
    let length = document.getElementsByClassName("input_box").length;
    gradeArray.push((quizzes/60) * 10);
    gradeArray.push((assignment1/100) * 10);
    gradeArray.push((assignment2/100) * 15);
    gradeArray.push((assignment3/100) * 15);
    gradeArray.push((exam/100) * 50);
    for (x=0; x<gradeArray.length; x++) {
        total += gradeArray[x];
    }
    console.log(total);
    finalMark = parseInt(total);

}

function displayFinalGrades() {
    if ($(".button[type=submit]").prop('disabled', false)) {
        calculateGrade();
        let results = document.getElementById("resultMark");
        let grades = document.getElementById("resultGrade");
        results.classList.remove("hidden");
        grades.classList.remove("hidden");
        if (finalMark > 85) {
            finalGrade = "You have achieved a High Distinction";
        } else if (finalMark < 85 && finalMark > 75) {
            finalGrade = "You have achieved a Distinction";
        } else if (finalMark < 75 && finalMark > 65) {
            finalGrade = "You have achieved a Credit";
        } else if (finalMark < 65 && finalMark > 50) {
            finalGrade = "You have achieved a Pass";
        } else if (finalMark < 50) {
            finalGrade = "You have achieved a Fail";
        }
        let markNode = document.createTextNode("Your final mark is " + finalMark.toString())
        let gradeNode = document.createTextNode(finalGrade)
        results.appendChild(markNode);
        grades.appendChild(gradeNode);
        $(".button[type=submit]").prop('disabled', true);
    }
}

function resetPage(e) {
    location.reload();
}
