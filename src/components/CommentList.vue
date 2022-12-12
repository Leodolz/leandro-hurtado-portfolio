<template>
  <!-- Conditionally render comment list if there are comments -->
  <div id="commentListContainer" v-if="commentItems.length > 0">
    <!-- Section for each comment, this is why we use v-for and using comments as props -->
    <section v-for="comment in commentItems" :key="comment.content">
      <!-- Title for each section which shows the name and last name of the comment -->
      <p><strong>Comment from: </strong>{{ comment.firstName }} {{ comment.lastName }}</p>
      <!-- Show the comment pre formatted as was saved in backend -->
      <pre>{{ comment.comment }}</pre>
    </section>
  </div>
  <!-- If no comments are given, show this other label -->
  <p v-else>No comments to show</p>
</template>

<script>
export default {
  // Component name and items to be used
  name: "CommentList",
  props: {
    commentItems: Array
  }
}
</script>

<style scoped>
/* Scoped style for each section from these comments, should be centered with padding and have a max width */
section {
  padding: 10px 10px;
  border-radius: 20px;
  border: black solid;
  margin: 1em auto;
  width: 85%;
  max-width: 900px;
}

/* Scoped style for the pre elements in this component, should wrap when the text is larger than the screen width */
pre {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

</style>