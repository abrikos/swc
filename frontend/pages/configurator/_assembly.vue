<template>
  <div v-if="assembly">
    <h1>{{ assembly.name || assembly.chassis.partNumber }} <small>{{ assembly.chassis.descShort }}</small></h1>
    <v-row>
      <v-col sm="7">
        <Tabs :withIcons="true" :items="tabs" :onClick="tabChanged"/>
        <Tabs :items="chosenTab.children" :onClick="subTabChanged"
              :style="`display: ${chosenTab.children ? 'flex': 'none'}`" ref="subTabs"/>
        <v-data-table
            :headers="headers"
            :items="componentsCurrentFiltered"
            :items-per-page="15"
            class="row-pointer"
            style="cursor: pointer"
            :item-class="itemRowBackground"
        >
          <template v-slot:no-data>
            Ни чего не найдено
          </template>
          <template v-slot:item.count="{item}">
            <v-select :items="countsArray" @change="e=>addPart(e, item)" dense flat
                      :value="calcCount(item)"
                      hide-details/>
          </template>
          <template v-slot:header.description>
            <v-text-field hide-details label="Фильтр описания" outlined flat dense class="table-filter" v-model="filter"
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
      countsArray: [0,1,2],
      tab: 0,
      maxCount: 64,
      subTab: null,
      isHovering: false,
      componentsAll: [],
      componentsCurrent: [],
      componentsCurrentFiltered: [],
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
      return this.$route.params.assembly;
    },
    chosenTab() {
      const tab = this.tabs[this.tab] || {}
      if (tab.type === 'CPU') {
        this.countsArray = [0,1,2]
      } else if (tab.type === 'Memory') {
        if (['G2', 'G2R'].includes(this.assembly.chassis.platform)) {
          this.countsArray = this.assembly.parts.filter(p=>p.component.category === 'CPU').length === 1 ? [0,2,4,6,8,10,12] : [0,2,4,6,8,10,12,14,16,18,20,22,24]
        } else if (this.assembly.chassis.platform === 'G3') {
          this.countsArray = this.assembly.parts.filter(p=>p.component.category === 'CPU').length === 1 ? [0,2,4,6,8,10,12,14,16] : [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32]
        }

      }
      return tab;
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
      this.componentsCurrentFiltered = this.componentsCurrent.filter(c => c.description.toLowerCase().match(this.filter.toLowerCase()))
    },
    async changeField(field, item) {
      await this.$axios.$put(`/assembly/${item.id}/field/${field}`, item)
    },
    calcCount(item) {
      const part = this.assembly.parts.find(p => p.component.id === item.id)
      return part ? part.count : 0
    },
    itemRowBackground(item) {
      if (['CPU', 'Memory'].includes( this.chosenTab.type)) {
        return this.assembly.parts.filter(p=>p.component.category === this.chosenTab.type).length ? this.assembly.parts.map(p => p.component.id).includes(item.id) ? 'inBasket' : 'count-disabled' : ''
      } else {
        return this.assembly.parts.map(p => p.component.id).includes(item.id) ? 'inBasket' : ''
      }

    },
    loadComponents() {
      this.componentsCurrent = this.componentsCurrentFiltered = this.componentsAll.filter(c => {
        const match = c.type === (this.chosenSubTab?.type || this.chosenTab.type) || (this.chosenTab.type === 'CPU' && this.assembly.chassis.cpu === c.type)
        return match
      })
    },
    tabChanged(index) {
      this.filter = ''
      this.tab = index;
      this.subTab = 0;
      this.$refs.subTabs.resetTab()
      this.loadComponents()
    },
    subTabChanged(index) {
      this.filter = ''
      this.subTab = index
      this.loadComponents()
    },

    async loadAssembly() {
      const res = await this.$axios.$get('/assembly/' + this.id);
      this.assembly = res.assembly
      this.componentsAll = res.components
      this.tabs = res.tabs
      this.loadComponents()
    },
    async addPart(count, item) {
      await this.$axios.$put(`/assembly/${this.id}/component/${item.id}`, {count})
      await this.loadAssembly()
      this.count = 0
    }
  }
}
</script>

<style scoped lang="sass">
.v-data-table
  :deep(.inBasket)
    td
      background-color: silver

  :deep(.count-disabled)
    .v-input
      display: none

  :deep(.memory-count-disabled)
    .v-input
      display: none

  :deep(.table-filter)
    label
      font-size: .8em

.count-select
  .v-select
    height: 200px
    display: none
    border: none

</style>
