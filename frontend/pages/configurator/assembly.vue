<template>
  <div v-if="assembly">
    <h1>Конфигуратор <small>Выберите комплектующие</small></h1>
    <v-row>
      <v-col>
        <div class="config-menu">

          <div v-for="({type}, i) of tabs" :key="i" @click="tabChanged(type)"
               :class="'tab' + (tab===type ? ' active' : '') + (isHovering===type ? ' hovered':'')"
               @mouseover="isHovering = type"
               @mouseout="isHovering = false">
            <!--            <span :class="`tab-icon-${id}${$vuetify.theme.isDark ? '&#45;&#45;active' : ''}`"></span>-->
            <img :src="`/icons/${type}_icon.png`"/>
            {{ type }}
          </div>
        </div>
        <div class="submenu">
          <div
              v-for="(type, i) of chosenTab.children"
              :key="i"
              v-if="chosenTab.children"
              @click="subTabChanged(type)"
              :class="'subtab' + (subTab===type ? ' active' : '')"
          >
            {{ type }}
          </div>
        </div>
<!--        {{ assembly.chassis.description }}-->
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

            <v-btn icon class="mx-2" small @click="addPart(item)"
                   :color="assembly.components.map(c=>c.id).includes(item.id) ? 'red' : ''">
              <v-icon v-if="assembly.components.map(c=>c.id).includes(item.id)" title="Убрать из корзины">
                mdi-cart-arrow-up
              </v-icon>
              <v-icon v-else title="Добавить в корзину">mdi-cart-arrow-down</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
      <v-col sm="3">
        Корзина
        <table class="cart">
          <thead>
          <th>Наименование</th>
          <th>Цена</th>
          </thead>
          <tbody>
          <tr>
            <td>
              {{ assembly.chassis.description }}
            </td>
            <td>
              {{ assembly.chassis.price }}
            </td>
          </tr>
          <tr v-for="({id, description, price}, i) of assembly.components" :key="i">
            <td>{{ description }}</td>
            <td>{{ price }}</td>
          </tr>
          <tr>
            <td></td>
            <td>Итого: {{ assembly.price }}</td>
          </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  name: "configurator-parts",
  data() {
    const tabs = [
      //{id: 'base', label: 'Основа'},
      {type: 'CPU', children: ['AMD', 'Intel']},
      {
        type: 'Memory',
      },
      {
        type: 'Storage',
        children: [
          'RAID',
          'HDD',
          'SSD 2.5',
          'SSD m.2',
          'SSD U.2 NVMe',
          'Rear bay',
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
          'LAN OCP 3.0',
          'LAN',
          'FC',
          'GPU',
          'Transceiver',
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
    const tab = 'Storage'
    return {
      tab,
      subTab: tabs.find(t=>t.type === tab).children ? tabs.find(t=>t.type === tab).children[0] : '',
      isHovering: false,
      components: [],
      componentsAll: [],
      assembly: null,
      headers: [
        {text: 'Название', value: 'description'},
        {text: 'Цена', value: 'price'},
        {text: '', value: 'controls'}
      ],
      tabs
    }
  },
  computed: {
    id() {
      return this.$route.params.pathMatch;
    },
    chosenTab() {
      return this.tabs.find(t=>t.type === this.tab)
    }
  },
  created() {
    this.loadAssembly()
    this.$axios.$get('/components')
        .then(res => {
          this.componentsAll = res
          this.filterComponents()
        })
        .catch(console.warn)
  },
  methods: {
    filterComponents(){
      this.components = this.componentsAll.filter(c=> this.subTab ? c.type === this.subTab : c.type === this.tab)
    },
    tabChanged(t) {
      this.tab = t;
      if(this.chosenTab.children) {
        this.subTab = this.chosenTab.children[0];
      }else{
        this.subTab = null
      }
      this.filterComponents()
    },
    subTabChanged(id){
      this.subTab = id
      this.filterComponents()
    },
    async loadAssembly() {
      this.assembly = await this.$axios.$get('/configurator/assembly/' + this.id)
    },
    async addPart(item) {
      await this.$axios.$put(`/configurator/assembly/${this.id}/add/${item.id}`)
      await this.loadAssembly()
    }
  }
}
</script>

<style scoped lang="sass">
.config-menu
  display: flex
  cursor: pointer
  text-align: center
  border-bottom: 1px solid silver
  padding-bottom: 5px

  div
    margin: 1px
    border-radius: 6px 6px 0 0

  .tab
    width: 90px
    text-align: center
    color: #1976d2
    padding: 10px
    img
      margin: auto
      display: block
      width: 55px

  .tab.hovered
    background-color: silver

  .tab.active
    border-color: silver
    border-style: solid
    border-width: 1px 1px 0 1px
    color: inherit
    font-weight: bold

.submenu
  display: flex
  cursor: pointer
  margin: 5px
  .active
    border-color: silver
    border-style: solid
    border-width: 0px 1px 1px 1px
    color: inherit
    font-weight: bold
  div
    color: #1976d2
    margin: 5px
    padding: 5px


.cart
  width: 100%
  font-size: .7em

  tr:nth-child(even)
    background-color: silver

  td
    padding: 10px

  td:last-child
    text-align: right
    width: 100px
</style>
