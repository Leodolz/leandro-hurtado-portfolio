<template>
  <noscript>
    This section uses Javascript for filling, validating and uploading a contact form. Please enable Javascript
    for being able to have the intended experience for this webpage. Else, feel free to reach out externally. My
    contact info is shown below:
    <ContactInfo />
  </noscript>
  <section class="left-section">
    <h2>Contact Me</h2>
    <p>Whether you have a question, want to start a project or simply want to connect.</p>
    <p>Feel free to send me a message in the contact form</p>
    <p>After completing the form, it will send me an email with your email as CC for me being able to respond to you</p>
    <br/>
    <br/>
    <ContactInfo/>
  </section>
  <section class="right-section">
    <form @submit="submitInfo">
      <!-- Label and input for the first name given -->
      <label>
        <strong class="required-label">Email: </strong>
        <!-- It is important to have its id and name as firstName for submission and validation, notice that
             the "required" attribute is given for avoiding null inputs
        -->
        <input :id="contactFormNames.emailInputLabel" type="email" :name="contactFormNames.emailInputLabel"
               placeholder="Enter email" required/>
      </label>
      <!-- Label of the error that will be displayed right after the firstName input. It has the className for
      non-displayed -->
      <label :id="contactFormNames.emailInputLabel + `ErrorLabel`" :class="contactFormNames.nonDisplayedClassName"></label>
      <!-- Line break -->
      <br/>
      <!-- Label and input for the first name given -->
      <label>
        <strong class="required-label">First Name: </strong>
        <!-- It is important to have its id and name as firstName for submission and validation, notice that
             the "required" attribute is given for avoiding null inputs
        -->
        <input :id="contactFormNames.firstNameInputLabel" type="text" :name="contactFormNames.firstNameInputLabel"
               placeholder="Enter first name" required/>
      </label>
      <!-- Label of the error that will be displayed right after the firstName input. It has the className for
      non-displayed -->
      <label :id="contactFormNames.firstNameInputLabel+ `ErrorLabel`" :class="contactFormNames.nonDisplayedClassName"></label>
      <!-- Line break -->
      <br/>
      <!-- Label and input for the first name given -->
      <label>
        <strong class="required-label">Last Name: </strong>
        <!-- It is important to have its id and name as firstName for submission and validation, notice that
             the "required" attribute is given for avoiding null inputs
        -->
        <input :id="contactFormNames.lastNameInputLabel" type="text" :name="contactFormNames.lastNameInputLabel"
               placeholder="Enter last name" required/>
      </label>
      <!-- Label of the error that will be displayed right after the firstName input. It has the className for
      non-displayed -->
      <label :id="contactFormNames.lastNameInputLabel + `ErrorLabel`" :class="contactFormNames.nonDisplayedClassName"></label>
      <!-- Line break -->
      <br/>
      <!-- Label and input for the first name given -->
      <label>
        <strong>Company: </strong>
        <!-- It is important to have its id and name as firstName for submission and validation, notice that
             the "required" attribute is given for avoiding null inputs
        -->
        <input :id="contactFormNames.companyInputLabel" type="text" :name="contactFormNames.companyInputLabel"
               placeholder="Enter company name"/>
      </label>
      <!-- Line break -->
      <br/>
      <!-- Label and input for the first name given -->
      <label>
        <strong class="required-label">Subject: </strong>
        <!-- It is important to have its id and name as lastName for submission and validation, notice that
             the "required" attribute is given for avoiding null inputs
        -->
        <input :id="contactFormNames.subjectInputLabel" type="text" :name="contactFormNames.subjectInputLabel"
               placeholder="Enter email subject" required/>
      </label>
      <!-- Label of the error that will be displayed right after the lastName input. It has the className for
      non-displayed -->
      <label :id="contactFormNames.subjectInputLabel + `ErrorLabel`" :class="contactFormNames.nonDisplayedClassName"></label>
      <!-- Line break -->
      <br/>
      <!-- Label and input for last name given -->
      <label>
        <strong class="required-label">Message: </strong>
        <!-- It is important to have its id and name as lastName for submission and validation, notice that
             the "required" attribute is given for avoiding null inputs
        -->
        <textarea :id="contactFormNames.messageInputLabel" :name="contactFormNames.messageInputLabel"
                  placeholder="Enter email message" required/>
      </label>
      <!-- Label of the error that will be displayed right after the lastName input. It has the className for
      non-displayed -->
      <label :id="contactFormNames.messageInputLabel + `ErrorLabel`" :class="contactFormNames.nonDisplayedClassName"></label>
      <!-- Line break -->
      <br/>
      <!-- Label and input for facilitator given -->
      <label>
        <strong>Country: </strong>
        <!-- It is important to have its id and name as facilitator for submission and validation, notice that
             the "required" attribute is given for avoiding null inputs
        -->
        <select :id="contactFormNames.countryCodeLabel" :name="contactFormNames.countryCodeLabel">
          <option v-for="countryCodeItem in countryCodeItems" :key="`option_country_`+countryCodeItem.code"
                  :value="countryCodeItem.mobileCode" :id="`option_country_`+countryCodeItem.mobileCode">
            {{ countryCodeItem.name }}
          </option>
        </select>
      </label>
      <br/>
      <br/>
      <label>

        <strong>Phone: </strong>

        <input :id="contactFormNames.phoneInputLabel" type="tel" :name="contactFormNames.phoneInputLabel"
               placeholder="Enter phone number"/>
      </label>
      <!-- Label of the error that will be displayed right after the facilitator input. It has the className for
      non-displayed -->
      <label :id="contactFormNames.phoneInputLabel + `ErrorLabel`" :class="contactFormNames.nonDisplayedClassName"></label>
      <!-- Line break -->
      <br/>
      <p v-if="submitted" class="contact-success">Success! Thank you for contacting me</p>
      <button v-else id="submitContactButton"><p>Submit</p></button>
    </form>
  </section>
