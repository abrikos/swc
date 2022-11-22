<template>
<div>
  <h3>Добавить конфигурацию</h3>
  <v-row>
    <v-col sm="1">
      <v-list>
        <v-subheader>Платформа</v-subheader>
        <v-list-item-group v-model="platformSelected">
          <v-list-item v-for="p of platforms" :key="p">
            <v-list-item-content>
              <v-list-item-title v-text="p"/>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
    <v-col>
      <ChassisList :platform="platforms[platformSelected]" :onClick="addToSpec"/>
<!--      <v-list>
        <v-subheader>Шасси</v-subheader>
        <v-list-item-group>
          <v-list-item v-for="p of chassis.filter(c=>c.platform === platforms[platformSelected])" :key="p.id"
                       @click="addToSpec(p)">
            <v-list-item-icon>
              <img :src="`/upload/${p.partNumber}.jpg`" height="20px"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="p.partNumber"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>-->
    </v-col>
  </v-row>
</div>
</template>

<script>
export default {
  name: "ConfigCreateForSpec",
  props:['spec', 'onClick'],
  data(){
    return {
      platformSelected: 0,
      chassis:[],
      platforms: [
        'G2',
        'G3',
        'G2R',
        'AMD',
        'JBOD',
      ],

    }
  },
  created() {
    this.loadChassis()
  },
  methods: {
    async loadChassis() {
      this.chassis = await this.$axios.$get('/configuration/chassis')
    },
    async addToSpec(item) {
      //await this.$axios.$put(`/configuration/${this.configuration.id}/to-spec`, this.checkedArray)
      const conf = await this.$axios.$put(`/spec/${this.spec.id}/chassis/${item.id}/add`)
      await this.$router.push('/configurations/' + conf.id)
      //await this.loadSpec()
      //this.checked = []
      //this.showAddConfiguration = false
    }
  }
}
</script>

<style scoped>

</style>