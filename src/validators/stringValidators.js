// We create as constant of our regex for complying with the assignment's inquiry, which is to have the first name,
// the last name and facilitator as valid names. This regex firstly wraps everything with "^" and "$" which means
// that we are referencing the entire string to be validated. We use [A-z] for determining that we want only alpha
// characters that are A-Z and a-z, we want it not to be case-sensitive, this is why we use A-z which means A-Z and
// a-z. After that we use {2,} whereas the number 2 means that we need at LEAST 2 characters in the string and the
// comma with an empty space means that optionally there can be more iterations from [A-z] characters. This regex
// fulfills with the requirements that it must be all alpha characters and should have a minimum of 2 characters.
const nameRegex = /^[A-z]{2,}$/;

// The email regex asks to have as 1 or more characters any alphanumeric character, followed by optional
// dashes, points and lower dashes, after any dash or lower dash another alphanumeric character, then the "@"
// symbol, after we repeat a similar pattern for the domain name until we reach the dot, and we must only have
// alpha characters in lowercase
const emailRegex = /^[a-zA-Z0-9]{1,}([_\-.]*[a-zA-Z0-9]{1,})@[a-zA-Z0-9]{1,}([_\-.]*[a-zA-Z0-9]{1,})\.[a-z]{1,}$/;

// The phone regex indicates at least 3 characters all numeric
const phoneRegex = /^[0-9]{3,}$/;

import contactFormConstants from "@/constants/contactFormConstants";
import errorHelper from "@/helpers/errorHelper";

export default {
    validateNames: function (names) {
        // Cycle through each of the names as items in the array
        for (let i = 0; i < names.length; i++) {
            // Test the name's value attribute against the nameRegex
            if (nameRegex.test(names[i].value) === false) {
                // If test is false, create the error message using the given name
                let errorMessage = "Invalid name: \"" + names[i].value +
                    "\"\nIt should at least be 2 characters long and be alpha characters only.";
                // Call the DOM rendering using the error message and the domId of the name given where we want
                // to render the error.
                errorHelper.renderDOMError(
                    {
                        errorMessage,
                        domId: names[i].domId
                    });
                // Exit the function and return false.
                return false;
            }
        }
        // After iterating all objects without issues, it means that everything is valid, therefore return true.
        return true;
    },
    // Method for validating the email
    validateEmail: (email) => {
        // Test the email given with our regex
       if(!emailRegex.test(email)) {
           // If not valid render the DOM error using the email input label from DOM and return false
           errorHelper.renderDOMError({
               errorMessage: "Invalid email! Please enter a valid email. Example: test@mail.com",
               domId: contactFormConstants.emailInputLabel + "ErrorLabel"
           });
           return false;
       }
       // If it reaches here, it means it passed the regex test
       return true;
    },
    // Method for validating the phone against its regex
    validatePhone: (phone) => {
        return phoneRegex.test(phone);
    },

    // Function for validating an array of names. If any of these names is invalid, it will directly return false and will
    // both alert the error message and render it on the DOM, otherwise it will return true
    validateFieldLengths: function (fieldsWithSizes) {
        // Iterate over every field element using ES6 style
        for (let fieldWithSize of fieldsWithSizes) {
            // Decompose its necessary attributes from this object in ES6 style's destructuring
            const {targetSize, fieldId, fieldName} = fieldWithSize;
            // Get the target value from DOM
            let targetValue = document.getElementById(fieldId).value;
            // Initialize it being a valid result
            let validResult = true;
            // Make sure if it is not undefined, null or empty
            if (targetValue === undefined || targetValue === null || targetValue.length === 0) {
                validResult = false;
                // Make sure it is not only composed of white spaces
            } else if (targetValue.trim().length < 1) {
                validResult = false;
                // Make sure its length is longer than the max target size
            } else if (targetValue.trim().length > targetSize) {
                validResult = false;
            }
            // If it is not a valid result, then render the error message and return true
            if (!validResult) {
                let errorMessage = `Invalid entry for ${fieldName}. It should not be empty and have a max length of ${targetSize}`;
                errorHelper.renderDOMError({
                    errorMessage,
                    domId: fieldId + "ErrorLabel"
                });
                return false;
            }
        }
        // If it reached here it means all validation passed
        return true;
    },
};