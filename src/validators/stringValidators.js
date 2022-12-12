// We create as constant of our regex for complying with the assignment's inquiry, which is to have the first name,
// the last name and facilitator as valid names. This regex firstly wraps everything with "^" and "$" which means
// that we are referencing the entire string to be validated. We use [A-z] for determining that we want only alpha
// characters that are A-Z and a-z, we want it not to be case-sensitive, this is why we use A-z which means A-Z and
// a-z. After that we use {2,} whereas the number 2 means that we need at LEAST 2 characters in the string and the
// comma with an empty space means that optionally there can be more iterations from [A-z] characters. This regex
// fulfills with the requirements that it must be all alpha characters and should have a minimum of 2 characters.
const nameRegex = /^[A-z]{2,}$/;
const emailRegex = /^[a-zA-Z0-9]{1,}([_\-.]*[a-zA-Z0-9]{1,})@[a-zA-Z0-9]{1,}([_\-.]*[a-zA-Z0-9]{1,})\.[a-z]{1,}$/;
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
    validateEmail: (email) => {
       if(!emailRegex.test(email)) {
           errorHelper.renderDOMError({
               errorMessage: "Invalid email! Please enter a valid email. Example: test@mail.com",
               domId: contactFormConstants.emailInputLabel + "ErrorLabel"
           });
           return false;
       }
       return true;
    },
    validatePhone: (phone) => {
        return phoneRegex.test(phone);
    },

    // Function for validating an array of names. If any of these names is invalid, it will directly return false and will
    // both alert the error message and render it on the DOM, otherwise it will return true
    validateFieldLengths: function (fieldsWithSizes) {
        for (let fieldWithSize of fieldsWithSizes) {
            const {targetSize, fieldId, fieldName} = fieldWithSize;
            let targetValue = document.getElementById(fieldId).value;
            let validResult = true;
            if (targetValue === undefined || targetValue === null || targetValue.length === 0) {
                validResult = false;
            } else if (targetValue.trim().length < 1) {
                validResult = false;
            } else if (targetValue.trim().length > targetSize) {
                validResult = false;
            }
            if (!validResult) {
                let errorMessage = `Invalid entry for ${fieldName}. It should not be empty and have a max length of ${targetSize}`;
                errorHelper.renderDOMError({
                    errorMessage,
                    domId: fieldId + "ErrorLabel"
                });
                return false;
            }
        }
        return true;
    },
};