<template>
  <h2>Please feel free to leave a comment below!</h2>
  <form @submit="submitComment">
    <label>
      <strong class="required-label">Email: </strong>
      <!-- It is important to have its id and name as firstName for submission and validation, notice that
           the "required" attribute is given for avoiding null inputs
      -->
      <input :id="contactFormConstants.emailInputLabel" type="email" :name="contactFormConstants.emailInputLabel"
             placeholder="Enter email" required/>
    </label>
    <!-- Label of the error that will be displayed right after the firstName input. It has the className for
    non-displayed -->
    <label :id="contactFormConstants.emailInputLabel + `ErrorLabel`" class="non-displayed"></label>
    <!-- Line break -->
    <br/>
    <!-- Label and input for the first name given -->
    <label>
      <strong class="required-label">First Name: </strong>
      <!-- It is important to have its id and name as firstName for submission and validation, notice that
           the "required" attribute is given for avoiding null inputs
      -->
      <input :id="contactFormConstants.firstNameInputLabel" type="text" :name="contactFormConstants.firstNameInputLabel"
             placeholder="Enter first name" required/>
    </label>
    <!-- Label of the error that will be displayed right after the firstName input. It has the className for
    non-displayed -->
    <label :id="contactFormConstants.firstNameInputLabel+ `ErrorLabel`" class="non-displayed"></label>
    <!-- Line break -->
    <br/>
    <!-- Label and input for the first name given -->
    <label>
      <strong class="required-label">Last Name: </strong>
      <!-- It is important to have its id and name as firstName for submission and validation, notice that
           the "required" attribute is given for avoiding null inputs
      -->
      <input :id="contactFormConstants.lastNameInputLabel" type="text" :name="contactFormConstants.lastNameInputLabel"
             placeholder="Enter last name" required/>
    </label>
    <!-- Label of the error that will be displayed right after the firstName input. It has the className for
    non-displayed -->
    <label :id="contactFormConstants.lastNameInputLabel + `ErrorLabel`" class="non-displayed"></label>
    <!-- Line break -->
    <br/>
    <!-- Label and input for the first name given -->
    <label>
      <strong class="required-label">Comment: </strong>
      <!-- It is important to have its id and name as firstName for submission and validation, notice that
           the "required" attribute is given for avoiding null inputs
      -->
      <textarea :id="contactFormConstants.messageInputLabel" :name="contactFormConstants.messageInputLabel"
             placeholder="Enter comment" required/>
    </label>
    <label :id="contactFormConstants.messageInputLabel + `ErrorLabel`"></label>
    <!-- Label of the error that will be displayed right after the firstName input. It has the className for
    non-displayed -->
    <br/>
    <p v-if="submitted" class="contact-success">Success! Thank you for leaving a comment</p>
    <button v-else id="submitContactButton"><p>Submit Comment</p></button>
  </form>
  <br/>
  <h2>What other visitors commented</h2>
  <CommentList :comment-items="commentItems" />
  <br/>
</template>

<script>

import contactFormConstants from "@/constants/contactFormConstants";
import CommentList from "@/components/CommentList";
import errorHelper from "@/helpers/errorHelper";
import stringValidators from "@/validators/stringValidators";
import backendConstants from "@/constants/backendConstants";

export default {
  name: 'CommentsView',
  components: {CommentList},
  data() {
    return {
      contactFormConstants,
      commentItems: [],
      labelIds: [
        contactFormConstants.firstNameInputLabel,
        contactFormConstants.lastNameInputLabel,
        contactFormConstants.emailInputLabel,
        contactFormConstants.messageInputLabel,
      ],
      submitted: false,
    }
  },
  async mounted() {
    await this.loadComments();
  },
  methods: {
    loadComments: async function() {
      let comments = await this.getComments();
      if(comments !== null && comments.length > 0) {
        this.commentItems = comments;
      }
    },
    getComments: async () => {
      const response = await fetch(backendConstants.domainUrl + "/comments");
      if(response.ok) {
        return response.json();
      }
      return null;
    },
    buildCommentBody: function() {
      return {
        email: document.getElementById(contactFormConstants.emailInputLabel).value,
        firstName: document.getElementById(contactFormConstants.firstNameInputLabel).value,
        lastName: document.getElementById(contactFormConstants.lastNameInputLabel).value,
        comment: document.getElementById(contactFormConstants.messageInputLabel).value,
      }
    },
    validateInfo: function() {
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
      if (stringValidators.validateEmail(document.getElementById(contactFormConstants.emailInputLabel).value) === false) {
        return false;
      }
      if (stringValidators.validateFieldsLengths([
        {targetSize: 300, fieldId: contactFormConstants.messageInputLabel, fieldName: "comment"},
      ]) === false) {
        return false;
      }

      return true;
    },
    submitComment: async function(e) {
      e.preventDefault();
      errorHelper.resetDOMErrors(this.labelIds.map((item) => item + "ErrorLabel"));
      if(!this.validateInfo()) {
        return;
      }
      const response = await fetch(backendConstants.domainUrl+'/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: "follow",
        body: JSON.stringify(this.buildCommentBody())
      });
      if(response.ok) {
        const jsonResponse = await response.json();
        if(jsonResponse.success) {
          if(jsonResponse.frequent === true) {
            alert("Looks like you already posted a comment, we just updated your previous comment!\n" +
                "All emails are allowed to comment only once, later comments will update the original one");
          }
          alert("Thank you for uploading a comment!");
          this.submitted = true;
          await this.loadComments();
        } else {
          alert(jsonResponse.errorMessage);
        }
      }
    },
  }
}
</script>

<style scoped>
input, textarea {
  box-sizing: border-box;
  margin: 0;
}
h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
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

textarea {
  height: 100px;
}

form {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  max-width: 500px;
  background-color: white;
  padding: 20px 20px;
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

form p {
  text-align: left;
  justify-content: left;
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

/* Style the elements of class non displayed where we don't want them to be rendered */
.non-displayed {
  display: none;
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
