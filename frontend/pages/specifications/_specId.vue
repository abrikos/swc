<template>
  <div v-if="spec">
    <v-row justify="center" align="center">
      <v-col>
        <h2>{{ spec.name }} </h2>
      </v-col>
      <v-col sm="2">Сумма: {{ spec.price }}</v-col>
      <v-col sm="4" align="right">
        <v-btn v-if="!showAddConfiguration" @click="showAddConfiguration=true" color="primary"
               title="Добавить конфигурацию" icon>
          <v-icon size="50">mdi-plus-circle</v-icon>
        </v-btn>
        &nbsp;
        <v-btn icon @click="$copyToClipBoard(spec)" color="primary">
          <!--          <v-icon size="50">mdi-clipboard-text-multiple-outline</v-icon>-->
          <img src="/icons/copy.png"/>
        </v-btn>
        &nbsp;
        <a :href="`/api/spec/${id}/excel`" class="v-btn">
          <v-icon size="50" color="#aa2238">mdi-microsoft-excel</v-icon>
        </a>
        &nbsp;
        <v-btn icon color="primary">
          <img src="/icons/share.png"/>
        </v-btn>
        &nbsp;
        <v-btn icon color="primary">
          <img src="/icons/command.png"/>
        </v-btn>
        &nbsp;
        <v-btn icon @click="removeSpec(spec)" color="red">
          <img src="/icons/delete.png"/>
        </v-btn>
      </v-col>
    </v-row>
    <v-text-field
        v-model="spec.name"
        outlined
        :append-icon="nameChanged? 'mdi-check' : ''"
        @keyup="nameChanged = true"
        @click:append="renameSpec(spec); nameChanged = false"
        @keyup.enter="renameSpec(spec); nameChanged = false"
        hide-details
    />
    <div v-if="showAddConfiguration">
      <hr/>
      <h3>Выбрать конфигурации</h3>
      <table>
        <tr v-for="conf of otherConfigurations">
          <td>
            <v-checkbox @click.stop.prevent dense hide-details v-model="checked[conf.id]"
                        title="Добавить в спецификацию"/>
          </td>
          <td>{{ conf.name }}</td>
        </tr>
      </table>

      <v-btn
          v-if="checkedArray.length"
          color="primary"
          dark
          class="ma-2"
          @click="addToSpec">
        Прикрепить к этой спецификации
      </v-btn>
      <v-btn @click="showAddConfiguration=false">Отмена</v-btn>
    </div>
    <div v-if="!showAddConfiguration">
      <div v-for="config of spec.configurations" :key="config.id" class="configuration">
        <div class="config-header">

          <v-row align="center">
            <v-col sm="8">
              <v-text-field
                  v-model="config.name"
                  outlined
                  :append-icon="nameChangedConf === config.id ? `mdi-check` : ''"
                  @click:append="renameConfig(config)"
                  @keyup.enter="renameConfig(config)"
                  @keyup="nameChangedConf=config.id"
                  hide-details
              />
            </v-col>
            <v-col>
              <router-link :to="'/configurations/' + config.id" class="v-btn">
                <v-icon>mdi-eye</v-icon>
              </router-link>
            </v-col>
          </v-row>
        </div>
        <v-row align="center">
          <v-col align="center" sm="2">
            <strong>{{ config.chassis.partNumber }}</strong>
            <br/>
            <v-btn icon @click="removeFromSpec(config.id)" color="red">
              <img src="/icons/delete.png"/>
            </v-btn>
            &nbsp;&nbsp;
            <v-btn icon @click="$copyToClipBoard(spec)" color="primary">
              <img src="/icons/copy.png"/>
            </v-btn>
          </v-col>
          <v-col>{{ config.chassis.descFull }}</v-col>
          <v-col sm="1">Кол-во:
            <ConfigurationCount :item="config" :onChange="loadSpec"/>
          </v-col>
          <v-col sm="1">Цена: {{ config.price }}</v-col>
          <v-col sm="1">Сумма: {{ config.priceTotal }}</v-col>
        </v-row>
        <v-alert border="top" color="red lighten-2" dark v-for="(error,i) of $validator(config).errors" :key="i">
          {{ error }}
        </v-alert>
      </div>
    </div>
  </div>
</template>

<script>
import ConfigurationCount from "~/components/ConfigurationCount";

export default {
  name: "_spec-view",
  components: {ConfigurationCount},
  data() {
    return {
      nameChanged: false,
      nameChangedConf: false,
      checked: {},
      showAddConfiguration: false,
      spec: null,
      configurations: []
    }
  },
  computed: {
    checkedArray() {
      return Object.keys(this.checked).filter(k => this.checked[k])
    },
    otherConfigurations() {
      return this.configurations.filter(c => !this.spec.configurations.map(cc => cc.id).includes(c.id))
    },
    id() {
      return this.$route.params.specId;
    },
  },
  created() {
    this.loadSpec()
  },
  methods: {
    async renameConfig(item) {
      await this.$axios.$put(`/configuration/${item.id}/field/name`, item)
      this.nameChangedConf = false
    },
    async removeSpec(item) {
      if (window.confirm(`Удалить спецификацию "${item.name}"?`)) {
        await this.$axios.$post('/spec/delete', [item.id])
        await this.loadSpecs()
      }
    },
    async renameSpec(item) {
      await this.$axios.$put(`/spec/${item.id}/rename`, item)
    },
    async removeFromSpec(id) {
      await this.$axios.$delete(`/spec/${this.id}/configurations/${id}/remove`, this.checkedArray)
      await this.loadSpec()
    },
    async addToSpec() {
      //await this.$axios.$put(`/configuration/${this.configuration.id}/to-spec`, this.checkedArray)
      await this.$axios.$put(`/spec/${this.id}/configurations/add`, this.checkedArray)
      await this.loadSpec()
      this.checked = []
      this.showAddConfiguration = false
    },
    async loadSpec() {
      this.spec = await this.$axios.$get('/spec/' + this.id)
      this.configurations = await this.$axios.$get('/configuration/my')
    }
  }
}
</script>

<style scoped lang="sass">
h2
  margin: 9px 0 9px 0

.config-header
  background-color: #ccc
  padding: 10px

  a
    color: black

.configuration
  margin-bottom: 20px

.numbers
  text-align: right
  font-weight: bold

table
  td
    border: 1px solid silver
    padding: 5px
</style>