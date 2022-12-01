<template>
  <div v-if="spec">
    <v-row justify="center" align="center" style="border-bottom: 1px solid silver">
      <v-col>
        <h2>
          <SpecNameEdit :spec="spec"> {{ spec.name }}</SpecNameEdit>
        </h2>
      </v-col>
      <v-col sm="4" align="right">
        &nbsp;
        <SpecClipboardCopy :spec="spec"/>
        &nbsp;
        <a :href="`/api/spec/${id}/excel`" class="v-btn">
          <v-icon size="50" color="#aa2238">mdi-microsoft-excel</v-icon>
        </a>
        &nbsp;
        <v-btn icon color="primary" title="Поделиться" @click="showDialog='share'">
          <img src="/icons/share.png"/>
        </v-btn>
        &nbsp;
        <v-btn icon @click="removeSpec(spec)" color="red">
          <img src="/icons/delete.png"/>
        </v-btn>
      </v-col>
    </v-row>
    <br/>
    <table v-if="!showDialog">
      <thead>
      <tr>
        <td>
          <v-btn v-if="!showDialog" @click="showDialog='addConfig'" color="primary"          >
            Добавить конфигурацию
          </v-btn>
        </td>
        <td>Итого, $: {{ spec.price }}</td>
        <td width="70">Кол-во</td>
        <td width="70">Цена</td>
        <td width="70">Сумма</td>
      </tr>
      </thead>
      <tbody v-for="config of spec.configurations" :key="config.id">
      <tr>
        <td colspan="5">
          <v-row>
            <v-col sm="1" v-if="$validator(config).errors.length">
              <v-btn icon color="warning" title="В конфигурации есть ошибки" :to="'/configurations/' + config.id" >
                <v-icon >mdi-alert-decagram</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <ConfNameEdit :conf="config">
                <router-link :to="'/configurations/' + config.id" v-if="nameEditConf!==config.id">
                  {{ config.name }}
                </router-link>
              </ConfNameEdit>
            </v-col>
          </v-row>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <v-row align="center">
            <v-col align="center" sm="2">
              <strong>{{ config.chassis.partNumber }}</strong>
              <br/>
              <v-btn icon @click="removeFromSpec(config.id)" color="red">
                <img src="/icons/delete.png"/>
              </v-btn>
              <v-btn icon @click="copyConfiguration(config)" color="primary">
                <img src="/icons/copyFiles.png"/>
              </v-btn>
            </v-col>
            <v-col>
              {{ config.chassis.descFull }}.
            </v-col>
          </v-row>
        </td>
        <td>
          <ConfigurationCount :item="config" :onChange="loadSpec"/>
        </td>
        <td align="right">{{ config.price.toFixed() }}</td>
        <td align="right">{{ config.priceTotal.toFixed() }}</td>
      </tr>
      <tr>
        <td colspan="5">
          <hr/>
        </td>
      </tr>
      </tbody>
    </table>
    <ConfigCreateForSpec v-if="showDialog==='addConfig'" :spec="spec"/>
    <SpecShare v-if="showDialog==='share'" :spec="spec" @closeDialog="closeDialog"/>
    <v-btn @click="showDialog=false" v-if="showDialog" >Закрыть</v-btn>
  </div>
</template>

<script>
import ConfigurationCount from "~/components/ConfigurationCount";
import SpecNameEdit from "~/components/SpecNameEdit";
import ConfigCreateForSpec from "~/components/ConfigCreateForSpec";
import SpecShare from "~/components/SpecShare";

export default {
  name: "_spec-view",
  components: {SpecShare, ConfigCreateForSpec, SpecNameEdit, ConfigurationCount},
  data() {
    return {
      chassis: [],
      nameChanged: false,
      nameEdit: false,
      nameChangedConf: false,
      nameEditConf: false,
      checked: {},
      showDialog: false,
      spec: null,
      configurations: [],
    }
  },
  computed: {
    share(){
      this.showDialog = 'share'
    },
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
    closeDialog(variable) {
      this.showDialog = variable
    },
    createConfiguration(e) {
      this.$axios.$get('/configuration/create/chassis/' + e.id)
          .then(res => {
            this.$router.push('/configurations/' + res.id)
          })
    },
    async copyConfiguration(item) {
      await this.$axios.$get(`/spec/${this.spec.id}/configuration/${item.id}/copy`)
      await this.loadSpec()
    },
    async renameConfig(item) {
      await this.$axios.$put(`/configuration/${item.id}/field/name`, item)
      this.nameChangedConf = false
      this.nameEditConf = false
    },
    async removeSpec(item) {
      if (window.confirm(`Удалить спецификацию "${item.name}"?`)) {
        await this.$axios.$post('/spec/delete', [item.id])
        this.$router.push('/specifications/list')
      }
    },

    async removeFromSpec(id) {
      await this.$axios.$delete(`/spec/${this.id}/configurations/${id}/remove`, this.checkedArray)
      await this.loadSpec()
    },
    async addToSpec(item) {
      //await this.$axios.$put(`/configuration/${this.configuration.id}/to-spec`, this.checkedArray)
      const conf = await this.$axios.$put(`/spec/${this.id}/chassis/${item.id}/add`)
      await this.$router.push('/configurations/' + conf.id)
      //await this.loadSpec()
      //this.checked = []
      //this.showAddConfiguration = false
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

table
  td
    border-color: red

.config-header
  padding: 10px

  a
    color: black

.configuration
  margin-bottom: 20px

.numbers
  text-align: right
  font-weight: bold

</style>