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
      >
        Спецификация <strong>{{ spec.name }}</strong>
      </v-toolbar>
      <v-card-text>
        <v-data-table
            :items="spec.assemblies"
            :headers="headers"
            :items-per-page="5"
        >
          <template v-slot:no-data>
            Ни чего не найдено
          </template>
          <template v-slot:item.count="{item}">
            {{ item.parts.length }}
          </template>
          <template v-slot:item.controls="{item}">
            <v-btn :to="'/configurator/'+item.id" icon title="Редактировать">
              <v-icon>mdi-file-edit-outline</v-icon>
            </v-btn>
            <v-btn @click="removeAssembly(item)" icon color="red" x-small title="Удалить">
              <v-icon>mdi-close</v-icon>
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
  name: "DialogEditSpec",
  props: ['spec', 'dialogVisible'],
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
          this.$emit('close', {a: 'zzzzz'})
        }
      }
    }
  },
  data() {
    return {
      newSpecEdited: false,
      newSpec: '',
      specs: [],
      headers: [
        {text: 'Название', value: 'name'},
        {text: 'Кол-во компонентов', value: 'count'},
        {text: '', value: 'controls', sortable: false, width: '100px'}
      ],
    }
  },
  methods: {
    async removeAssembly(item) {
      await this.$axios.$delete(`/spec/${this.spec.id}/assembly/${item.id}/remove`)
      this.intDialogVisible = false
    },
    async loadSpecs() {
      //this.spec = await this.$axios.$get('/spec/' + this.spec.id)
    }
  }
}
</script>

<style scoped>

</style>