<template>
  <v-btn icon title="В буфер" @click="copyClipBoard" height="50" color="primary">
    <img src="/icons/copy.png"/>
  </v-btn>
</template>

<script>
export default {
  name: "SpecClipboardCopy",
  props:['spec'],
  methods:{
    copyClipBoard() {
      const textArea = document.createElement("textarea");
      this.spec.configurations.forEach(conf => {
        textArea.value += conf.chassis.partNumber + '\t'
            + conf.count + '\t'
            + conf.chassis.params + '\t'
            + conf.price + '\t'
            + conf.priceTotal
            + '\n';
      })
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }
      document.body.removeChild(textArea);
    },
  }
}
</script>

<style scoped>

</style>