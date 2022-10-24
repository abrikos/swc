<template>
  <div>
    <input type="file" accept=".csv" @change="upload" ref="inputFile" hidden>
    <v-btn @click="btnClick">Upload CSV</v-btn>
<!--    <v-data-table
        :headers="headers"
        :items="components"
        :items-per-page="15"
        class="row-pointer"
        style="cursor: pointer"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>

    </v-data-table>-->
  </div>
</template>

<script>
export default {
  name: "upload",
  data() {
    return {
      components: [],
      headers: [
        {text: 'Type', value: 'type'},
        {text: 'description', value: 'description'},
        {text: 'Date', value: 'date'},
        {text: 'platforms', value: 'platforms'},
      ]
    }
  },
  created() {
    this.loadComponents()
  },
  methods: {
    async loadComponents(){
      this.components = await  this.$axios.$get('/components/all')
    },
    btnClick() {
      this.$refs.inputFile.click()

    },
    async upload(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      await this.$axios.$post('/admin/upload-list', formData)
      this.$refs.inputFile.value = null
      this.loadComponents()
    }
  }
}
</script>

<style scoped>

</style>