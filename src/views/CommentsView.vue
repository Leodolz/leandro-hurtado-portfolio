<template>
  <div id="padded-container">
    <h2>Please feel free to leave a comment below!</h2>
    <!-- This form below is for submitting comments -->
    <form @submit="submitComment">
      <label>
        <strong class="required-label">Email: </strong>
        <!-- It is important to have its id and name as email for submission and validation, notice that
             the "required" attribute is given for avoiding null inputs
        -->
        <input :id="contactFormConstants.emailInputLabel" type="email" :name="contactFormConstants.emailInputLabel"
               placeholder="Enter email" required/>
      </label>
      <!-- Label of the error that will be displayed right after the email input. It has the className for
      non-displayed -->
      <label :id="contactFormConstants.emailInputLabel + `ErrorLabel`" class="non-displayed"></label>
      <!-- Line break -->
      <br/>
      <!-- Similar structure for the rest of labels surrounding inputs -->
      <label>
        <strong class="required-label">First Name: </strong>
        <input :id="contactFormConstants.firstNameInputLabel" type="text"
               :name="contactFormConstants.firstNameInputLabel"
               placeholder="Enter first name" required/>
      </label>
      <label :id="contactFormConstants.firstNameInputLabel+ `ErrorLabel`" class="non-displayed"></label>
      <br/>
      <label>
        <strong class="required-label">Last Name: </strong>
        <input :id="contactFormConstants.lastNameInputLabel" type="text" :name="contactFormConstants.lastNameInputLabel"
               placeholder="Enter last name" required/>
      </label>

      <label :id="contactFormConstants.lastNameInputLabel + `ErrorLabel`" class="non-displayed"></label>
      <br/>

      <label>
        <strong class="required-label">Comment: </strong>
        <textarea :id="contactFormConstants.messageInputLabel" :name="contactFormConstants.messageInputLabel"
                  placeholder="Enter comment" required/>
      </label>
      <label :id="contactFormConstants.messageInputLabel + `ErrorLabel`"></label>
      <br/>
      <!-- Submission success label when form was validated and sent, we used v-if for conditional rendering -->
      <p v-if="submitted" class="submit-success">Success! Thank you for leaving a comment</p>
      <!-- While the form is not a success, show the button available -->
      <button v-else id="submitContactButton"><p>Submit Comment</p></button>
    </form>
    <br/>
    <!-- Other commenters section -->
    <section>
      <h2>What other visitors commented</h2>
      <!-- Comment list where we use fetched array of comments, it is only shown when comments are loaded -->
      <CommentList :comment-items="commentItems" v-if="loadedComments"/>
      <!-- Label for showing when comments are not loaded yet -->
      <p v-else>Loading comments, please wait...</p>
    </section>
    <br/>
  </div>
</template>

<script>

import contactFormConstants from "@/constants/contactFormConstants";
import CommentList from "@/components/CommentList";
import errorHelper from "@/helpers/errorHelper";
import stringValidators from "@/validators/stringValidators";
import backendConstants from "@/constants/backendConstants";
import fetchHelper from "@/helpers/fetchHelper";

