<template>
  <section class="contact-info"> <!-- This section wraps all the contact info -->
    <h3><strong>Contact info</strong></h3> <!-- We use bold text for this header -->
    <!-- Self contained article -->
    <article>
      <!-- Bold text as phone -->
      <strong>Phone: </strong>
      <!-- Small icon indicating the phone's country -->
      <img src="https://drive.google.com/uc?export=view&id=1-HHd2bcmlQg_Sl7UOpK9vdKyrJ07ePZM"
           class="small-icon"
           alt="Bolivia flag small icon. It is composed of the colors red, yellow and green">
      <!-- Telephone with link to call this number -->
      <a class="clickable-link" href="tel:+59179783096">+59179783096</a>
    </article>
    <article>
      <!-- Email with link for directly emailing the shown one -->
      <strong>Email: </strong><a class="clickable-link" href="mailto:leodolz14@gmail.com">leodolz14@gmail.com</a>
    </article> <!-- Self-contained email info -->
    <article>
      <!-- Location link to google maps for the town indicated -->
      <strong>Location: </strong><a class="clickable-link" href="https://goo.gl/maps/SKyfaSvgV2LhvcRS6">Cochabamba, Bolivia</a>
    </article> <!-- Self-contained location info -->
  </section>
</template>

<script>
export default {
  name: "ContactInfo"
}
</script>

<style scoped lang="scss">
@import "@/styles/contactInfoStyle.scss";
</style>