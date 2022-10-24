<template>
  <v-card>
    <v-card-title>
      <v-tabs
          v-model="tab"
          icons
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="({id, label}, i) of tabs" :key="id" @click="tabChanged(i, 0)">
          <div :class="`tab-icon-${id} ${isHovering===id ? 'hovered':''} tab`" @mouseover="isHovering = id"
               @mouseout="isHovering = false" :title="label"></div>
        </v-tab>
      </v-tabs>
    </v-card-title>
    <v-card-subtitle>
      <div class="submenu">
        <div v-for="({id, label}, i) of chosenTab.children" :key="id" v-if="chosenTab.children"
             @click="tabChanged(tab, i)" :class="subTab===i && 'active'">
          {{ label }}
        </div>
        <div v-if="!chosenTab.children">{{chosenTab.label}}</div>
      </div>
    </v-card-subtitle>
    <!--          <v-tabs
                  v-model="subTab"
                  centered
              >
                <v-tabs-slider></v-tabs-slider>
                <v-tab v-for="({id, label}, i) of chosenTab.children" :key="id" v-if="chosenTab.children" @click="tabChanged(tab, i)">
                  {{ label }} {{i}}
                </v-tab>
                <v-tab v-if="!chosenTab.children">{{ chosenTab.label }}</v-tab>
              </v-tabs>-->

    {{ tab }} - {{ subTab }}

    <!--    <v-row>
          <v-col sm="2">
            <v-list>
              <v-list-item-group v-model="tab">
                <v-list-item
                    v-for="(item, i) in tabs"
                    :key="i"
                >
                  <div :class="`tab-icon-${item.id} ${isHovering===item ? 'hovered':''} tab`" @mouseover="isHovering = item"
                       @mouseout="isHovering = false" :title="item.label"></div>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.label"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col sm="2" v-if="chosenTab.children">
            <v-list>
              <v-list-item-group v-model="subTab">
                <v-list-item
                    v-for="(item, i) in chosenTab.children"
                    :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.label"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>

          <v-col>
            <v-card height="100%">
              <v-card-text>
                {{ tab }}
                <hr/>
                {{ chosenTab }}
                <hr/>
                {{ subTab }}
                <hr/>
                {{ chosenTab.children && chosenTab.children[subTab] }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>-->
  </v-card>
</template>

<script>
export default {
  name: "configuration",
  data() {
    return {
      tab: 2,
      subTab: 0,
      isHovering: false,
      tabs: [
        {id: 'base', label: 'Основа'},
        {id: 'processors', label: 'Процессоры'},
        {
          id: 'memory',
          label: 'Память',
          children: [{id: 'mode', label: 'Тип памяти'}, {id: 'module', label: 'Модули памяти'}]
        },
        {
          id: 'storage',
          label: 'Хранение',
          children: [{id: 'raid_type', label: 'Хранение RAID'}, {
            id: 'controllers',
            label: 'Контроллеры'
          }, {id: 'internal', label: 'Внутренние хранилища'}]
        },
        {
          id: 'os___software', label: 'Софт', children: [
            {id: 'microsoft', label: 'Microsoft'},
            {id: 'vmware', label: 'VMware'},
          ]
        },
        {id: 'pci', label: 'PCI', children: [{id: 'adapters', label: 'Адаптеры'}, {id: 'riser', label: 'Карты Riser'}]},
        {id: 'optical_drive', label: 'Оптические дисководы'},
        {
          id: 'power',
          label: 'Питание',
          children: [{id: 'supply', label: 'Блоки питания'}, {id: 'cables', label: 'Кабели'}]
        },
        {id: 'others', label: 'Другое'},
        {id: 'security', label: 'Безопасность'},
        {id: 'services', label: 'Сервисы'},
        {id: 'unconfigured', label: 'Иное'},
      ]
    }
  },
  computed: {
    chosenTab() {
      return this.tabs[this.tab]
    }
  },
  methods: {
    tabChanged(t, st) {
      console.log('tabs', t, st)
      this.tab = t;
      this.subTab = st;
      console.log('tab observe', this.tab, this.subTab)
    },
  }
}
</script>

<style scoped lang="sass">
.submenu
  display: flex
  cursor: pointer
  margin: 10px
  div
    margin: 5px
    padding: 3px
  div.active
    border-bottom: 2px solid #1976d2

.tab
  background-size: cover
  width: 70px
  height: 70px

.tab.hovered
  opacity: .2
</style>
