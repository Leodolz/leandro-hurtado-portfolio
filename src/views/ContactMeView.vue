<template>
  <section class="contact-page">
    <div class="form-container">
      <ContactForm :country-code-items="countryListItems" :contact-form-names="contactFormConstants"/>
    </div>
  </section>
  <br/>
</template>

<script>
// @ is an alias to /src
import ContactForm from "@/components/ContactForm";
import contactFormConstants from "@/constants/contactFormConstants";
import countryListItems from "@/constants/countryListItems";

export default {
  name: 'BackgroundView',
  components: {
    ContactForm,
  },
  data() {
    return {
      contactFormConstants,
      countryListItems
    }
  },
  async mounted() {
    let academicRecords = await this.getHistoryItems();
    if (academicRecords !== null && academicRecords.length > 0) {
      this.academicHistoryItems = academicRecords;
    }
  },
  methods: {
    getHistoryItems: async () => {
      const response = await fetch("https://leandro-hurtado-portfolio-api.glitch.me/academicRecords");
      if (response.ok) {
        return response.json();
      }
      return null;
    },
  }
}
</script>

<style>
/* Class for the containers for any selection-type input */
.contact-page {
  display: flex;
  align-items: center;
  margin: 2em auto;
  justify-content: center;
  border-radius: 5px;
  padding: 20px;
  background: linear-gradient(90deg, #BE8CEF 0%, rgba(61, 46, 232, 0.83) 100%);
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  font-size:15px;
  max-width: 1200px;
}


.form-container {
  display: flex;
  max-width: 768px;
}

h2 {
  margin-right: auto;
  margin-left: auto;
}
</style>
