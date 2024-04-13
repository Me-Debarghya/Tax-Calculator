document.addEventListener("DOMContentLoaded", function () {
    const grossIncomeInput = document.getElementById("grossIncome");
    const extraIncomeInput = document.getElementById("extraIncome");
    const deductionsInput = document.getElementById("deductions");

    const errorIconGrossIncome = document.getElementById("errorIconGrossIncome");
    const errorIconExtraIncome = document.getElementById("errorIconExtraIncome");
    const errorIconDeductions = document.getElementById("errorIconDeductions");

    // Attach input event listeners to validate input in real-time
    grossIncomeInput.addEventListener("input", function () {
        validateInput(grossIncomeInput, errorIconGrossIncome);
    });

    extraIncomeInput.addEventListener("input", function () {
        validateInput(extraIncomeInput, errorIconExtraIncome);
    });

    deductionsInput.addEventListener("input", function () {
        validateInput(deductionsInput, errorIconDeductions);
    });

    // Validate inputs initially
    validateInput(grossIncomeInput, errorIconGrossIncome);
    validateInput(extraIncomeInput, errorIconExtraIncome);
    validateInput(deductionsInput, errorIconDeductions);

    const submitButton = document.getElementById("button");
    submitButton.addEventListener("click", function () {
        const grossIncome = parseFloat(grossIncomeInput.value);
        const extraIncome = parseFloat(extraIncomeInput.value);
        const deductions = parseFloat(deductionsInput.value);

        if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions)) {
            alert("Please enter valid numerical values.");
            return;
        }

        // Calculate overall income after deductions
        const overallIncome = grossIncome + extraIncome - deductions;

        // Check if overall income is less than or equal to 8 Lakhs
        if (overallIncome <= 800000) {
            displayResult("No tax deducted for overall income under 8 Lakhs.");
            return;
        }

        // Calculate tax amount
        let taxAmount = 0;
        const ageGroup = document.getElementById("ageGroup").value;
        if (ageGroup === "<40") {
            taxAmount = (overallIncome - 800000) * 0.3;
        } else if (ageGroup === "41-60") {
            taxAmount = (overallIncome - 800000) * 0.4;
        } else if (ageGroup === "≥60") {
            taxAmount = (overallIncome - 800000) * 0.1;
        }

        // Calculate overall amount after tax deduction
        const overallAmountAfterTax = overallIncome - taxAmount;

        // Display overall amount after tax deduction in modal
        displayResult(`Overall amount after tax deduction: ${overallAmountAfterTax.toFixed(2)} Lakhs`);
    });
});

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function validateInput(input, errorIcon) {
    if (!isNumeric(input.value)) {
        showErrorIcon(errorIcon, "Please enter a valid number");
    } else {
        hideErrorIcon(errorIcon);
    }
}

function showErrorIcon(icon, errorMessage) {
    icon.style.display = "inline-block";
    icon.setAttribute("data-bs-toggle", "tooltip");
    icon.setAttribute("title", errorMessage);
    new bootstrap.Tooltip(icon);
}

function hideErrorIcon(icon) {
    icon.style.display = "none";
    icon.removeAttribute("data-bs-toggle");
    icon.removeAttribute("title");
}

function displayResult(message) {
    const resultModalBody = document.getElementById("resultBody");
    resultModalBody.innerHTML = `<p>${message}</p>`;

    // Show the result modal
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
}
