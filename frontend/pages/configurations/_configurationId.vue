<template>
  <div v-if="configuration">
    <h1>{{ configuration.name || configuration.chassis.partNumber }} <small>{{ configuration.chassis.params }}
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
        <br/>
<!--        <img :src="`/chassis/${configuration.chassis.partNumber}.jpg`" />-->
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
      return this.$componentCount(this.configuration, this.chosenTab.category, this.chosenSubTab?.type)
    },
    chosenSubTab() {
      return this.chosenTab.children && this.chosenTab.children[this.subTab]
    },
    componentsCurrent() {
      return this.$components(this.configuration, this.componentsAll, this.chosenTab.category, this.chosenSubTab?.type)
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
      const result = this.$allowAddPart(this.configuration, item, count);
      if (result.allow) {
        await this.$axios.$put(`/configuration/${this.id}/component/${item.id}`, {count})
        await this.loadConfiguration()
      }else{
        alert(result.message)
      }
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
