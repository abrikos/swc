<template>
  <div>
    <h1>Загрузка базы</h1>

    <v-card>
      <v-card-title>Правила загрузки</v-card-title>
      <v-card-text>
        <ul>
          <li>Принимаются файлы только в формате CSV</li>
          <li>Для создания CSV из excel-файла необходимо:
            <ul>
              <li>зайти в меню "Файл" - "Сохранить как..."</li>
              <li>в открывшемся диалоге выбрать в типе файлов "Текст CSV"</li>
              <li>нажать "Сохранить"</li>
              <li>в открывшемся диалоге установить
                <ul>
                  <li>Разделитель полей - , (запятая)</li>
                  <li>Разделитель строк - " (кавычка)</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>Данные берутся из первого листа Excel-файла</li>
          <li>На первом листе первая строка должна быть заголовком колонок: <code>G2R	G2	G3	AMD	JBOD	Family	Type	DescShort	PN	цена GPL 	DescFull	Столбец2</code>
          </li>
          <li>Образец excel-файла: <a href="/LoC.xlsb">Loc.xlsb</a></li>
        </ul>
        <input type="file" accept=".csv" @change="upload" ref="inputFile" hidden>
        <v-btn @click="btnClick">Загрузить CSV</v-btn>
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