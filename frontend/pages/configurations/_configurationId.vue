<template>
  <div v-if="configuration">
    <h1 style="display: flex; justify-content: center; align-items: center; justify-content: space-between">
      <ConfNameEdit :conf="configuration">{{ configuration.name || configuration.chassis.partNumber }}</ConfNameEdit>
      <v-btn @click.stop="deleteConfiguration" icon color="red" x-small title="Удалить">
        <img src="/icons/delete.png"/>
      </v-btn>
    </h1>
    <v-row>
      <v-col sm="7">
        <Tabs :withIcons="true" :items="tabs" :onChange="tabChanged"/>
        <ConfigurationServices :configuration="configuration" :reload="loadConfiguration"
                               v-if="tab.category==='Services'"/>
        <v-data-table
            v-if="tab.category !=='Services'"
            :headers="headers"
            :items="componentsCurrentFiltered"
            :items-per-page="15"
            class="row-pointer"
            style="cursor: pointer"
            :item-class="itemRowClassName"
        >
          <template v-slot:no-data>
            Ни чего не найдено
          </template>
          <template v-slot:item.count="{item}">
            <v-select :items="countsArray" @change="e=>addPart(e, item)" dense flat
                      :value="calcCount(item)"
                      hide-details/>
          </template>
          <template v-slot:item.price="{item}">
            <div style="text-align: right">
              {{ item.price?.toFixed(2) }}
            </div>
          </template>
          <template v-slot:header="props">
            <tr>
              <td></td>
              <td>
                <v-text-field
                    hide-details
                    label="Фильтр описания"
                    outlined flat dense class="table-filter"
                    v-model="filter"
                />
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col sm="5">
        <small>{{ configuration.chassis.descFull }}</small>
        <br/>

        <div v-if="specs.length">
          <!--          В составе спецификаций:-->
          <div v-for="spec of specs" :key="spec.id">
            <SpecNameEdit :spec="spec">
              <router-link :to="'/specifications/'+spec.id">{{ spec.name }}</router-link>
            </SpecNameEdit>
          </div>
        </div>
        <div v-if="!specs.length">
          <v-btn @click="attachSpec" color="primary">
            Добавить в спецификацию
          </v-btn>
        </div>
        <br/>
        <v-alert border="top" color="red lighten-2" dark v-for="(error,i) of validator.errors" :key="i">
          {{ error }}
        </v-alert>
        <br/>
        <table style="width: 100%" class="power">
          <tr bgcolor="silver">
            <th colspan="3">Расчет электрической мощности</th>
          </tr>
          <tr>
            <td>Потребление (Вт)</td>
            <td>Блок питания (Вт)</td>
            <td>Коэффициент</td>
          </tr>
          <tr>
            <td>{{ configuration.powerConsumption }}</td>
            <td>{{ configuration.power }}</td>
            <td :class="powerColor">{{ configuration.powerCoefficient.toFixed(0) }}%</td>
          </tr>
        </table>
        <br/>
        <Basket :configuration="configuration" :reload="loadConfiguration"/>


        <!--        <img :src="`/chassis/${configuration.chassis.partNumber}.jpg`" />-->
      </v-col>
    </v-row>

  </div>
</template>

<script>
import Tabs from "~/components/Tabs";
import Basket from "~/components/Basket";
import SpecNameEdit from "~/components/SpecNameEdit";
import ConfNameEdit from "~/components/ConfNameEdit";
import ConfigurationServices from "~/components/ConfigurationServices";

export default {
  name: "configurator-parts",
  components: {ConfigurationServices, ConfNameEdit, SpecNameEdit, Basket, Tabs},
  data() {
    return {
      nameChanged: false,
      filter: '',
      tab: 0,
      maxCount: 64,
      isHovering: false,
      canLeave: false,
      componentsAll: [],
      specs: [],
      configuration: null,
      headers: [
        {text: 'Артикул', value: 'partNumber', width: '20%'},
        {text: 'Наименование', value: 'description', width: '50%'},
        {text: 'Цена', value: 'price', width: '10%', sortable: false},
        {text: '', value: 'count', width: '20%', sortable: false}
      ],
      tabs: []
    }
  },
  computed: {
    powerColor() {
      return this.configuration.powerCoefficient===0 ? '' :this.configuration.powerCoefficient < 70 ? 'green'
          :
          this.configuration.powerCoefficient < 85 ? 'orange'
              : 'red'
    },
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
  beforeRouteLeave(to, from, next) {
    if (!this.specs.length) {

      if (this.canLeave) return next()
      if (window.confirm('Все данные будут утеряны. Продолжить?')) {
        this.$axios.$delete(`/configuration/${this.configuration.id}`);
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  created() {
    if (!this.id) return this.$router.push('/specifications/list')
    this.loadConfiguration()
  },
  methods: {
    deleteConfiguration() {
      if (window.confirm(`Удалить конфигурацию "${this.configuration.name}"?`)) {
        this.$axios.$delete(`/configuration/${this.configuration.id}`)
        this.canLeave = true;
        this.$router.push('/specifications/list')
      }
    },
    async attachSpec() {
      await this.$axios.$get(`/configuration/${this.configuration.id}/spec/attach`)
      await this.loadConfiguration()
    },
    calcCount(item) {
      const part = this.configuration.parts.find(p => p.component.id === item.id)
      return part ? part.count : 0
    },
    itemRowClassName(item) {
      return this.configuration.parts.map(p => p.component.id).includes(item.id) ?
          'inBasket'
          :
          item.countDisabled ? 'count-disabled' : ''
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
      this.tabs.push({category: 'Services'})
      if (!this.tab) {
        this.tab = res.tabs[0]
        if (this.tab.children) {
          this.tab = this.tab.children[0]
        }
      }
    },
    async addPart(count, item) {
      await this.$axios.$put(`/configuration/${this.id}/component/${item.id}`, {count})
      await this.loadConfiguration()
    }
  }
}
</script>

<style scoped lang="sass">
table.power
  border: 1px solid silver
  font-size: .9em
  td
    text-align: center
    //border: 1px solid silver
    padding: 0 10px
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
