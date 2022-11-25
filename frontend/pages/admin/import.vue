<template>
  <v-card>
    <!--      <v-card-title>Правила загрузки</v-card-title>-->
    <v-card-text>
      <ul>
        <li>Данные берутся из первого листа Excel-файла</li>
        <li>На первом листе первая строка должна быть заголовком колонок: <code>G2R G2 G3 AMD JBOD Adisk Family Type Description
          PN "цена GPL" DescFull Name</code>
        </li>
        <li>Образец excel-файла: <a href="/import.xlsb">import.xlsb</a></li>
      </ul>
      <input type="file" accept=".xlsb" @change="upload" ref="inputFile" hidden>
      <v-btn @click="btnClick">Загрузить XLSB</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "upload",
  data() {
    return {
      components: [],
    }
  },
  methods: {
    btnClick() {
      this.$refs.inputFile.click()

    },
    async upload(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      const stat = await this.$axios.$post('/admin/upload-list', formData)
      this.$refs.inputFile.value = null
      this.$store.commit('setSnackBar', {message: `Загружено шасси: ${stat.chassis}. Загружено компонентов: ${stat.components}.`})

    }
  }
}
</script>

<style scoped>

</style>