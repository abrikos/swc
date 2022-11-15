<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="15"
        @click:row="gotoConfig"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
      <template v-slot:item.chassis.partNumber="{item}">
        <div>
          <v-icon color="error" v-if="$validator(item).errors.length" title="Есть ошибки в комплектации">mdi-alert-circle</v-icon>
          {{item.chassis.partNumber}}

        </div>
      </template>
      <template v-slot:item.chassis.descShort="{item}">
        <div>{{item.chassis.descShort}}</div>
      </template>
      <template v-slot:item.price="{item}" >
        <div>{{item.price}}</div>
      </template>
      <template v-slot:item.toSpec="{item}">
        <v-checkbox @click.stop.prevent dense hide-details v-model="checked[item.id]" title="Добавить в спецификацию"/>
      </template>
      <template v-slot:item.nameX="{item}">
        <div @click.stop.prevent v-if="showNameField !== item.id" @click="showNameField=item.id" title="Нажать для редактирования">{{ item.name }}</div>
        <v-text-field
            v-model="item.name"
            @click.stop.prevent
            flat dense outlined hide-details append-icon="mdi-check"
            @click:append="changeField('name', item); showNameField=null"
            @blur="showNameField=null"
            autofocus
            v-if="showNameField===item.id"
            :ref="`nameField-${item.id}`"
        />
      </template>
      <template v-slot:item.count="{ item }">
        <ConfigurationCount @click.stop.prevent :item="item" :onChange="loadConfigurations"/>
      </template>
      <template v-slot:item.controls="{ item }">
        <v-btn @click.stop="deleteConfiguration(item)" icon color="red" x-small title="Удалить">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-slot:footer>
        <v-btn
            v-if="checkedArray.length"
            color="primary"
            dark
            class="ma-2"
            @click="addToSpec">
          Создать новую спецификацию из выбранных
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>

export default {
  name: "ConfigsList",
  props: ['specReload'],
  data() {
    return {
      checked: {},
      showNameField: null,
      countEdited: false,
      items: [],
      headers: [
        {text: '', value: 'toSpec', width: '30px', sortable: false},
        {text: 'Дата', value: 'date', width: '150px'},
        {text: 'Название', value: 'name', width: '300px'},
        {text: 'PartNum', value: 'chassis.partNumber'},
        {text: 'Описание', value: 'chassis.descShort'},
        {text: 'Цена', value: 'price', align: 'right'},
        {text: 'Штук', value: 'count', width: '100px'},
        {text: 'Сумма', value: 'priceTotal', align: 'right'},
        {text: '', value: 'controls', width: '110px'}
      ]
    }

  },
  computed:{
    checkedArray(){
      return Object.keys(this.checked).filter(k=>this.checked[k])
    }
  },
  created() {
    this.loadConfigurations()
  },
  methods: {
    gotoConfig(item){
      this.$router.push('/configurations/'+item.id)
    },
    async addToSpec(){
      //await this.$axios.$put(`/configuration/${this.configuration.id}/to-spec`, this.checkedArray)
      await this.$axios.$put(`/spec/create`, this.checkedArray)
      this.checked = []
      await this.specReload()

    },
    async deleteConfiguration(item) {
      if (window.confirm(`Удалить конфигурацию "${item.name}"?`)) {
        await this.$axios.$delete(`/configuration/${item.id}`)
        await this.loadConfigurations()
        await this.specReload()
      }
    },
    async changeField(field, item) {
      await this.$axios.$put(`/configuration/${item.id}/field/${field}`, item)
      await this.loadConfigurations()

    },
    async loadConfigurations() {
      this.items = await this.$axios.$get('/configuration/my')
      await this.specReload()
    }
  }
}
</script>

<style scoped lang="sass">
.v-data-table
  :deep(.error1)
    color: red
  :deep(td)
    cursor: pointer
  :deep(.text-start)
    padding: 0
  :deep(.v-input)
    margin: 0
    ::-webkit-inner-spin-button
      display: none
</style>