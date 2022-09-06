<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-text>
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >
        <v-select
            v-model="form.departmentid"
            :items="departments"
            :rules="[v => !!v || $t('Department is required')]"
            :label="$t('Department')"
            item-text="title"
            item-value="departmentid"
            required
        ></v-select>
        <v-text-field
            v-model="form.subject"
            :label="$t('Subject')"
            :rules="[v => !!v || $t('Subject is required')]"
            required
        ></v-text-field>
        <v-textarea
            clearable
            clear-icon="mdi-close-circle"
            :label="$t('Text')"
            :rules="[v => !!v || $t('Text is required')]"
            v-model="form.text"
        ></v-textarea>
        <v-file-input
            multiple
            label="File input"
            v-model="files"
        ></v-file-input>
        {{files}}
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="submit">{{ $t('Send') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "create",
  data() {
    return {
      valid: false,
      departments: [],
      files: [],
      form: {}
    }
  },
  created() {
    this.$axios.$get('/departments/list')
        .then(list=>{
          this.departments = list
        })
  },
  methods: {
    submit() {
      if(!this.$refs.form.validate()) return      console.log('Not valid')
      this.$axios.$post('/ticket/create', this.form)
          .then(ticket=>{
            this.$router.push('/ticket/view/'+ ticket.ticketid);
          })
    }
  }
}
</script>

<style scoped>

</style>