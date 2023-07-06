const display1Element = document.querySelector(".disp-1");
const display2Element = document.querySelector(".disp-2");
const tempResultElement = document.querySelector(".temp-result");
const numberElement = document.querySelectorAll(".num");
const operationElement = document.querySelectorAll(".op");
const equalElement = document.querySelector(".btn-equal");
const clearAllElement = document.querySelector(".btn-all-clear");
const clearLastElement = document.querySelector(".btn-last-entity-clear");

let display1Num = "";
let display2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numberElement.forEach((num) => {
    num.addEventListener("click", (e) => {
        if(e.target.innerText === "." && !haveDot){
            haveDot = true;
        }
        else if(e.target.innerText === "." && haveDot){
            return;
        }
        display2Num += e.target.innerText;
        display2Element.innerText = display2Num;
    });
});

operationElement.forEach((op) => {
    op.addEventListener("click", (e) => {
        if(!display2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if(display1Num && display2Num && lastOperation){
            mathOperation();
        }else{
            result = parseFloat(display2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
        console.log(result);
    });
});

function clearVar(name = ""){
    display1Num += display2Num + "" + name + "";
    display1Element.innerText = display1Num;
    display2Element.innerText = "";
    display2Num = "";
    tempResultElement.innerText = result;
}

function mathOperation() {
    if (lastOperation === "x") {
        result = parseFloat(result) * parseFloat(display2Num);
    } else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(display2Num);
    } else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(display2Num);
    } else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(display2Num);
    } else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(display2Num);
    }
}

equalElement.addEventListener("click", () => {
    if(!display2Num || !display1Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2Element.innerText = result;
    tempResultElement.innerText = "";
    display2Num = result;
    display1Num = "";
});

clearAllElement.addEventListener("click", () => {
    display1Num = "";
    display2Num = "";
    display1Element.innerText = "";
    display2Element.innerText = "";
    result = "";
    tempResultElement.innerText = "";
});

clearLastElement.addEventListener("click", () => {
    display2Element.innerText = "";
    display2Num = "";
});

window.addEventListener("keydown", (e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."
    ) {
        clickButtonElement(e.key);
    } else if (
        e.key === "+" ||
        e.key === "-" ||
        e.key === "/" ||
        e.key === "%"
    ) {
        clickOperation(e.key);
    } else if (e.key === "*") {
        clickOperation("x");
    } else if (e.key == "Enter" || e.key === "=") {
        clickEqual();
    }
});

function clickButtonElement(key) {
    numberElement.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    });
}

function clickOperation(key) {
    operationElement.forEach((operation) => {
        if (operation.innerText === key) {
            operation.click();
        }
    });
}

function clickEqual() {
    equalElement.click();
}