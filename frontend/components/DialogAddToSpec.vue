<template>
  <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon title="Добавить в спецификацию" v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >{{assembly.name}}
        </v-toolbar>
        <v-card-text>
          <div class="text-h2 pa-12">Hello world!</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
              text
              @click="dialog.value = false"
          >Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogAddToSpec",
  props: ['assembly'],
  created() {

  },
  methods:{
    addToSpec(item){
      console.log(item.name)
    },
  }
}
</script>

<style scoped>

</style>