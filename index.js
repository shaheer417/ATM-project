#! /usr/bin/env node
import inquirer from "inquirer";
let currentBalance = 10000;
const pinNumber = 4172;
let customerPin = await inquirer.prompt({
    name: "PinNumber",
    type: "number",
    message: "Welcome! Please enter your pin number: ",
});
if (customerPin.PinNumber === pinNumber) {
    console.log("Please continue.");
    let selectOperator = await inquirer.prompt({
        name: "operator",
        type: "list",
        choices: ["withdraw", "checkBalance", "fastCashWithdrawal"],
    });
    if (selectOperator.operator === "withdraw") {
        let customerAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount to withdraw: ",
        });
        if (currentBalance >= customerAmount.amount) {
            currentBalance -= customerAmount.amount;
            console.log(`Transaction successful. Your new balance is: ${currentBalance}`);
        }
        else {
            console.log("You have insufficient balance.");
        }
    }
    else if (selectOperator.operator === "checkBalance") {
        console.log(`Your current balance is: ${currentBalance}`);
    }
    else if (selectOperator.operator === "fastCashWithdrawal") {
        let selectedOption = await inquirer.prompt({
            name: "fastCashAmount",
            type: "list",
            message: "Select a fast cash amount:",
            choices: [
                { name: "$1000", value: 1000 },
                { name: "$2000", value: 2000 },
                { name: "$3000", value: 3000 },
                { name: "$4000", value: 4000 },
            ],
        });
        if (currentBalance >= selectedOption.fastCashAmount) {
            currentBalance -= selectedOption.fastCashAmount;
            console.log(`Fast cash withdraw successful. Now your new balance is: ${currentBalance}`);
        }
        else {
            console.log("You have insufficient balance for fast cash withdrawal.");
        }
    }
}
else {
    console.log("INVALID PIN NUMBER");
}
