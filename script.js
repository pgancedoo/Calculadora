let currentDisplay = "0";
let currentOperator = "";
let firstOperand = null;
let waitingForSecondOperand = false;
let resultCalculated = false;

function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = currentDisplay.replace(".", ",");
}

function appendNumber(number) {
  if (resultCalculated) {
    clearDisplay();
  }

  if (currentDisplay === "0" || waitingForSecondOperand) {
    currentDisplay = number.toString();
    waitingForSecondOperand = false;
    resultCalculated = false;
  } else if (currentDisplay.length < 9) {
    currentDisplay += number;
  }
  updateDisplay();
}

function appendDecimal() {
  if (waitingForSecondOperand) return;
  if (!currentDisplay.includes(",")) {
    currentDisplay += ",";
  }
  updateDisplay();
}

function appendOperator(operator) {
  if (waitingForSecondOperand) {
    currentOperator = operator;
    return;
  }
  if (firstOperand === null) {
    firstOperand = parseFloat(currentDisplay.replace(",", "."));
  } else if (currentOperator) {
    const result = performCalculation();
    currentDisplay = formatResult(result);
    firstOperand = result;
  }
  currentOperator = operator;
  waitingForSecondOperand = true;
  resultCalculated = false;
  updateDisplay();
}

function performCalculation() {
  const operand1 = parseFloat(firstOperand);
  const operand2 = parseFloat(currentDisplay.replace(",", "."));
  if (currentOperator === "+") {
    return operand1 + operand2;
  } else if (currentOperator === "-") {
    return operand1 - operand2;
  } else if (currentOperator === "*") {
    return operand1 * operand2;
  } else if (currentOperator === "/") {
    return operand1 / operand2;
  }
}

function formatResult(result) {
  const roundedResult = parseFloat(result.toFixed(8));
  return roundedResult.toString().replace(".", ",").substring(0, 9);
}

function calculateResult() {
  if (currentOperator && !waitingForSecondOperand) {
    const result = performCalculation();
    currentDisplay = formatResult(result);
    firstOperand = result;
    currentOperator = "";
    waitingForSecondOperand = false;
    resultCalculated = true;
    updateDisplay();
  }
}

function clearDisplay() {
  currentDisplay = "0";
  currentOperator = "";
  firstOperand = null;
  waitingForSecondOperand = false;
  resultCalculated = false;
  updateDisplay();
}

function toggleSign() {
  if (currentDisplay !== "0") {
    currentDisplay = (parseFloat(currentDisplay.replace(",", ".")) * -1)
      .toString()
      .replace(".", ",");
    updateDisplay();
  }
}

function percentage() {
  currentDisplay = (parseFloat(currentDisplay.replace(",", ".")) / 100)
    .toString()
    .replace(".", ",");
  updateDisplay();
}
updateDisplay();
