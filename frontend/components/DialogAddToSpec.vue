<template>
  <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="intDialogVisible"
  >
    <v-card>
      <v-toolbar
          color="primary"
          dark
      ><strong>{{assembly.name}}</strong> - Добавить в спецификацию
      </v-toolbar>
      <v-card-title>
        <v-text-field
            label="Введите название новой спецификации"
            v-model="newSpec"
            flat dense outlined hide-details
            :append-icon="newSpecEdited ? 'mdi-check' : ''"
            @click:append="createSpec"
            autofocus
            @keyup="newSpecEdited=true"
            @mousedown="newSpecEdited=true"
            @keyup.esc="$refs.newSpec.blur()"
            @keyup.enter="createSpec"
            @blur="newSpecEdited=false"
            ref="newSpec"
        />
      </v-card-title>
      <v-card-text>

        <v-data-table
            :items="specs"
            :headers="headers"
            :items-per-page="5"
        >
          <template v-slot:no-data>
            Ни чего не найдено
          </template>
          <template v-slot:item.count="{item}">
            {{item.assemblies.length}}
          </template>
          <template v-slot:item.controls="{item}">
            <v-btn icon @click="addToSpec(item)">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
            text
            @click="intDialogVisible = false"
        >Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogAddToSpec",
  props: ['assembly', 'dialogVisible'],
  computed: {
    intDialogVisible: {
      get: function () {
        if (this.dialogVisible) {
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
        }
        this.loadSpecs()
        return this.dialogVisible
      },
      set: function (value) {
        if (!value) {
          this.$emit('close', {a:'zzzzz'})
        }
      }
    }
  },
  data(){
    return {
      newSpecEdited: false,
      newSpec: '',
      specs: [],
      headers: [
        {text:'Дата', value: 'date'},
        {text:'Название', value: 'name'},
        {text:'Кол-во сборок', value: 'count'},
        {text:'', value: 'controls', sortable: false, width: '100px'}
      ],
    }
  },
  methods:{
    async createSpec(){
      await this.$axios.$put('/spec/create', {name: this.newSpec, assembly: this.assembly})
      await this.loadSpecs()
      this.newSpec = '';
      this.intDialogVisible = false
    },
    async addToSpec(item){
      await this.$axios.$put(`/assembly/${this.assembly.id}/to-spec/${item.id}`)
      this.intDialogVisible = false
    },
    async loadSpecs(){
      this.specs = await this.$axios.$get('/specs')
    }
  }
}
</script>

<style scoped>

</style>