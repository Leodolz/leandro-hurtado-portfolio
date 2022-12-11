<template>
  <section v-for="comment in commentItems" :key="comment.content">
    <p><strong>Comment from: </strong>{{comment.firstName}} {{comment.lastName}}</p>
    <pre>{{comment.comment}}</pre>
  </section>
</template>

<script>
export default {
  name: "CommentList",
  props: {
    commentItems: Array
  }
}
</script>

<style scoped>

section {
  padding: 10px 10px;
  border-radius: 20px;
  border: black solid;
  margin: 1em auto;
  width: 85%;
  max-width: 900px;
}
pre {
  white-space: pre-wrap;       /* Since CSS 2.1 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
}

</style>