<template>
  <div>
    <h1>{{ $t('Sign up') }}</h1>
    <v-card>
      <v-card-text>
        <v-text-field v-model="form.username" :label="$t('Username')" outlined/>
        <v-text-field v-model="form.email" :label="$t('Email')" outlined/>
        <v-text-field v-model="form.password" type="password" :label="$t('Password')" outlined/>
        <v-text-field v-model="form.passwordConfirm" type="password" :label="$t('Confirm password')" outlined/>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="registration">{{ $t('Send') }}</v-btn>
<!--        <v-btn @click="rnd">Random11</v-btn>-->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "SignUp",
  auth: false,
  data() {
    return {
      error: '',
      form: {},
    }
  },
  computed: {
    validation() {
      return this.form.password === this.form.passwordConfirm;
    }
  },
  methods: {
    async registration() {
      this.$store.dispatch('auth/signup', this.form)
        .then(()=> {
          this.$router.push(this.$store.getters.getLoginRedirect)
        })
    },
    rnd() {
      this.form.username = Math.random();
      this.form.email = Math.random() + '@aaa.com';
      this.form.password = '123';
      this.form.passwordConfirm = '123';
      this.error = this.form.username;
    },
  }
}
</script>

<style scoped>
</style>
