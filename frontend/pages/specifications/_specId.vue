<template>
  <div v-if="spec">
    <h1>{{ spec.name }}</h1>

    <v-row>
      <v-col sm="2">Сумма спецификации:</v-col>
      <v-col sm="1" class="numbers">{{ spec.price }}</v-col>
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
        Добавить в спецификацию
      </v-btn>
      <v-btn @click="showAddConfiguration=false">Отмена</v-btn>
    </div>
    <div v-if="!showAddConfiguration">
      <v-btn @click="showAddConfiguration=true" color="primary">Добавить конфигурацию</v-btn>
      <div v-for="config of spec.configurations" :key="config.id" class="configuration">
        <router-link :to="'/configurations/' + config.id">
          <strong style="display: block; text-align: center">{{ config.name }}</strong>
        </router-link>
        <i>{{ config.chassis.descFull }}</i><br/>
        <v-row>
          <v-col>
            <v-row>
              <v-col sm="3">Цена шасси:</v-col>
              <v-col sm="1" class="numbers">{{ config.chassis.price }}</v-col>
            </v-row>

            <v-row>
              <v-col sm="3">Цена 1й конфигурации:</v-col>
              <v-col sm="1" class="numbers">{{ config.price }}</v-col>
            </v-row>
            <v-row>
              <v-col sm="3">Количество шасси:</v-col>
              <v-col sm="3">
                <ConfigurationCount :item="config" :onChange="loadSpec"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="3">Итого:</v-col>
              <v-col sm="1" class="numbers">{{ config.priceTotal }}</v-col>
            </v-row>
          </v-col>
          <v-col>
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
          </v-col>
        </v-row>
        <v-btn icon @click="removeFromSpec(config.id)" color="red"><v-icon>mdi-delete</v-icon></v-btn>
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
      checked: {},
      showAddConfiguration: false,
      spec: null,
      configurations: []
    }
  },
  computed: {
    checkedArray(){
      return Object.keys(this.checked).filter(k=>this.checked[k])
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
    async removeFromSpec(id){
      await this.$axios.$delete(`/spec/${this.id}/configurations/${id}/remove`, this.checkedArray)
      await this.loadSpec()
    },
    async addToSpec(){
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
.configuration
  border: 1px solid silver
  padding: 10px
  margin-bottom: 10px

.numbers
  text-align: right
  font-weight: bold

table
  td
    border: 1px solid silver
    padding: 5px
</style>