export default {
  name: 'CommentsView',
  components: {CommentList},
  data() {
    return {
      // We make contactFormConstants available in this component
      contactFormConstants,
      // Comment items initially empty array
      commentItems: [],
      // Label ids from constants
      labelIds: [
        contactFormConstants.firstNameInputLabel,
        contactFormConstants.lastNameInputLabel,
        contactFormConstants.emailInputLabel,
        contactFormConstants.messageInputLabel,
      ],
      // Submission is false when loading this page
      submitted: false,
      loadedComments: false,
    }
  },
  // Lifecycle method when the page is mounted, we call for comment loading
  async mounted() {
    await this.loadComments();
  },
  methods: {
    // Load comments and manage state to reflect the successful or failed action
    loadComments: async function () {
      // Fetch comments from server using private function
      let comments = await fetchHelper.getFetchedItems("/comments", "comments", []);
      // Check if comments are an array with size
      if (comments !== null && comments.length > 0) {
        // Save these fetched comments in our state
        this.commentItems = comments;
      }
      // Either if it was a success or not, we indicate we finished the process for loading comments
      this.loadedComments = true;
    },
    // Helper method for building the comment body for submission and posting it to the server
    buildCommentBody: function () {
      // Return object with the following attributes using the values from the inputs by using getElementById
      return {
        email: document.getElementById(contactFormConstants.emailInputLabel).value,
        firstName: document.getElementById(contactFormConstants.firstNameInputLabel).value,
        lastName: document.getElementById(contactFormConstants.lastNameInputLabel).value,
        comment: document.getElementById(contactFormConstants.messageInputLabel).value,
      }
    },
    // Function for validating all the information that was input in the comment section
    validateInfo: function () {
      // We call helper function for validating names, and we pass on the list of names, as our label ids' first
      // two entries are for names, we use slice and map these items for managing an array with the attributes listed
      // below
      if (stringValidators.validateNames(this.labelIds.slice(0, 2).map((item) => {
        // As the validateNames method needs an array of objects with this structure, we map it this way
        return {
          value: document.getElementById(item).value,
          domId: item + "ErrorLabel",
        }
      })) === false) {
        // If the function returns false, we directly return false as the error was already alerted and rendered
        // By returning false here, we avoid the submission of the form until everything is correct.
        return false;
      }
      // We pass on the string email to our validator, if it did not pass, we return false and avoid submission
      if (stringValidators.validateEmail(document.getElementById(contactFormConstants.emailInputLabel).value) === false) {
        return false;
      }
      // Finally, we check the lengths from fields of our interest, in this case
      if (stringValidators.validateFieldLengths([
        {targetSize: 300, fieldId: contactFormConstants.messageInputLabel, fieldName: "comment"},
      ]) === false) {
        return false;
      }

      return true;
    },
    // Routine for handling the response received from server for comments
    processReceivedResponse: async function (response) {
      // Parse response to json
      const jsonResponse = await response.json();
      // Check that the response has a success attribute and that it is true
      if (jsonResponse.success) {
        // If the response has a "frequent" flag and set to true, tell the user that its comment has been
        // updated
        if (jsonResponse.frequent === true) {
          alert("Looks like you already posted a comment, we just updated your previous comment!\n" +
              "All emails are allowed to comment only once, later comments will update the original one");
        }

        // Either as an updated comment or a new comment, thank the user for uploading a comment
        alert("Thank you for uploading a comment!");
        // Change states to a successful comment submission and reload comments
        this.submitted = true;
        this.loadedComments = false;
        await this.loadComments();
      } else {
        // If there is no success attribute, tell the user about the error
        alert(jsonResponse.errorMessage);
      }
    },
    // Routine for submitting comment
    submitComment: async function (e) {
      // Prevent page reload on submission
      e.preventDefault();
      // Reset all the errors that were rendered in the DOM
      errorHelper.resetDOMErrors(this.labelIds.map((item) => item + "ErrorLabel"));
      // Call helper method to validate all information, if it returns false, exit this method
      if (!this.validateInfo()) {
        return;
      }
      // Fetch to the server using a POST call for uploading all the validated information
      const response = await fetch(backendConstants.domainUrl + '/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: "follow",
        // Stringify the object into a JSON for better submission
        body: JSON.stringify(this.buildCommentBody())
      });
      // If we received a manageable response, process it
      if (response.ok) {
        await this.processReceivedResponse(response);
      }
    },
  }
}
</script>

<style lang="scss" scoped>

/* Use external style sheets, we use scss instead of css because it works on having scoped styling */
@import "@/styles/formStyle.scss";
@import "@/styles/genericStyle.scss";

/* Form should be centered, have a width depending on the device with a max with and a background with padding */
form {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  max-width: 500px;
  background-color: white;
  padding: 20px 20px;
}

</style>
