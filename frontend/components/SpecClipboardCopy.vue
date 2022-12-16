<template>
  <span>
    <v-btn icon title="В буфер" @click="copyClipBoard" height="50" color="primary">
      <img src="/icons/copy.png"/>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title>Команда</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>Руководитель проекта - Мирошниченко Станислав</v-list-item>
            <v-list-item>Разработчик - Филиппов Артём</v-list-item>
            <v-list-item>Тех. консультант - Порошин Михаил</v-list-item>
            <v-list-item>Дизайн - Романова Наталья</v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog=false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
export default {
  name: "SpecClipboardCopy",
  props: ['spec'],
  data() {
    return {
      dialog: false,
      counter: 0
    }
  },
  methods: {
    copyClipBoard() {
      this.counter++;
      if (this.counter > 4) {
        this.dialog = true;
        this.counter = 0;
      }

      const textArea = document.createElement("textarea");
      textArea.style = {display:'none'}
      this.spec.configurations.forEach(conf => {
        textArea.value += conf.chassis.partNumber + '\t'
            + conf.count + '\t'
            + conf.chassis.params + '\t'
            + conf.price + '\t'
            + conf.priceTotal
            + '\n';
      })
      document.body.appendChild(textArea);
      //textArea.focus();
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