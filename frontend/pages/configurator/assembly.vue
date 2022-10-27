<template>
  <div v-if="assembly">
    <h1>{{ assembly.name || assembly.chassis.partNumber }} <small>{{ assembly.chassis.descShort }}</small></h1>
    <v-row>
      <v-col sm="7">
        <Tabs :withIcons="true" :items="tabs" :onClick="tabChanged"/>
        <Tabs :items="chosenTab.children" :onClick="subTabChanged" v-if="chosenTab.children"/>
        <v-data-table
            :headers="headers"
            :items="componentsFiltered"
            :items-per-page="15"
            class="row-pointer"
            style="cursor: pointer"
            :item-class="itemRowBackground"
        >
          <template v-slot:no-data>
            Ни чего не найдено
          </template>
          <template v-slot:item.count="{item}">
            <v-select :items="[0, 1,2,3,4,5]" @change="e=>addPart(e, item)" dense flat :value="calcCount(item)"
                      hide-details/>
          </template>
          <template v-slot:header.description>
            <v-text-field hide-details label="Фильтр описания" flat dense class="table-filter" v-model="filter"
                          @keyup="filterComponents"></v-text-field>
          </template>
        </v-data-table>
      </v-col>
      <v-col sm="5">
        <v-text-field
            v-model="assembly.name"
            outlined
            :append-icon="nameChanged? 'mdi-check' : ''"
            @keyup="nameChanged = true"
            @click:append="changeField('name', assembly); nameChanged = false"
        />
        <Basket :assembly="assembly" :reload="loadAssembly"/>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import Tabs from "~/components/Tabs";
import Basket from "~/components/Basket";

export default {
  name: "configurator-parts",
  components: {Basket, Tabs},
  data() {
    return {
      nameChanged: false,
      filter: '',
      count: 0,
      tab: 0,
      subTab: null,
      isHovering: false,
      components: [],
      componentsFiltered: [],
      assembly: null,
      headers: [
        {text: 'Партномер', value: 'partNumber', width: '20%'},
        {text: 'Описание', value: 'description', width: '50%', sortable: false},
        {text: 'Цена', value: 'price', width: '20%'},
        {text: '', value: 'count', width: '10%', sortable: false}
      ],
      tabs: []
    }
  },
  computed: {
    id() {
      return this.$route.params.pathMatch;
    },
    chosenTab() {
      return this.tabs[this.tab] || {}
    },
    chosenSubTab() {
      return this.chosenTab.children && this.chosenTab.children[this.subTab]
    }
  },
  created() {
    this.loadAssembly()
  },
  methods: {
    filterComponents() {
      this.componentsFiltered = this.components.filter(c => c.description.toLowerCase().match(this.filter.toLowerCase()))
    },
    async changeField(field, item) {
      await this.$axios.$put(`/assembly/${item.id}/field/${field}`, item)
    },
    calcCount(item) {
      const part = this.assembly.parts.find(p => p.component.id === item.id)
      return part ? part.count : 0
    },
    itemRowBackground(item) {
      return this.assembly.parts.map(p => p.component.id).includes(item.id) ? 'inBasket' : ''
    },
    async loadComponents() {
      this.components = this.componentsFiltered = await this.$axios.$get(`/assembly/${this.id}/component-type/${this.chosenSubTab?.type || this.chosenTab.type}`)
      //componentsAll.filter(c=> this.subTab ? c.type === this.subTab : c.type === this.tab)
    },
    tabChanged(index) {
      this.filter = ''
      this.tab = index;
      this.subTab = 0;
      this.loadComponents()
    },
    subTabChanged(index) {
      this.filter = ''
      this.subTab = index
      this.loadComponents()
    },

    async loadAssembly() {
      this.assembly = await this.$axios.$get('/assembly/' + this.id);
      this.tabs = !['JBOD'].includes(this.assembly.chassis.platform) ?[
        //{id: 'base', label: 'Основа'},
        {type: 'CPU'},
        {type: 'Memory',},
        {
          type: 'Storage',
          children: [
            {type: 'RAID'},
            {type: 'HDD'},
            {type: 'SSD 2.5'},
            {type: 'SSD m.2'},
            {type: 'SSD U.2 NVMe'},
            {type: 'Rear bay'},
          ]
        },
        {type: 'Riser',},
        {
          type: 'PCI-E',
          children: [
            {type: 'LAN OCP 3.0'},
            {type: 'LAN'},
            {type: 'FC'},
            {type: 'GPU'},
            {type: 'Transceiver'},
          ]
        },
        {type: 'Power'},
      ]:[{type: 'Cable'}]
      this.loadComponents()
    },
    async addPart(count, item) {
      await this.$axios.$put(`/assembly/${this.id}/part/${item.id}`, {count})
      await this.loadAssembly()
      this.count = 0
    }
  }
}
</script>

<style scoped lang="sass">
.v-data-table
  ::v-deep .inBasket
    td
      background-color: silver

  ::v-deep .table-filter
    label
      font-size: .8em

.count-select
  .v-select
    height: 200px
    display: none
    border: none

</style>
