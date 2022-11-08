<template>
  <div v-if="spec">
    <h1>{{ spec.name }}</h1>

    <v-row>
      <v-col sm="2">Сумма спецификации: </v-col>
      <v-col sm="1" class="numbers">{{ spec.price }}</v-col>
    </v-row>
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
      spec: null,
    }
  },
  computed: {
    id() {
      return this.$route.params.specId;
    },
  },
  created() {
    this.loadSpec()
  },
  methods: {
    async loadSpec() {
      this.spec = await this.$axios.$get('/spec/' + this.id)
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