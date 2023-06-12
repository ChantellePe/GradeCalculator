window.onload = function () {
    document.getElementById("questionairre").addEventListener("submit", getCalcInfo);
    document.getElementById("gradesCustom").addEventListener("reset", resetPage);
    document.getElementById("gradesCustom").addEventListener("submit", validate);
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("click", removeError);
    }
};

let finalMark;
let finalGrade;
let gradeArray = [];
let total = 0;
let hasErr = false;
let autoFail = false;

function getCalcInfo(e) {
    e.preventDefault();
    let calcForm = document.getElementById("customMain")
    let questionForm = document.getElementById("questionairre")
    calcForm.classList.remove("hidden");
    questionForm.classList.add("hidden");
    let numberOfAssignments = document.querySelector("input[name=assignmentNumber]").value === "" ? 0 : document.querySelector("input[name=assignmentNumber]").value;
    let hasExam = document.querySelector("select[name=examBool]").value;
    hideElements(parseInt(numberOfAssignments))
    if (hasExam !== 'True') {
        console.log(hasExam)
        document.getElementById("examField").classList.add("hidden");
        document.getElementById(`oFex`).classList.add("hidden");
        document.getElementById(`input_weight_ex`).classList.add("hidden");
        document.getElementById(`oFex`).classList.add("hidden");
        document.getElementById(`exam`).classList.add("hidden");
        document.getElementById(`outOf11`).classList.add("hidden");
    }
}

function hideElements(numOfAssessments) {
    for (let x = numOfAssessments + 1; x <= 10; x++) {
        document.getElementById(`A` + x).classList.add("hidden");
        document.getElementById(`outOf` + x).classList.add("hidden");
        document.getElementById(`oFA` + x).classList.add("hidden");
        document.getElementById(`input_weightA` + x).classList.add("hidden");
        document.getElementById(`assignment` + x).classList.add("hidden");
    }

}


function validate(e) {
    e.preventDefault();
    finalGrade = "";;
    let allInputs = []
    let weightsTotal = 0;
    let rounds = 0;
    const grades = document.getElementsByClassName('cust_input_box');
    const weights = document.getElementsByClassName('input_weight');
    const totals = document.getElementsByClassName('input_oFA');
    for (let i = 0; i < grades.length; i++) {
        if (!grades[i].classList.contains('hidden')) {
            allInputs.push(grades[i])
        }
    }
    for (let i = 0; i < weights.length; i++) {
        if (!weights[i].classList.contains('hidden')) {
            rounds++
            console.log("justweights: " + parseInt(weights[i].value))
            weightsTotal += parseInt(weights[i].value);
            allInputs.push(weights[i])
        }
    }
    for (let i = 0; i < totals.length; i++) {
        if (!totals[i].classList.contains('hidden')) {
            allInputs.push(totals[i])
        }
    }
    try {
        allInputs.forEach((input) => {
            if (isNaN(input.value) || input.value === null || input.value === "") {
                addError("You must enter a valid number in all fields");
                throw exception;
            } else if (weightsTotal !== 100) {
                addError("Weighting should add up to 100%");
                weightsTotal = 0;
                throw exception;
            } else {
                for (let i = 0; i < grades.length; i++) {
                    for (let y = 0; y < totals.length; y++) {
                        if (parseInt(grades[i].value) > parseInt(totals[i].value)) {
                            addError("Error: Grade must be smaller than the total mark");
                            throw exception;
                        }

                    }
                }
            }
        });
    } catch (e) {
        return null;
    }

    if (!hasErr) {
        removeError();
        displayFinalGrades();
    }
};



function getNonHiddenInputValues() {
    // Get all input elements


    return inputValues;
}

function getGradeValues() {
    let totalArray = [];
    let rawGradeArray = [];
    let weightArray = [];
    const weightValues = getValues("input_weight", weightArray);
    const totalValues = getValues("input_oFA", totalArray);
    const rawGrades = getValues("cust_input_box", rawGradeArray);
    console.log(weightValues)
    console.log(totalValues)
    console.log(rawGrades)
    for (let i = 0; i < rawGrades.length; i++) {
        console.log(rawGrades[i], totalValues[i], weightValues[i])
        gradeArray.push((rawGrades[i] / totalValues[i]) * weightValues[i]);
    }
    console.log(gradeArray)
    return gradeArray;
}

function getValues(classname, array) {
    const inputBoxes = document.getElementsByClassName(classname);
    const inputCount = inputBoxes.length;

    for (let i = 0; i < inputCount; i++) {
        if (!inputBoxes[i].classList.contains('hidden')) {
            array.push(parseInt(inputBoxes[i].value));
        }

    }
    return array;
}


function calculateGrade() {
    document.getElementById("int_col_left").classList.add("hidden");
    document.getElementById("int_col_right").classList.add("hidden");
    let results = document.getElementById("resultMark");
    let grades = document.getElementById("resultGrade");
    grades.innerHTML = "";
    results.innerHTML = "";
    finalMark = "";
    finalGrade = "";
    gradeArray = [];
    total = 0;
    getGradeValues()
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
        } else if (autoFail === true) {
            finalGrade = "You have failed as you are required to achieve at least 50% in all assessments.";
        }
        let markNode = document.createTextNode("Your final mark is " + finalMark.toString())
        let gradeNode = document.createTextNode(finalGrade)
        console.log(finalGrade, finalMark)
        results.appendChild(markNode);
        grades.appendChild(gradeNode);
        if (finalGrade !== null) {
            $("#description").slideUp(400);
        }
        if (finalGrade === "You have achieved a High Distinction") {
            document.getElementById("int_col_left").classList.remove("hidden");
            document.getElementById("int_col_right").classList.remove("hidden");
            let $omg1 = $("#omg1");
            let $omg2 = $("#omg2");
            $omg1.fadeIn();
            $omg1.fadeOut();
            $omg2.fadeIn();
            $omg2.fadeOut();
            $omg1.fadeIn();
            $omg1.fadeOut();
            $omg2.fadeIn();
            $omg2.fadeOut();
            $omg1.fadeIn();
            $omg1.fadeOut();
            $omg2.fadeIn();
            $omg2.fadeOut();
            $omg1.fadeIn();
            $omg1.fadeOut();
            $omg2.fadeIn();
            $omg2.fadeOut();
            $omg1.fadeIn();
            $omg2.fadeIn()
        }
    }
}



function resetPage(e) {
    location.reload();
}

function addError(message) {
    hasErr = true;
    let errorDiv = document.createElement("div");
    errorDiv.id = "error1";
    errorDiv.textContent = message;
    let errorContainer = document.getElementById("error");
    errorContainer.appendChild(errorDiv);
}

function removeError(e) {
    document.getElementById("error").innerHTML = "";
    hasErr = false;
}