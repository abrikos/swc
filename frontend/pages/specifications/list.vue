<template>
  <div>
    <h1>
      Спецификации
    </h1>
    <Tabs :items="tabs" :onChange="tabChanged"/>
    <v-data-table
        :items="specsFiltered"
        :headers="headers"
        @click:row="item=>$router.push('/specifications/' + item.id)"
        style="cursor: pointer"
        :footer-props="{
          itemsPerPageOptions: [25,50,100]
        }"
    >
      <template v-slot:header="props">
        <tr>
          <td>
            <v-btn
                icon
                v-if="checkedArray.length"
                color="red"
                dark
                class="ma-2"
                @click="deleteMany"
                title="Удалить выбранные"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
          <td>
            <v-text-field outlined placeholder="Фильтр по дате" v-model="dateSearch" dense hide-details
                          style="margin: 0 5px"/>
          </td>
          <td>
            <v-text-field outlined placeholder="Фильтр по названию" v-model="nameSearch" dense hide-details
                          style="margin: 0 5px"/>
          </td>
          <td/>
          <td/>
          <td v-if="tab.id==='shared'">
            <v-text-field outlined placeholder="Фильтр по e-mail" v-model="emailSearch" dense hide-details/>
          </td>
        </tr>
      </template>
      <template v-slot:item.price="{item}">
        {{item.price.toFixed(2)}}
      </template>
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
      <template v-slot:item.checkIt="{item}">
        <v-checkbox @click.stop.prevent dense hide-details v-model="checked[item.id]" title="Удалить"/>
      </template>
      <template v-slot:item.count="{item}">
        <div style="text-align: center">
          {{ item.configurations.length }}
        </div>
      </template>
      <template v-slot:item.controls="{item}">
        <div @click.stop>
          <SpecClipboardCopy :spec="item"/>
          <a class="v-btn" :href="`/api/spec/${item.id}/excel`" @click.stop title="В Excel">
            <v-icon size="50" color="#aa2238">mdi-microsoft-excel</v-icon>
          </a>
          <v-btn @click="deleteOne(item)" icon color="red" title="Удалить">
            <img src="/icons/delete.png"/>
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
        <div @click.stop.prevent v-if="showNameField !== item.id" @click="showNameField=item.id"
             title="Нажать для редактирования">{{ item.name }}
        </div>
        <v-text-field
            v-model="item.name"
            @click.stop.prevent
            flat dense outlined hide-details append-icon="mdi-check"
            @click:append="renameSpec(item); showNameField=null"
            @keyup.enter="renameSpec(item); showNameField=null"
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

import SpecClipboardCopy from "~/components/SpecClipboardCopy";
export default {
  name: "SpecsList",
  components: {SpecClipboardCopy},
  data() {
    return {
      tabs:[
          {category:'Мои', id:'my'},
          {category:'Общие', id:'shared'},
      ],
      tab:{category:'Мои', id:'my'},
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 4,
        sortBy: 'fat',
        totalItems: 0,
        rowsPerPageItems: [1, 12, 4, 8, 16]
      },
      dateSearch: '',
      nameSearch: '',
      emailSearch: '',
      dialogSpec: null,
      newSpecEdited: false,
      newSpec: '',
      specs: [],
      checked: [],
      showNameField: false,

    }
  },
  created() {
    this.loadSpecs()
  },
  computed: {
    headers(){
      const headers = [
        {text: '', value: 'checkIt', width: '30px'},
        {text: 'Дата', value: 'date', width: '150px'},
        {text: 'Название', value: 'name'},
        {text: 'Сумма', value: 'price', align: 'right'},
        {text: 'Конфигураций', value: 'count', width: '250px', align: 'center'},
      ]
      if(this.tab.id==='shared')
        headers.push({text: 'От кого', value: 'shared.email'},)
      headers.push({text: '', value: 'controls', sortable: false, width: '180px'})
      return headers
    },
    specsFiltered() {
      return this.specs
          .filter(s => this.tab.id==='my' ? !s.shared : s.shared && s.shared.email.match(this.emailSearch.toLowerCase()))
          .filter(s => s.name.toLowerCase().match(this.nameSearch.toLowerCase())
              && s.date.match(this.dateSearch.toLowerCase())
          )
    },
    checkedArray() {
      return Object.keys(this.checked).filter(k => this.checked[k])
    }
  },
  methods: {
    tabChanged(tab){
      this.tab = tab;
      console.log(tab)
    },
    async renameSpec(item) {
      await this.$axios.$put(`/spec/${item.id}/rename`, item)
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

<style scoped lang="sass">
input
  border: 1px solid silver
</style>