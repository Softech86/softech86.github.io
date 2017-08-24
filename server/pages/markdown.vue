<template>
  <section class="container">
    <div>
      <h1 class="title">
        article
      </h1>
      <h2 class="subtitle">
        A Nuxt.js project
      </h2>
      <div class="md-display" v-html="mhtml"></div>

    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import marked from 'marked'
  import {highlightAuto} from 'highlight.js'
  import 'highlight.js/styles/arta.css'

  marked.setOptions({
    highlight: function (code) {
      return highlightAuto(code).value
    }
  })
  export default {
    components: {},
    data () {
      return {
        path: '',
        md: '',
        mhtml: ''
      }
    },
    async created () {
      let path = this.$route.hash.slice(1)
      if (path.startsWith('/')) path = path.slice(1)
      this.md = (await axios(`/markdown/${path}`)).data
      this.path = this.$route.hash
      this.mhtml = marked(this.md)
    },
    mounted () {
    }
  }
</script>

<style>
.container
{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title
{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle
{
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links
{
  padding-top: 15px;
}
.md-display {
  align-items: flex-start;
  text-align: left;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 600px;
  min-height: 400px;
  padding: 20px;
}
</style>
