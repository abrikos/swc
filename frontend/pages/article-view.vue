<template>
  <div v-if="article">
    <h1>{{article.subject}}</h1>
    <div v-html="article.swkbarticledatum.contents"/>
  </div>
</template>

<script>
export default {
  name: "article-view",
  data(){
    return {
      article: null
    }
  },
  computed: {
    id() {
      return this.$route.params.pathMatch;
    }
  },
  created(){
    this.$axios.$get('/article/view/' + this.id)
        .then(res => {
          this.article = res;
        });
  },

}
</script>

<style scoped>

</style>