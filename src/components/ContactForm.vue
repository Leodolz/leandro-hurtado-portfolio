<template class="contact-container">
  <!-- When shown in desktops and laptops, this section should occupy the middle-left part of the screen -->
  <section class="left-section">
    <!-- Section title and some sentences as description -->
    <h2>Contact Me</h2>
    <p>Whether you have a question, want to start a project or simply want to connect.</p>
    <p>Feel free to send me a message in the contact form</p>
    <p>After completing the form, it will send me an email with your email as CC for me being able to respond to you</p>
    <br/>
    <br/>
    <!-- Contact info box -->
    <ContactInfo/>
  </section>
  <!-- When shown in desktops and laptops, this is the container of the contact me form -->
  <section class="right-section">
    <!-- Submit action bound to a method -->
    <form @submit="submitInfo">
      <!-- Label surrounding an input for the email given -->
      <label>
        <strong class="required-label">Email: </strong>
        <!-- It is important to have its id and name as firstName for submission and validation, notice that
             the "required" attribute is given for avoiding null inputs
        -->
        <input :id="contactFormNames.emailInputLabel" type="email" :name="contactFormNames.emailInputLabel"
               placeholder="Enter email" required/>
      </label>
      <!-- Label of the error that will be displayed right after the email input. It has the className for
      non-displayed -->
      <label :id="contactFormNames.emailInputLabel + `ErrorLabel`" :class="contactFormNames.nonDisplayedClassName"></label>
      <!-- Line break -->
      <br/>

      <!-- The rest of labels surrounding inputs have the same structure as the one above -->
      <label>
        <strong class="required-label">First Name: </strong>
        <input :id="contactFormNames.firstNameInputLabel" type="text" :name="contactFormNames.firstNameInputLabel"
               placeholder="Enter first name" required/>
      </label>
      <label :id="contactFormNames.firstNameInputLabel+ `ErrorLabel`" :class="contactFormNames.nonDisplayedClassName"></label>
      <br/>

      <label>
        <strong class="required-label">Last Name: </strong>
        <input :id="contactFormNames.lastNameInputLabel" type="text" :name="contactFormNames.lastNameInputLabel"
               placeholder="Enter last name" required/>
      </label>
      <label :id="contactFormNames.lastNameInputLabel + `ErrorLabel`" :class="contactFormNames.nonDisplayedClassName"></label>
      <br/>

      <label>
        <strong>Company: </strong>
        <input :id="contactFormNames.companyInputLabel" type="text" :name="contactFormNames.companyInputLabel"
               placeholder="Enter company name"/>
      </label>
      <br/>

      <label>
        <strong class="required-label">Subject: </strong>
        <input :id="contactFormNames.subjectInputLabel" type="text" :name="contactFormNames.subjectInputLabel"
               placeholder="Enter email subject" required/>
      </label>
      <label :id="contactFormNames.subjectInputLabel + `ErrorLabel`" :class="contactFormNames.nonDisplayedClassName"></label>
      <br/>

      <label>
        <strong class="required-label">Message: </strong>
        <textarea :id="contactFormNames.messageInputLabel" :name="contactFormNames.messageInputLabel"
                  placeholder="Enter email message" required/>
      </label>
      <label :id="contactFormNames.messageInputLabel + `ErrorLabel`" :class="contactFormNames.nonDisplayedClassName"></label>
      <br/>

      <!-- Label surrounding selection for the country in the form -->
      <label>
        <strong>Country: </strong>
        <!-- Select element containing country labels with country codes -->
        <select :id="contactFormNames.countryCodeLabel" :name="contactFormNames.countryCodeLabel">
          <!-- All the possible options from countries given in the countryCodeItems array. We use v-for for
           iterating over each item and place the label and value of country code for vaulable data when
           submitting this form -->
          <option v-for="countryCodeItem in countryCodeItems" :key="`option_country_`+countryCodeItem.code"
                  :value="countryCodeItem.mobileCode" :id="`option_country_`+countryCodeItem.mobileCode">
            {{ countryCodeItem.name }}
          </option>
        </select>
      </label>

      <br/>
      <br/>

      <!-- Label and input for phone number, notice that the type of input is of "tel" -->
      <label>
        <strong>Phone: </strong>
        <input :id="contactFormNames.phoneInputLabel" type="tel" :name="contactFormNames.phoneInputLabel"
               placeholder="Enter phone number"/>
      </label>
      <label :id="contactFormNames.phoneInputLabel + `ErrorLabel`" :class="contactFormNames.nonDisplayedClassName"></label>
      <br/>
      <!-- Conditional rendered success tag that should be shown when the form was successfully submitted, we use
       the submitted boolean variable -->
      <p v-if="submitted" class="submit-success">Success! Thank you for contacting me</p>
      <!-- Button that will trigger submission and is rendered when the submitted variable is false -->
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
  // Component name and properties passed from parent
  name: "ContactForm",
  props: {
    countryCodeItems: Array,
    contactFormNames: Object,
  },
  // Components this template will be using
  components: {
    ContactInfo,
  },
  // Attributes that will be accessible in this component
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
    // Function for validating all the information on the contact form
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
      // Validate the email by fetching the input's value by Id
      if (stringValidators.validateEmail(document.getElementById(this.contactFormNames.emailInputLabel).value) === false) {
        return false;
      }
      // Get the phone and validate it
      const phone = document.getElementById(this.contactFormNames.phoneInputLabel).value;
      if (phone !== undefined && phone !== null && phone.trim().length > 0 ) {
        if(stringValidators.validatePhone(phone) === false) {
          // If it has not been validated, render the DOM error
          errorHelper.renderDOMError({
            errorMessage: "Invalid phone input. Please enter all numeric characters and it should be at least 3 digits",
            domId: this.contactFormNames.phoneInputLabel + "ErrorLabel"
          });
          // Returning false as it did not pass this validation
          return false;
          // If the phone was given but no country given, then we should force the user choose a country
        } else if(document.getElementById(this.contactFormNames.countryCodeLabel).value.length < 1) {
          // Render respective DOM error
          errorHelper.renderDOMError({
            errorMessage: "Phone gave a valid input but no country was selected! Please select one",
            domId: this.contactFormNames.phoneInputLabel + "ErrorLabel"
          });
          // Return false after rendering error
          return false;
        }
      }
      // Validate the lengths for fields we want to limit the number of characters
      if (stringValidators.validateFieldLengths([
        {targetSize: 80, fieldId: this.contactFormNames.subjectInputLabel, fieldName: "subject"},
        {targetSize: 800, fieldId: this.contactFormNames.messageInputLabel, fieldName: "message"},
      ]) === false) {
        // If any of these are above their limits, return false
        return false;
      }
      // If no previous validation errors happened before, then we return true for the form data to be submitted.
      return true;
    },
    // Method that is called when submission event is triggered
    submitInfo: async function (e) {
      // Prevent page reload on submission
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

    // Method for building the body for sending to the backend server as POST
    buildServerMessage: function() {
      // Get the country code value from its selection
      let countryCode = document.getElementById(this.contactFormNames.countryCodeLabel).value;
      // Initialize country variable
      let country = "";
      // Get the phone from its input
      let phone = document.getElementById(this.contactFormNames.phoneInputLabel).value;
      // If we do have a country code, then obtain the name of the country
      if(countryCode.length > 0) {
        country += document.getElementById("option_country_"+countryCode).innerHTML;
      }
      // If we do have a phone number, add its country code before the number
      if(phone.length > 0) {
        phone = countryCode + phone;
      }
      // Return the object with the needed attributes and values from their inputs
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

<style lang="scss" scoped>
/* Import these two stylesheets and we want scoped styling, therefore using scss */
@import "@/styles/formStyle.scss";
@import "@/styles/contactStyle.scss";

</style>