<template>
  <div>
    <h3>Поделиться с пользователем</h3>
    <v-text-field
        placeholder="Введите e-mail пользователей через запятую"
        outlined
        v-model="user"
    />
    <v-row>
      <v-col>
        <v-btn @click="share" color="primary">Отправить</v-btn>
        <div v-for="email of emails">{{ email }}</div>
      </v-col>
      <v-col v-if="sent.length">
        Отправлено: {{ sent.join(',') }}
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "SpecShare",
  props: ['spec', 'showDialog'],
  data() {
    return {
      sent: [],
      user: ''
    }
  },
  computed: {
    emails() {
      return this.user.split(',').map(u => u.trim())
    }
  },
  methods: {
    async share() {
      this.sent = await this.$axios.$post(`/spec/${this.spec.id}/share`, this.emails)
      this.$emit('closeDialog', false)
    }
  }
}
</script>

<style scoped>

</style>