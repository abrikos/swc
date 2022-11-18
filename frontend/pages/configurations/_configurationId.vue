<template>
  <div v-if="configuration">
    <h1>
      {{ configuration.name || configuration.chassis.partNumber }}
      <v-btn @click.stop="deleteConfiguration" icon color="red" x-small title="Удалить">
        <img src="/icons/delete.png"/>
      </v-btn>
    </h1>
    <v-row>
      <v-col sm="7">
        <Tabs :withIcons="true" :items="tabs" :onChange="tabChanged"/>
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
            @keyup.enter="changeField('name', configuration); nameChanged = false"
        />
        {{ configuration.chassis.platform }} - {{ configuration.chassis.params }}
        <Basket :configuration="configuration" :reload="loadConfiguration"/>
        <br/>
        В составе спецификаций: <br/>
        <div v-for="spec of specs" :key="spec.id">
          <router-link :to="'/specifications/'+spec.id">{{ spec.name }}</router-link>
        </div>
        <v-alert border="top" color="red lighten-2" dark v-for="(error,i) of validator.errors" :key="i">
          {{ error }}
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
      isHovering: false,
      componentsAll: [],
      specs: [],
      //componentsCurrent: [],
      //componentsCurrentFiltered: [],
      configuration: null,
      headers: [
        {text: 'Партномер', value: 'partNumber', width: '20%'},
        {text: 'Описание', value: 'description', width: '50%', sortable: false},
        {text: 'Цена', value: 'price', width: '10%'},
        {text: '', value: 'count', width: '20%', sortable: false}
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
    countsArray() {
      return this.$componentCount(this.configuration, this.tab)
    },
    componentsCurrent() {
      return this.$components(this.configuration, this.componentsAll, this.tab)
    },
    componentsCurrentFiltered() {
      const filter = this.filter.toLowerCase().replace('+', '\\+')
      return this.componentsCurrent.filter(c => c.description.toLowerCase().match(filter))
    }
  },
  created() {
    if (!this.id) return this.$router.push('/specifications/list')
    this.loadConfiguration()
  },
  methods: {
    async deleteConfiguration() {
      if (window.confirm(`Удалить конфигурацию "${this.configuration.name}"?`)) {
        await this.$axios.$delete(`/configuration/${this.configuration.id}`)
        this.$router.push('/specifications/list')
      }
    },
    async changeField(field, item) {
      await this.$axios.$put(`/configuration/${item.id}/field/${field}`, item)
    },
    calcCount(item) {
      const part = this.configuration.parts.find(p => p.component.id === item.id)
      return part ? part.count : 0
    },
    itemRowBackground(item) {
      return this.configuration.parts.map(p => p.component.id).includes(item.id) ? 'inBasket' : this.configuration.cpuCount ? item.category === 'CPU' ? 'count-disabled' : '' : ''
    },
    tabChanged(tab) {
      console.log('tab selected', JSON.stringify(tab))
      this.filter = ''
      this.tab = tab;
    },
    async loadConfiguration() {
      const res = await this.$axios.$get('/configuration/' + this.id);
      this.configuration = res.configuration
      this.componentsAll = res.components
      this.specs = res.specs
      this.tabs = res.tabs
      this.tab = res.tabs[0]
    },
    async addPart(count, item) {
      await this.$axios.$put(`/configuration/${this.id}/component/${item.id}`, {count})
      await this.loadConfiguration()
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
