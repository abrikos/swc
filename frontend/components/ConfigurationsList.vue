<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="15"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
      <template v-slot:item.chassis.partNumber="{item}">
        <div @click="gotoConfig(item)" style="cursor: pointer">{{item.chassis.partNumber}}</div>
      </template>
      <template v-slot:item.chassis.descShort="{item}">
        <div @click="gotoConfig(item)" style="cursor: pointer">{{item.chassis.descShort}}</div>
      </template>
      <template v-slot:item.price="{item}">
        <div @click="gotoConfig(item)" style="cursor: pointer">{{item.price}}</div>
      </template>
      <template v-slot:item.toSpec="{item}">
        <v-checkbox dense hide-details v-model="checked[item.id]" title="Добавить в спецификацию"/>
      </template>
      <template v-slot:item.name="{item}">

        <div v-if="showNameField !== item.id" @click="showNameField=item.id"><v-icon
            title="click me">mdi-gesture-tap</v-icon>{{ item.name }}</div>
        <v-text-field
            v-model="item.name"
            flat dense outlined hide-details append-icon="mdi-check"
            @click:append="changeField('name', item); showNameField=null"
            @blur="showNameField=null"
            autofocus
            v-if="showNameField===item.id"
            :ref="`nameField-${item.id}`"
        />
      </template>
      <template v-slot:item.count="{ item }">
        <v-text-field
            v-model="item.count" flat dense hide-details type="number"
            :append-icon="countEdited === item.id ? 'mdi-check' : ''"
            :outlined="countEdited === item.id"
            @change="countEdited=item.id"
            @keyup="countEdited=item.id"
            @mousedown="countEdited=item.id"
            @keyup.esc="$refs['count'+item.id].blur()"
            @blur="countEdited=false"
            :ref="'count'+item.id"
            @click:append="changeField('count', item); countEdited = false"
        />
      </template>
      <template v-slot:item.controls="{ item }">
<!--        <v-btn icon title="Добавить в спецификацию" @click="dialogShow(item)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>-->

        <v-btn @click="deleteConfiguration(item)" icon color="red" x-small title="Удалить">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <template v-slot:footer>
        <v-btn
            v-if="checkedArray.length"
            color="primary"
            dark
            class="ma-2"
            @click="addToSpec">
          Создать спецификацию {{checkedArray.length}}
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
        {text: 'Штук', value: 'count', width: '100px'},
        {text: 'Сумма', value: 'price', align: 'right'},
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
    this.loadAssemblies()
  },
  methods: {
    gotoConfig(item){
      this.$router.push('/configurations/'+item.id)
    },
    async addToSpec(){
      //await this.$axios.$put(`/configuration/${this.configuration.id}/to-spec`, this.checkedArray)
      await this.$axios.$put(`/spec/configurations/add`, this.checkedArray)
      await this.specReload()

    },
    async deleteConfiguration(item) {
      if (window.confirm(`Удалить сборку "${item.name}"?`)) {
        await this.$axios.$delete(`/configuration/${item.id}`)
        await this.loadAssemblies()
        await this.specReload()
      }
    },
    async changeField(field, item) {
      await this.$axios.$put(`/configuration/${item.id}/field/${field}`, item)
      await this.loadAssemblies()
      await this.specReload()
    },
    async loadAssemblies() {
      this.items = await this.$axios.$get('/configuration/my')
    }
  }
}
</script>

<style scoped lang="sass">
.v-data-table
  :deep(.text-start)
    padding: 0
  :deep(.v-input)
    margin: 0
    ::-webkit-inner-spin-button
      display: none
</style>