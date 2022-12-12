<template>
  <!-- Section for contacting -->
  <section class="contact-page">
    <!-- Wrapper for the contact form -->
    <div class="form-container">
      <!-- Contact form loading the country list items and the constants -->
      <ContactForm :country-code-items="countryListItems" :contact-form-names="contactFormConstants"/>
    </div>
  </section>
  <br/>
</template>

<script>
// @ is an alias to /src
// We import constants here
import ContactForm from "@/components/ContactForm";
import contactFormConstants from "@/constants/contactFormConstants";
import countryListItems from "@/constants/countryListItems";

export default {
  // Component name and components we use inside this template
  name: 'ContactMeView',
  components: {
    ContactForm,
  },
  data() {
    // Declare state variables we can access in the component
    return {
      contactFormConstants,
      countryListItems
    }
  },
}
</script>

<style lang="scss" scoped>
/* Import the contact style for this view */
@import "@/styles/contactStyle.scss";
</style>
