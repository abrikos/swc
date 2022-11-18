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
      <template v-slot:item.checkIt="{item}">
        <v-checkbox @click.stop.prevent dense hide-details v-model="checked[item.id]" title="Удалить"/>
      </template>
      <template v-slot:item.count="{item}">
        {{ item.configurations.length }}
      </template>
      <template v-slot:item.controls="{item}">
        <div @click.stop>
          <v-btn icon title="В буфер" @click="copyClipBoard(item)" height="50"  color="primary">
            <v-icon size="50">mdi-clipboard-text-multiple-outline</v-icon>
          </v-btn>
          &nbsp; &nbsp;
          <a class="v-btn" :href="`/api/spec/${item.id}/excel`" @click.stop title="В Excel">
            <v-icon size="50"  color="primary">mdi-microsoft-excel</v-icon>
          </a>
          <v-btn @click="deleteOne(item)" icon color="red" title="Удалить">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
      <template v-slot:footer>
        <v-btn
            v-if="checkedArray.length"
            color="red"
            dark
            class="ma-2"
            @click="deleteMany">
          Удалить выбранные
        </v-btn>
      </template>
      <template v-slot:item.name="{item}">
        <div @click.stop.prevent v-if="showNameField !== item.id" @click="showNameField=item.id" title="Нажать для редактирования">{{ item.name }}</div>
        <v-text-field
            v-model="item.name"
            @click.stop.prevent
            flat dense outlined hide-details append-icon="mdi-check"
            @click:append="renameSpec(item); showNameField=null"
            @blur="showNameField=null"
            autofocus
            v-if="showNameField===item.id"
            :ref="`nameField-${item.id}`"
        />
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
      checked: [],
      showNameField: false,
      headers: [
        {text: '', value: 'checkIt', width: '30px'},
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
  computed: {
    checkedArray() {
      return Object.keys(this.checked).filter(k => this.checked[k])
    }
  },
  methods: {
    async renameSpec(item){
      await this.$axios.$put(`/spec/${item.id}/rename`, item)
    },
    copyClipBoard(spec) {
      const textArea = document.createElement("textarea");
      spec.configurations.forEach(conf => {
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
    async deleteOne(item) {
      if (window.confirm(`Удалить спецификацию "${item.name}"?`)) {
        await this.$axios.$post('/spec/delete', [item.id])
        await this.loadSpecs()
      }
    },
    async deleteMany() {
      if (window.confirm(`Удалить выбранные спецификации?`)) {
        await this.$axios.$post('/spec/delete', this.checkedArray)
        this.checked = []
        await this.loadSpecs()
      }
    }
  }
}
</script>

<style scoped>

</style>