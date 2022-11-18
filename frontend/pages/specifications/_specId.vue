<template>
  <div v-if="spec">
    <v-row justify="center" align="center">
      <v-col>
        <h2 v-if="!nameChanged" @click="nameChanged = true">{{ spec.name }}
          <v-btn @click="nameChanged = true" icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </h2>
        <v-text-field
            v-if="nameChanged"
            v-model="spec.name"
            outlined
            :append-icon="nameChanged? 'mdi-check' : ''"
            @keyup="nameChanged = true"
            @click:append="renameSpec(spec); nameChanged = false"
            hide-details
        />
      </v-col>
      <v-col sm="2">Сумма: {{ spec.price }}</v-col>
      <v-col sm="2" align="right">
        <v-btn @click="showAddConfiguration=true" color="primary" title="Добавить конфигурацию" icon><v-icon size="50">mdi-plus-circle</v-icon></v-btn>
        <a :href="`/api/spec/${id}/excel`" class="v-btn"><v-icon size="50">mdi-microsoft-excel</v-icon></a>
      </v-col>
    </v-row>
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
            <v-col>
              <router-link :to="'/configurations/' + config.id">
                <b>{{ config.name }}</b>
              </router-link>
            </v-col>
            <v-col>Цена: {{ config.price }}</v-col>
            <v-col>Количество:
              <ConfigurationCount :item="config" :onChange="loadSpec"/>
            </v-col>
            <v-col sm="2">Сумма: {{ config.priceTotal }}</v-col>
            <v-col sm="1">
              <v-btn icon @click="removeFromSpec(config.id)" color="red">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <b>{{ config.chassis.partNumber }}</b>
        <br/>
        <i>{{ config.chassis.descFull }}</i>

        <!--          <v-col>
                    <table style="width: 100%" v-if="config.parts.length">
                      <tr>
                        <th>PN</th>
                        <th>Описание</th>
                        <th>Количество</th>
                        <th>Сумма</th>
                      </tr>
                      <tr v-for="part of config.parts">
                        <td>{{ part.component.partNumber }}</td>
                        <td>{{ part.component.descShort }}</td>
                        <td class="numbers">{{ part.count }}</td>
                        <td class="numbers">{{ part.price }}</td>
                      </tr>
                    </table>
                  </v-col>-->

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
  margin-bottom: 10px

.numbers
  text-align: right
  font-weight: bold

table
  td
    border: 1px solid silver
    padding: 5px
</style>