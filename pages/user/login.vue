<template>

    <v-card>
      <v-card-text>
        <v-text-field
          outlined
          v-model="login.email"
          label="E-mail"
          :rules="rules"
        />
        <v-text-field
          outlined
          v-model="login.password"
          label="Пароль"
          :rules="rules"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submit" class="my-4">Отправить</v-btn>
      </v-card-actions>
    </v-card>

</template>

<script>
export default {
  name: "login",
  auth: false,
  data() {
    return {
      valid: false,
      rules: [
        value => !!value || 'Обязательно',
        //value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      login: {
        email: 'techsup@hikom.ru',
        password: '',
      }
    }
  },
  methods: {
    async submit() {
      let response = await this.$auth.loginWith('local', { data: this.login })
        .catch(console.warn)
      console.log('zzzzzz', response)
    },
  },
}
</script>

<style scoped>

</style>
