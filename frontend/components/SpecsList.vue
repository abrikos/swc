<template>
  <div>
    <v-data-table
        :items="specs"
        :headers="headers"
        :items-per-page="5"
        @click:row="item=>$router.push('/specifications/' + item.id)"
        style="cursor: pointer"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
      <template v-slot:item.count="{item}">
        {{ item.configurations.length }}
      </template>
      <template v-slot:item.controls="{item}">
        <div @click.stop>
          <v-btn icon title="В буфер" @click="copyInCP(item)"><v-icon>mdi-clipboard-text-multiple-outline</v-icon></v-btn>
          <a class="v-btn" :href="`/api/spec/${item.id}/excel`" @click.stop title="В Excel"><v-icon>mdi-microsoft-excel</v-icon></a>
          <v-btn @click="deleteSpec(item)" x-small icon color="red" title="Удалить">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>

export default {
  name: "SpecsList",
  data() {
    return {
      dialogSpec: null,
      newSpecEdited: false,
      newSpec: '',
      specs: [],
      headers: [
        {text: 'Дата', value: 'date', width: '150px'},
        {text: 'Название', value: 'name'},
        {text: 'Сумма', value: 'price'},
        {text: 'Кол-во конфигураций', value: 'count', width: '250px', align: 'right'},
        {text: '', value: 'controls', sortable: false}
      ],
    }
  },
  created() {
    this.loadSpecs()
  },
  methods: {
    copyInCP(spec){
      const textArea = document.createElement("textarea");
      spec.configurations.forEach(conf=>{
        textArea.value += conf.chassis.partNumber + '\t'
            + conf.count + '\t'
            + conf.chassis.params + '\t'
            + conf.price + '\t'
            + conf.priceTotal
            + '\n';
      })
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }
      document.body.removeChild(textArea);
    },
    dialogClose() {
      this.loadSpecs()
      this.dialogSpec = null
    },
    dialogShow(item) {
      this.dialogSpec = item
    },
    async loadSpecs() {
      this.specs = await this.$axios.$get('/specs')
    },
    async deleteSpec(item) {
      if (window.confirm(`Удалить спецификацию "${item.name}"?`)) {
        await this.$axios.$delete('/spec/' + item.id)
        await this.loadSpecs()
      }
    }
  }
}
</script>

<style scoped>

</style>