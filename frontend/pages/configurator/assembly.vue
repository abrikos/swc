<template>
  <div v-if="assembly">

    <div class="config-menu">
      <div v-for="({id, label}, i) of tabs" :key="id" @click="tabChanged(i, 0)" :title="label"
           :class="tab===i && 'active'">
        <div :class="`tab-icon-${id} ${isHovering===id ? 'hovered':''} tab`" @mouseover="isHovering = id"
             @mouseout="isHovering = false" :title="label"></div>
      </div>
    </div>
<!--    <div class="submenu">
      <div v-for="({id, label}, i) of chosenTab.children" :key="id" v-if="chosenTab.children"
           @click="tabChanged(tab, i)" :class="subTab===i && 'active'">
        {{ label }}
      </div>
      <div v-if="!chosenTab.children">{{ chosenTab.label }}</div>
    </div>-->
    {{assembly.chassis.description}}
    <v-row>
      <v-col>
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
            <v-btn class="mx-2" small @click="addPart(item)">
              +
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
      <v-col sm="3">
        Сумма
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  name: "configurator-parts",
  data() {
    return {
      tab: 0,
      subTab: 0,
      isHovering: false,
      components: [],
      assembly: null,
      headers: [
        {text: 'Название', value: 'description'},
        {text: '', value: 'controls'}
      ],
      tabs: [
        //{id: 'base', label: 'Основа'},
        {id: 'processors', label: 'Процессоры', type: 'CPU'},
        {
          id: 'memory',
          label: 'Память',
          type: 'Memory',
          children: [{id: 'mode', label: 'Тип памяти'}, {id: 'module', label: 'Модули памяти'}]
        },
        {
          id: 'storage',
          type: 'Storage',
          label: 'Хранение',
          children: [{id: 'raid_type', label: 'Хранение RAID'}, {
            id: 'controllers',
            label: 'Контроллеры'
          }, {id: 'internal', label: 'Внутренние хранилища'}]
        },
        {
          id: 'os___software',
          type: 'Soft',
          label: 'Софт', children: [
            {id: 'microsoft', label: 'Microsoft'},
            {id: 'vmware', label: 'VMware'},
          ]
        },
        {
          id: 'pci',
          type: 'PCI-E',
          label: 'PCI',
          children: [{id: 'adapters', label: 'Адаптеры'}, {id: 'riser', label: 'Карты Riser'}]
        },
        //{id: 'optical_drive', label: 'Оптические дисководы'},
        {
          id: 'power',
          type: 'PSU',
          label: 'Питание',
          children: [{id: 'supply', label: 'Блоки питания'}, {id: 'cables', label: 'Кабели'}]
        },
        //{id: 'others', label: 'Другое'},
        //{id: 'security', label: 'Безопасность'},
        //{id: 'services', label: 'Сервисы'},
        //{id: 'unconfigured', label: 'Иное'},
      ]
    }
  },
  computed: {
    id() {
      return this.$route.params.pathMatch;
    },
    chosenTab() {
      return this.tabs[this.tab]
    }
  },
  created() {
    this.$axios.$get('/configurator/assembly/' + this.id)
        .then(res=>this.assembly = res)
    this.loadComponents();
  },
  methods: {
    tabChanged(t, st) {
      console.log('tabs', t, st)
      this.tab = t;
      this.subTab = st;
      this.loadComponents();
      console.log('tab observe', this.tab, this.subTab)
    },
    async loadComponents() {
      this.components = await this.$axios.$get('/components/' + this.chosenTab.type).catch(console.warn)
    },
    async addPart(item) {
      await this.$axios.$put('/assembly/add/part/' + item.id)
    }
  }
}
</script>

<style scoped lang="sass">
.config-menu
  display: flex
  cursor: pointer

.submenu
  display: flex
  cursor: pointer
  margin: 10px

  div
    margin: 5px
    padding: 3px

div.active
  border-bottom: 2px solid #1976d2
  background: #1976d2
  color: white

.tab
  background-size: contain
  width: 70px
  height: 60px

.tab.hovered
  opacity: .2
</style>
