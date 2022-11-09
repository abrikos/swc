<template>
  <div v-if="configuration">
    <h1>{{ configuration.name || configuration.chassis.partNumber }} <small>{{ configuration.chassis.descShort }}
      {{ configuration.chassis.platform }}</small></h1>
    <v-row>
      <v-col sm="7">
        <Tabs :withIcons="true" :items="tabs" :onClick="tabChanged"/>
        <div class="sub-tab">
          <div v-for="(tab, i) of chosenTab.children" :key="i" @click="subTabChanged(i)"
               :class="i === subTab? 'active':''">{{ tab.type }}
          </div>
        </div>
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
            <v-text-field
                hide-details
                label="Фильтр описания"
                outlined flat dense class="table-filter"
                v-model="filter"
            />
          </template>
        </v-data-table>
      </v-col>
      <v-col sm="5">
        <v-text-field
            v-model="configuration.name"
            outlined
            :append-icon="nameChanged? 'mdi-check' : ''"
            @keyup="nameChanged = true"
            @click:append="changeField('name', configuration); nameChanged = false"
        />
        <Basket :configuration="configuration" :reload="loadConfiguration"/>
        <br/>
        <v-btn color="primary">
          Создать спецификацию
        </v-btn>
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
      maxCount: 64,
      subTab: null,
      isHovering: false,
      componentsAll: [],
      //componentsCurrent: [],
      //componentsCurrentFiltered: [],
      configuration: null,
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
      return this.$route.params.configurationId;
    },
    chosenTab() {
      const tab = this.tabs[this.tab] || {}

      return tab;
    },
    countsArray() {
      if (this.chosenTab.category === 'CPU') {
        const memoryModulesAttached = this.configuration.parts.filter(p => p.component.category === 'Memory').reduce((a, b) => a + b.count, 0);
        return this.configuration.chassis.platform === 'G3' ?
            memoryModulesAttached === 0 || memoryModulesAttached > 16 ? [0, 1, 2] : [0, 1]
            :
            memoryModulesAttached === 0 || memoryModulesAttached > 12 ? [0, 1, 2] : [0, 1]
      } else if (this.chosenTab.category === 'Memory') {
        if (this.configuration.chassis.platform === 'G3') {
          return this.configuration.parts.filter(p => p.component.category === 'CPU').length === 1 ? [0, 2, 4, 6, 8, 10, 12, 14, 16] : [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]
        } else {
          return this.configuration.parts.filter(p => p.component.category === 'CPU').length === 1 ? [0, 2, 4, 6, 8, 10, 12] : [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
        }
      } else if (this.chosenSubTab?.type === 'GPU') {
        return [0, 1, 2]
      }
      return [0, 1, 2, 3, 4, 5]
    },
    chosenSubTab() {
      return this.chosenTab.children && this.chosenTab.children[this.subTab]
    },
    componentsCurrent() {
      let gpus = 0;
      for (const part of this.configuration.parts) {
        if (part.component.type === 'GPU') {
          gpus += part.count
        }
      }
      const componentsByType = this.chosenSubTab ?
          this.componentsAll.filter(c => c.type === this.chosenSubTab.type)
          :
          this.componentsAll.filter(c => c.category === this.chosenTab.category)
      return componentsByType.filter(c => {
        switch (this.chosenTab.category) {
          case 'CPU':
            return this.configuration.chassis.cpu === c.type
          case 'Power':
            if(gpus>0) return c.params * 1 >= 1300
            if(gpus>1) return c.params * 1 >= 1600
          default:
            return true
        }
      })
    },
    componentsCurrentFiltered() {
      return this.componentsCurrent.filter(c => c.description.toLowerCase().match(this.filter.toLowerCase()))
    }
  },
  created() {
    this.loadConfiguration()
  },
  methods: {
    async changeField(field, item) {
      await this.$axios.$put(`/configuration/${item.id}/field/${field}`, item)
    },
    calcCount(item) {
      const part = this.configuration.parts.find(p => p.component.id === item.id)
      return part ? part.count : 0
    },
    itemRowBackground(item) {
      if (['CPU', 'Memory'].includes(this.chosenTab.category)) {
        return this.configuration.parts.filter(p => p.component.category === this.chosenTab.category).length ? this.configuration.parts.map(p => p.component.id).includes(item.id) ? 'inBasket' : 'count-disabled' : ''
      } else {
        return this.configuration.parts.map(p => p.component.id).includes(item.id) ? 'inBasket' : ''
      }
    },
    tabChanged(index) {
      this.filter = ''
      this.tab = index;
      this.subTab = 0;
      this.$refs.subTabs?.resetTab()
    },
    subTabChanged(index) {
      this.filter = ''
      this.subTab = index
    },
    async loadConfiguration() {
      const res = await this.$axios.$get('/configuration/' + this.id);
      this.configuration = res.configuration
      this.componentsAll = res.components
      this.tabs = res.tabs
    },
    async addPart(count, item) {
      let allowAdd = true;
      if (item.type === 'GPU' && count) allowAdd = confirm('При добавлении GPU на каждое необходим Riser')
      if (allowAdd) await this.$axios.$put(`/configuration/${this.id}/component/${item.id}`, {count})
      await this.loadConfiguration()
      this.count = 0
    }
  }
}
</script>

<style scoped lang="sass">
.sub-tab
  display: flex
  justify-content: center

  div
    margin: 10px
    cursor: pointer

  .active
    font-weight: bold
    color: #aa2238
    border-bottom: 1px solid #aa2238

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
