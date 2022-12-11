<template>
  <section class="contact-info"> <!-- This section should be stylized later on -->
    <h3><strong>Contact info</strong></h3> <!-- I use bold text for this header -->
    <article>
      <strong>Phone: </strong>
      <img src="https://drive.google.com/uc?export=view&id=1-HHd2bcmlQg_Sl7UOpK9vdKyrJ07ePZM"
           class="small-icon"
           alt="Bolivia flag small icon. It is composed of the colors red, yellow and green">
      <a href="tel:+59179783096">+59179783096</a>
    </article> <!-- Self-contained phone info, may style it uniquely -->
    <article>
      <strong>Email: </strong><a href="mailto:leodolz14@gmail.com">leodolz14@gmail.com</a>
    </article> <!-- Self-contained email info, may style it uniquely -->
    <article>
      <strong>Location: </strong><a href="https://goo.gl/maps/SKyfaSvgV2LhvcRS6">Cochabamba, Bolivia</a>
    </article> <!-- Self-contained email info, may style it uniquely -->
  </section>
</template>

<script>
export default {
  name: "ContactInfo"
}
</script>

<style scoped>


/* Relative width for mall icons */
.small-icon {
  width: 1em;
}

article {
  margin-left: 20%;
  margin-bottom: 1em;
  float: left;
}

a:active, a:hover {
  color: green;
}

a:link {
  color: white;
  text-decoration: none;
}

.contact-info{
  margin: 1em 1em;
}

.contact-info {
  padding-bottom: 1em;
}
</style>