</template>

<script>

import ContactInfo from "@/components/ContactInfo";
import stringValidators from "@/validators/stringValidators";
import errorHelper from "@/helpers/errorHelper";
import backendConstants from "@/constants/backendConstants";

export default {
  name: "ContactForm",
  props: {
    countryCodeItems: Array,
    contactFormNames: Object,
  },
  components: {
    ContactInfo,
  },
  data() {
    return {
      labelIds: [
        this.contactFormNames.firstNameInputLabel,
        this.contactFormNames.lastNameInputLabel,
        this.contactFormNames.companyInputLabel,
        this.contactFormNames.emailInputLabel,
        this.contactFormNames.subjectInputLabel,
        this.contactFormNames.messageInputLabel,
        this.contactFormNames.phoneInputLabel,
      ],
      submitted: false,
    }
  },
  methods: {
    validateInfo: function () {
      // Call the function for validating names, we pass an array of objects containing the "value" and "domId"
      // attributes each. We also trim the values from the input as the server we will call admits empty spaces
      // at the start and end of the strings on its submissions
      if (stringValidators.validateNames(this.labelIds.slice(0, 2).map((item) => {
        return {
          value: document.getElementById(item).value,
          domId: item + "ErrorLabel",
        }
      })) === false) {
        // If the function returns false, we directly return false as the error was already alerted and rendered
        // By returning false here, we avoid the submission of the form until everything is correct.
        return false;
      }
      if (stringValidators.validateEmail(document.getElementById(this.contactFormNames.emailInputLabel).value) === false) {
        return false;
      }
      const phone = document.getElementById(this.contactFormNames.phoneInputLabel).value;
      if (phone !== undefined && phone !== null && phone.trim().length > 0 ) {
        if(stringValidators.validatePhone(phone) === false) {
          errorHelper.renderDOMError({
            errorMessage: "Invalid phone input. Please enter all numeric characters and it should be at least 3 digits",
            domId: this.contactFormNames.phoneInputLabel + "ErrorLabel"
          });
          return false;
        } else if(document.getElementById(this.contactFormNames.countryCodeLabel).value.length < 1) {
          errorHelper.renderDOMError({
            errorMessage: "Phone gave a valid input but no country was selected! Please select one",
            domId: this.contactFormNames.phoneInputLabel + "ErrorLabel"
          });
          return false;
        }
      }
      if (stringValidators.validateFieldsLengths([
        {targetSize: 80, fieldId: this.contactFormNames.subjectInputLabel, fieldName: "subject"},
        {targetSize: 800, fieldId: this.contactFormNames.messageInputLabel, fieldName: "message"},
      ]) === false) {
        return false;
      }
      // If no previous validation errors happened before, then we return true for the form data to be submitted.
      return true;
    },
    submitInfo: async function (e) {
      e.preventDefault();
      // Firstly reset all the already rendered DOM errors as this is a new submission that may have new errors or none
      // at all. We pass an array of the ids of the components where errors were rendered.
      errorHelper.resetDOMErrors(this.labelIds.map((item) => item + "ErrorLabel"));
      if(this.validateInfo()) {
        const response = await fetch(backendConstants.domainUrl+'/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: "follow",
          body: JSON.stringify(this.buildServerMessage())
        });
        if(response.ok) {
          const jsonResponse = await response.json();
          if(jsonResponse.success) {
            this.submitted = true;
          } else {
            alert(jsonResponse.errorMessage);
          }
        }
      }
    },

    buildServerMessage: function() {
      let countryCode = document.getElementById(this.contactFormNames.countryCodeLabel).value;
      let country = "";
      let phone = document.getElementById(this.contactFormNames.phoneInputLabel).value;
      if(countryCode.length > 0) {
        country += document.getElementById("option_country_"+countryCode).innerHTML;
      }
      if(phone.length > 0) {
        phone = countryCode + phone;
      }
      return {
        email: document.getElementById(this.contactFormNames.emailInputLabel).value,
        firstName: document.getElementById(this.contactFormNames.firstNameInputLabel).value,
        lastName: document.getElementById(this.contactFormNames.lastNameInputLabel).value,
        company: document.getElementById(this.contactFormNames.companyInputLabel).value,
        subject: document.getElementById(this.contactFormNames.subjectInputLabel).value,
        message: document.getElementById(this.contactFormNames.messageInputLabel).value,
        country,
        phone,
      }
    },
  }
}
</script>

