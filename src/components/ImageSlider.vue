<template>
  <!-- We use transition-group as a base from our image carousel. With CSS we can make a good implementation -->
  <!-- We add a callback before a current item leaves and we add a name depending on the direction it will go -->
  <transition-group tag="div" class="slide-group"
                    :name="transitionName"
                    @before-leave="sgBeforeLeave">
    <!-- We use an inner container for having a nice presentation with padding and margins -->
    <div :key="current" class="slide">
      <!-- This is a row icon drew using polyline and wrapped by svg. It acts as a left navigation button
      this is why the function called when clicked, gives a negative direction -->
      <svg viewBox="0 0 13 20" id="previous-arrow" class="nav" @click="move(-1)">
        <polyline points="10,3 3,10 10,17"></polyline>
      </svg>

      <!-- Right arrow drew in the same way as above with a positive direction when clicked -->
      <svg viewBox="0 0 13 20" id="next-arrow" class="nav nav--next" @click="move(1)">
        <polyline points="10,3 3,10 10,17" transform="rotate(180 6.5,10)"></polyline>
      </svg>
      <!-- Two images but using v-if which will select one or the other depending on the current slide's isEarlier
       attribute. -->
      <!-- As this first image represents the earlierImage it has a mouseOut event and renders the earlierImage from
      the slide -->
      <img v-if="slides[current].isEarlier" :src="slides[current].earlierImage" @mouseout="mouseOut()"
           :alt="slides[current].earlierImageAlt" @click="imgClick(1)" class="hovered"/>
      <!-- As this second image with v-else represents the currentImage, it has a mouseOver event and renders the
       current image from the slide. This is to fulfill the requirement of hovering and showing an early image and
       show the present image when not hovering -->
      <img v-else :src="slides[current].image" :alt="slides[current].imageAlt"
           @click="imgClick(1)" @mouseenter="mouseOver()"/>
      <!-- Description section which will contain the description of the early image, it is also rendered conditionally
      and share the same title as it is a before/after comparison -->
      <section v-if="slides[current].isEarlier" id="early-description">
        <h3>{{ slides[current].title }}: Before</h3>
        <p v-for="paragraph in slides[current].earlierContent.split('\n')" :key="paragraph">{{ paragraph }}</p>
      </section>
      <!-- Description section that contains the current image using v-else as it is conditional of the isEarlier
       attribute from the current slide -->
      <section v-else id="current-description">
        <h3>{{ slides[current].title }}: Currently</h3>
        <p v-for="paragraph in slides[current].content.split('\n')" :key="paragraph">{{ paragraph }}</p>
      </section>
    </div>
  </transition-group>
  <!-- Import of settings surrounding it with a container for better visibility -->
  <section id="settings">
    <!-- Notice how we implement the emitted callback announced inside this component which is onSelected -->
    <ImageSettings @onSelected="selectionClick"/>
  </section>
  <br/>
  <!-- This section is done only for preloading all images and have smoother transitions-->
  <section id="preloader">
    <img v-for="slide in slides" :src="slide.image" :key="slide.id"/>
  </section>
</template>
<script type="module">
import ImageSettings from "@/components/ImageSettings.vue";
import galleryConstants from "@/constants/galleryConstants";

export default {
  // Define the name of the component
  name: 'ImageSlider',
  // Declared the components used here
  components: {
    ImageSettings,
  },
  // Declare the methods for usage in this component
  methods: {
    // Method when the mouse is hovering the image and show the earlier image
    mouseOver: function () {
      // If the option of hovering is on, it shows the earlier image when hovered
      if (this.byHoover) {
        this.slides[this.current].isEarlier = true;
      }
    },
    // Method when the mouse is done hovering the image, it should stop displaying the early image
    mouseOut: function () {
      // If the hover option is on, stop displaying early image
      if (this.byHoover) {
        this.slides[this.current].isEarlier = false;
      }
    },
    // Method for interpreting the option selected for hovering or click feature
    selectionClick: function (selection) {
      this.byHoover = this.selectionMap[selection];
    },
    // Method for toggling the slide's early image showing
    toggleSlide: function () {
      this.slides[this.current].isEarlier = !this.slides[this.current].isEarlier;
    },
    // Method when the image is clicked, it has different behavior depending on the hovering feature
    imgClick: function (direction) {
      if (!this.byHoover) {
        this.toggleSlide();
      } else {
        this.move(direction);
      }
    },
    move(direction) {
      this.direction = direction;
      // Move forward or backwards according to direction, if we go before the first slide, we translate it to the last
      // row for having a looped gallery
      if (this.current + direction < 0) {
        this.current = this.slides.length - 1;
      } else {
        // If we are heading upwards, we simply use modulo operator if we appear to go further than the limit
        this.current = (this.current + direction) % this.slides.length;
      }
    },

    // As an element from this group will leave, the width and height are modified to a consistent smaller, so it doesn't
    // hover by accident and have a smooth transitioning
    sgBeforeLeave(element) {
      let rect = element.getBoundingClientRect();
      element.style.width = (rect.right - rect.left) + 'px';
      element.style.height = (rect.bottom - rect.top) + 'px';
    }
  },

  // Define the name of the transition if it will go right or left, for css styling
  computed: {
    transitionName() {
      return 'sg-' +
          (this.direction > 0 ? 'right' : 'left');
    }
  },
  // Define data available to access and/or modify in our component
  data() {
    return {
      // Direction is 0 when starting the program, it will change if it goes right or left
      direction: 0,
      // This indicates the index of the currently presented image, we point to the first image by default
      current: 0,
      // Map for interpreting the selection from the settings component, it will indicate if hover feature is on or off
      selectionMap: {
        hover: true,
        click: false,
      },
      // Boolean variable that defines if hovering feature is on or off
      byHoover: true,
      // Slides array for display in carousel
      slides: galleryConstants.slides
    }
  },
};
</script>

<style lang="scss" scoped>
/* Importing style from another file for a more organized way of styling this component */
@import '@/styles/imageSliderStyle.scss';
</style>