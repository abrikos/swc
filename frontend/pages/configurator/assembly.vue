<template>
  <div v-if="assembly">
    <h1>{{assembly.chassis.partNumber}} <small>{{assembly.chassis.descShort}}</small></h1>
    <v-row>
      <v-col sm="7">
        <Tabs :withIcons="true" :items="tabs" :onClick="tabChanged"/>
        <Tabs :items="chosenTab.children" :onClick="subTabChanged" v-if="chosenTab.children"/>
        <v-data-table
            :headers="headers"
            :items="components"
            :items-per-page="15"
            class="row-pointer"
            style="cursor: pointer"
        >
          <template v-slot:no-data>
            Ни чего не найдено
          </template>
          <template v-slot:item.controls="{item}">
            <v-select :items="[0, 1,2,3,4,5]" @change="e=>addPart(e, item)" dense flat :value="0"/>
          </template>
        </v-data-table>
      </v-col>
      <v-col sm="5">
        <Basket :assembly="assembly" :reload="loadAssembly"/>
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
    const tabs = [
      //{id: 'base', label: 'Основа'},
      {type: 'CPU'},
      {
        type: 'Memory',
      },
      {
        type: 'Storage',
        children: [
          {type: 'RAID'},
          {type: 'HDD'},
          {type: 'SSD 2.5'},
          {type: 'SSD m.2'},
          {type: 'SSD U.2 NVMe'},
          {type: 'Rear bay'},
        ]
      },
      /*{
        id: 'os___software',
        type: 'Soft',
        label: 'Софт', children: [
          {id: 'microsoft', label: 'Microsoft'},
          {id: 'vmware', label: 'VMware'},
        ]
      },*/
      {
        type: 'Riser',
      },
      {
        type: 'PCI-E',
        children: [
          {type: 'LAN OCP 3.0'},
          {type: 'LAN'},
          {type: 'FC'},
          {type: 'GPU'},
          {type: 'Transceiver'},
        ]
      },
      {
        type: 'Power',
      },
      //{id: 'others', label: 'Другое'},
      //{id: 'security', label: 'Безопасность'},
      //{id: 'services', label: 'Сервисы'},
      //{id: 'unconfigured', label: 'Иное'},
    ]

    return {
      count: 0,
      tab: 0,
      subTab: null,
      isHovering: false,
      components: [],
      assembly: null,
      headers: [
        {text: 'Партномер', value: 'partNumber', width: '20%'},
        {text: 'Описание', value: 'description', width: '40%'},
        {text: 'Цена', value: 'price', width: '20%'},
        {text: '', value: 'controls',width: '20%'}
      ],
      tabs
    }
  },
  computed: {
    id() {
      return this.$route.params.pathMatch;
    },
    chosenTab() {
      return this.tabs[this.tab]
    },
    chosenSubTab() {
      return this.chosenTab.children && this.chosenTab.children[this.subTab]
    }
  },
  created() {
    this.loadAssembly()
    this.loadComponents()
  },
  methods: {
    async loadComponents() {
      this.components = await this.$axios.$get(`/configurator/assembly/${this.id}/component-type/${this.chosenSubTab?.type || this.chosenTab.type}`)
      //componentsAll.filter(c=> this.subTab ? c.type === this.subTab : c.type === this.tab)
    },
    tabChanged(index) {
      this.tab = index;
      this.subTab = 0;
      this.loadComponents()
    },
    subTabChanged(index) {
      this.subTab = index
      this.loadComponents()
    },
    async loadAssembly() {
      this.assembly = await this.$axios.$get('/configurator/assembly/' + this.id)
    },
    async addPart(count, item) {
      await this.$axios.$post(`/configurator/assembly/${this.id}/add/${item.id}`, {count})
      await this.loadAssembly()
      this.count = 0
    }
  }
}
</script>

<style scoped lang="sass">
.count-select
  .v-select
    height: 200px
    display: none
    border: none

</style>
