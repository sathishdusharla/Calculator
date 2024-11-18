const display = document.getElementById("display");
const equationDisplay = document.getElementById("equation");
const buttons = document.querySelectorAll(".button");


let currentInput = "0";
let previousInput = null;
let operator = null;
let isOperatorClicked = false;
let equation = ""; 

function updateDisplay() {
    display.textContent = currentInput; 
    equationDisplay.textContent = equation;
}

function handleNumber(num) {
    if (isOperatorClicked) {
        currentInput = num;
        isOperatorClicked = false;
    } else {
        currentInput = currentInput === "0" ? num : currentInput + num;
    }
    equation += num; 
    updateDisplay();
}

function handleOperator(op) {
    if (operator && !isOperatorClicked) {
        calculate();
    }
    if (currentInput !== "Error") {
        equation += ` ${op} `;
    }
    previousInput = currentInput;
    operator = op;
    isOperatorClicked = true;
    updateDisplay();
}

function calculate() {
    if (previousInput === null || operator === null) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "−":
            result = prev - current;
            break;
        case "×":
            result = prev * current;
            break;
        case "÷":
            result = current === 0 ? "Error" : prev / current;
            break;
        default:
            return;
    }

    equation = "";
    equationDisplay.textContent = `${previousInput} ${operator} ${current} =`; 
    currentInput = result.toString();
    operator = null;
    previousInput = null;
    updateDisplay();
}

function clearCalculator() {
    currentInput = "0";
    previousInput = null;
    operator = null;
    equation = "";
    isOperatorClicked = false;
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}


function calculatePercentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}


buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value) || value === ".") {
            handleNumber(value);
        } else if (value === "AC") {
            clearCalculator();
        } else if (value === "+/−") {
            toggleSign();
        } else if (value === "%") {
            calculatePercentage();
        } else if (value === "=") {
            calculate();
        } else {
            handleOperator(value);
        }
    });
});

updateDisplay();
