<template>
  <div v-if="configuration">
    <h1>
      {{ configuration.name || configuration.chassis.partNumber }}
      <v-btn @click.stop="deleteConfiguration" icon color="red" x-small title="Удалить">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </h1>
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
        {{ configuration.chassis.platform }} - {{configuration.chassis.params}}
        <Basket :configuration="configuration" :reload="loadConfiguration"/>
        <br/>
        В составе спецификаций: <br/>
        <div v-for="spec of specs" :key="spec.id">
          <router-link :to="'/specifications/'+spec.id">{{spec.name}}</router-link>
        </div>
        <v-alert border="top" color="red lighten-2" dark v-for="(error,i) of validator.errors" :key="i">{{
            error
          }}
        </v-alert>
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
      specs: [],
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
    validator() {
      return this.$validator(this.configuration)
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
      const filter = this.filter.toLowerCase().replace('+', '\\+')
      console.log(filter)
      return this.componentsCurrent.filter(c => c.description.toLowerCase().match(filter))
    }
  },
  created() {
    if(!this.id) return this.$router.push('/specifications/list')
    this.loadConfiguration()
  },
  methods: {
    async deleteConfiguration() {
      if (window.confirm(`Удалить конфигурацию "${this.configuration.name}"?`)) {
        await this.$axios.$delete(`/configuration/${this.configuration.id}`)
        this.$router.push('/specifications/list')
      }
    },
    async createSpec() {
      const spec = await this.$axios.$put(`/spec/create`, [this.id])
      this.$router.push(`/specifications/${spec.id}`)
    },
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
      this.specs = res.specs
      this.tabs = res.tabs
    },
    async addPart(count, item) {
      await this.$axios.$put(`/configuration/${this.id}/component/${item.id}`, {count})
      await this.loadConfiguration()
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
