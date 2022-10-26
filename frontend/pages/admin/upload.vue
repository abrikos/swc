<template>
  <div>
    <input type="file" accept=".csv" @change="upload" ref="inputFile" hidden>
    <v-btn @click="btnClick">Upload CSV</v-btn>
  </div>
</template>

<script>
export default {
  name: "upload",
  data() {
    return {
      components: [],
    }
  },
  created() {
    this.loadComponents()
  },
  methods: {
    btnClick() {
      this.$refs.inputFile.click()

    },
    async upload(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      await this.$axios.$post('/admin/upload-list', formData)
      this.$refs.inputFile.value = null

    }
  }
}
</script>

<style scoped>

</style>