<style scoped>
.contact-info strong {
  font-style: oblique;
}

.right-section, .left-section, input, textarea {
  box-sizing: border-box;
  margin: 0;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.right-section {
  display: flex;
  width: 100%;
  padding: 1em;
  background-color: white;
  justify-content: center;
  align-items: center;
}

.left-section {
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;
  color: white;
  background-color: teal;
}

input, textarea, select {
  display: flex;
  background-color: #eee;
  border: none;
  padding: 12px;
  margin-top: 8px;
  clear: both;
  width: 100%;
  font-size: 0.8rem;
}

form {
  width: 100%;
}

input:focus, textarea:focus {
  outline: 1px solid teal;
}

button {
  display: flex;
  margin: 0 auto;
  border-radius: 20px;
  border: 1px solid #00b4cf;
  background-color: #00b4cf;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

button:hover {
  opacity: 0.7;
}

.left-section p {
  margin: 1em 2em;
  text-align: left;
}

form p {
  text-align: left;
  justify-content: left;
}

textarea {
  height: 100px;
}

@media (max-width: 500px) {
  form {
    width: 100%;
  }

  .right-section {
    display: flex;
    max-width: 400px;
  }
}


/* Style the elements of class non displayed where we don't want them to be rendered */
.non-displayed {
  display: none;
}

/* Style elements that will be rendered when an error happened */
.errorMessage {
  /* Red color for this error message */
  color: red;
  /* Set the font family for a different one to highlight it is an error in validation */
  font-family: Lucida Console, monospace;
  /* Set the size of the error */
  font-size: 12px;
  /* Set the display type of the error message */
  display: block;
}

/* For all paragraph elements that are contained in the errorMessage label, style their padding and margin */
.errorMessage p {
  padding: 0 2rem;
  margin: 0 0;
}

.required-label::after {
  content: "*";
  color: red;
}

.contact-success {
  padding: 10px 5px;
  border: #2fbd2f solid;
  background-color: lightgreen;
  color: black;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  border-radius: 15px;
  text-align: center;
  justify-content: center;
}

</style>