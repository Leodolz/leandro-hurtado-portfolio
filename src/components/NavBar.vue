<template>
  <header id="top"> <!-- I use top as id for the footer button to work as planned -->
    <nav> <!-- Consistent navigation at header -->
      <ul>
        <li v-for="item in items" :key="item.message" :class="{active: item.key === activeItem }">
          <a :href="item.linkPage"> {{item.message}} </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    items: Array,
    activeItem: Number,
  }
}
</script>

<style scoped lang="css">


/* This section below is for vertical navigation header */
nav {
  background-color: forestgreen;
  overflow: hidden;
}

/*
    For all the unlisted tag we disable the list type and we put each item to cover
    the entire width of the screen
 */
nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

/*
    For each <li> tag inside <nav> we add a unique style for vertical display and borders
*/
nav li {
  padding: 1.5% 2%;
  border-style: solid;
  border-color: black;
  border-top: black;
  border-left-style: none;
  border-right-style: none;
}


nav li a {
  text-decoration: none;
  display: block;
  color: white;
  text-align: center;
  width: 100%;
  font-size: 1.1em;
}

/* Class for painting different background color, for the active page in navbar */
.active {
  background-color: yellowgreen;
}

/* Change the color of the text of the a tag inside .active to black */
.active a {
  color: black;
}

@media (min-width: 800px) {

  /* The navigation bar here will be horizontal with other style */
  nav li {
    float: left;
    display: inline;
    padding: 14px 16px;
    border-bottom-style: none;
    border-right-style: solid;
  }

  /* As these screens will likely be laptop and other devices with a mouse, we use hoover styling */
  nav li:hover:not(.active) {
    background-color: #2fbd2f;
  }

  /*
      These items in big screen sizes will have a left text align and a width where
      content fits
   */
  nav li a {
    text-align: left;
    width: fit-content;
  }
}

</style>