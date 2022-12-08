<template>
  <div>
    <v-card>
      <v-card-title>Правила загрузки номенклатуры</v-card-title>
      <v-card-text>
        <ul>
          <li>Данные берутся из первого листа Excel-файла</li>
          <li>На первом листе первая строка должна быть заголовком колонок: <code>G2R G2 G3 AMD JBOD Adisk Family Type
            Description
            PN "цена GPL" DescFull Name</code>
          </li>
          <li>Образец Excel-файла: <a href="/import.xlsb">import.xlsb</a></li>
        </ul>
        <input type="file" accept=".xlsb" @change="upload" ref="components" hidden data-action="components">
        <v-btn @click="btnClick('components')" color="primary">Загрузить номенклатуру из XLSB</v-btn>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Правила загрузки сервисов</v-card-title>
      <v-card-text>
        <ul>
          <li>Данные берутся из первого листа Excel-файла</li>
          <li>Образец Excel-файла: <a href="/service.xlsb">service.xlsb</a></li>
        </ul>
        <input type="file" accept=".xlsb" @change="upload" ref="services" hidden data-action="services">
        <v-btn @click="btnClick('services')" color="primary">Загрузить сервисы из XLSB</v-btn>
      </v-card-text>
    </v-card>
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
  methods: {
    btnClick(type) {
      this.$refs[type].click()

    },
    async upload(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      const {action} = e.target.dataset
      const stat = await this.$axios.$post('/admin/upload-' + action, formData)
      this.$refs[action].value = null
      if(action === 'components') {
        this.$store.commit('setSnackBar', {message: `Загружено шасси: ${stat.chassis}. Загружено компонентов: ${stat.components}.`})
      }else{
        this.$store.commit('setSnackBar', {message: `Загружено сервисов: ${stat.services}.`})
      }

    }
  }
}
</script>

<style scoped>

</style>