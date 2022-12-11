import contactFormConstants from "@/constants/contactFormConstants";

export default {
    renderDOMError: function ({errorMessage, domId}) {
        // Alert the error message
        alert(errorMessage);
        // Get the element by id and assign it as reference.
        let domReference = document.getElementById(domId);
        // Insert to this element's inner html a <p> element containing the error message
        domReference.innerHTML = `<p>${errorMessage}</p>`;
        // Assign the class name of this error to the errorClassName for the stylized DOM error message
        domReference.className = contactFormConstants.errorClassName;
    },

    resetDOMErrors: function (errorComponentIds) {
        // Iterate on the componentId list
        for (let i = 0; i < errorComponentIds.length; i++) {
            // Get the domElement by the id given
            let domReference = document.getElementById(errorComponentIds[i]);
            if (domReference === undefined || domReference === null) {
                continue;
            }
            domReference.className = contactFormConstants.nonDisplayedClassName;
        }
    },
};