<template>
  <v-card>
    <v-form @submit="goToSearch" v-on:submit.prevent>
      <v-card-text>
        <v-text-field
            v-model="form.text"
            @keydown.enter="goToSearch"
            label="Заголовок тикета"
            outlined
        />
        <v-row>
          <v-col>
            <v-text-field
                v-model="form.email"
                @keydown.enter="goToSearch"
                label="Email"
                outlined
            />
          </v-col>
          <v-col>
            <v-text-field
                v-model="form.department"
                @keydown.enter="goToSearch"
                label="Департамент"
                outlined
            />
          </v-col>
<!--          <v-col>
            <v-text-field
                v-model="form.model"
                @keydown.enter="goToSearch"
                disabled
                label="Устройство (в разработке)"
                outlined
            />
          </v-col>-->
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" color="primary">Поиск</v-btn>
        <v-spacer/>
        <v-btn @click="clear" color="warning">Сбросить</v-btn>
      </v-card-actions>
      <TicketsList :form="form"/>
    </v-form>
  </v-card>

</template>

<script>

import TicketsList from "~/components/TicketsList";

export default {
  components: {TicketsList},
  auth: false,
  data() {
    return {
      form: {},
      list: []
    }
  },
  methods: {
    clear(){
      this.form = {}
      this.$router.push('/')
    },
    goToSearch() {
      let path = '/search'
      Object.keys(this.form).forEach(key => (path += this.form[key] ? `/${key}/${this.form[key]}` : ''));
      this.$router.push(path)
    }
  },
  created() {
    if (!this.$route.params.pathMatch) return;
    const path = this.$route.params.pathMatch.split('/');
    for (let i = 0; i < path.length; i += 2) {
      this.form[path[i]] = path[i + 1]
    }
  },
}
</script>
