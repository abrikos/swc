<template>
  <div>
    <h1>{{ $t('Cabinet') }}</h1>

  </div>
</template>

<script>

export default {
  name: "cabinet",
  middleware: ['auth'],
  data() {
    return {

    }
  },
}
</script>

<style scoped>

</style>
