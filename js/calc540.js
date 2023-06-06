window.onload = function () {
    document.getElementById("grades").addEventListener("reset", resetPage);
    document.getElementById("grades").addEventListener("submit", validate);
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("click", removeError);
    }
};

let finalMark;
let finalGrade;
let gradeArray = [];
let total = 0;

function validate(e) {
    e.preventDefault();
    let ass1 = document.querySelector("input[name=assignment1]").value;
    let ass2 = document.querySelector("input[name=assignment2]").value;
    let ass3 = document.querySelector("input[name=assignment3]").value;
    let ass4 = document.querySelector("input[name=assignment4]").value;
    let ass5 = document.querySelector("input[name=assignment5]").value;
    let ass6 = document.querySelector("input[name=assignment6]").value;
    let exam = document.querySelector("input[name=exam]").value;
    finalGrade = "";
    if (isNaN(ass1) || ass1 === null || ass1 === "") {
        addError("You must enter a number in Assignment 1");
    } else if (ass1 > 10) {
        addError("Assignment 1 grade is out of 10");
    } else if (isNaN(ass2) || ass2 === null || ass2 === "") {
        addError("You must enter a number in Assignment 2");
    } else if (ass2 > 100) {
        addError("Assignment 2 grade is out of 100");
    } else if (isNaN(ass3) || ass3 === null || ass3 === "") {
        addError("You must enter a number in Assignment 3");
    } else if (ass3 > 10) {
        addError("Assignment 3 grade is out of 10");
    } else if (isNaN(ass4) || ass4 === null || ass4 === "") {
        addError("You must enter a number in Assignment 4");
    } else if (ass4 > 100) {
        addError("Assignment 4 grade is out of 100");
    } else if (isNaN(ass5) || ass5 === null || ass5 === "") {
        addError("You must enter a number in Assignment 5");
    } else if (ass5 > 100) {
        addError("Assignment 5 grade is out of 100");
    } else if (isNaN(ass6) || ass6 === null || ass6 === "") {
        addError("You must enter a number in Assignment 6");
    } else if (ass6 > 100) {
        addError("Assignment 6 grade is out of 100");
    } else if (exam > 100) {
        addError("Exam grade is out of 100");
    } else {
        removeError();
        displayFinalGrades();
    }
}


function calculateGrade() {
    let results = document.getElementById("resultMark");
    let grades = document.getElementById("resultGrade");
    grades.innerHTML = "";
    results.innerHTML = "";
    finalMark = "";
    finalGrade = "";
    gradeArray = [];
    total = 0;
    let assignment1 = parseInt(document.getElementsByClassName("input_box")[0].value);
    let assignment2 = parseInt(document.getElementsByClassName("input_box")[1].value);
    let assignment3 = parseInt(document.getElementsByClassName("input_box")[2].value);
    let assignment4 = parseInt(document.getElementsByClassName("input_box")[3].value);
    let assignment5 = parseInt(document.getElementsByClassName("input_box")[4].value);
    let assignment6 = parseInt(document.getElementsByClassName("input_box")[5].value);
    let exam = parseInt(document.getElementsByClassName("input_box")[6].value);
    //let length = document.getElementsByClassName("input_box").length;
    gradeArray.push((assignment1 / 10) * 10);
    gradeArray.push((assignment2 / 100) * 10);
    gradeArray.push((assignment3 / 10) * 10);
    gradeArray.push((assignment4 / 100) * 10);
    gradeArray.push((assignment5 / 100) * 10);
    gradeArray.push((assignment6 / 100) * 10);
    gradeArray.push((exam / 100) * 40);
    for (x = 0; x < gradeArray.length; x++) {
        total += gradeArray[x];
    }
    console.log(total);
    finalMark = parseInt(total);
}

function displayFinalGrades() {
    let submitButton = document.querySelector('.button[type="submit"]');
    if (submitButton.disabled === false) {
        calculateGrade();
        let results = document.getElementById("resultMark");
        let grades = document.getElementById("resultGrade");
        results.classList.remove("hidden");
        grades.classList.remove("hidden");
        if (finalMark >= 85) {
            finalGrade = "You have achieved a High Distinction";
        } else if (finalMark < 85 && finalMark >= 75) {
            finalGrade = "You have achieved a Distinction";
        } else if (finalMark < 75 && finalMark >= 65) {
            finalGrade = "You have achieved a Credit";
        } else if (finalMark < 65 && finalMark >= 50) {
            finalGrade = "You have achieved a Pass";
        } else if (finalMark < 50) {
            finalGrade = "You have achieved a Fail";
        }
        let markNode = document.createTextNode("Your final mark is " + finalMark.toString())
        let gradeNode = document.createTextNode(finalGrade)
        results.appendChild(markNode);
        grades.appendChild(gradeNode);
        if (finalGrade !== null) {
            $("#description").slideUp(400);
        }
        if (finalGrade === "You have achieved a High Distinction") {
            animationInterval = setInterval(() => {
                document.getElementById("int_col_left").classList.remove("hidden");
                document.getElementById("int_col_right").classList.remove("hidden");
                let $omg1 = $("#omg1");
                let $omg2 = $("#omg2");
                $omg1.fadeIn();
                $omg1.fadeOut();
                $omg2.fadeIn();
                $omg2.fadeOut();
            }, 100);
        }
    }
}

function resetPage(e) {
    location.reload();
}

function addError(message) {
    let errorDiv = document.createElement("div");
    errorDiv.id = "error1";
    errorDiv.textContent = message;
    let errorContainer = document.getElementById("error");
    errorContainer.appendChild(errorDiv);
}

function removeError(e) {
    document.getElementById("error").innerHTML = "";
}