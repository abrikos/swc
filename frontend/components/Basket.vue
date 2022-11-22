<template>
  <v-card v-if="configuration">
    <v-card-title>Корзина</v-card-title>

    <table class="cart">
      <thead>
      <th>Категория</th>
      <th>PartNumber</th>
      <th>Количество</th>
      <th>Цена</th>
      <th>Сумма</th>
      <th></th>
      </thead>
      <tbody>
      <tr>
        <td colspan="2">Платформа
          {{ configuration.chassis.partNumber }}
        </td>
        <td  align="center">
          1
        </td>
        <td align="right">
          {{ configuration.chassis.price }}
        </td>
        <td align="right">
          {{ configuration.chassis.price }}
        </td>
      </tr>
      <tr v-for="(item, i) of configuration.partsSorted" :key="i">
        <td>{{ item.component.category }} {{ item.component.type }}</td>
        <td>{{ item.component.partNumber }}</td>
        <td align="center">{{ item.count }}</td>
        <td align="right">{{ item.component.price }}</td>
        <td align="right">{{ item.price }}</td>
        <td>
          <v-btn icon x-small color="red" @click="remove(item)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </td>
      </tr>
      <tr class="result">
        <td colspan="5">Итого: {{ configuration.price }}</td>
        <td></td>
      </tr>
      </tbody>
    </table>
  </v-card>
</template>

<script>
export default {
  name: "Basket",
  props: ['configuration', 'reload'],
  methods: {
    remove(item) {
      this.$axios.$delete(`/configuration/part/${item.id}`)
          .then(this.reload)
    }
  }
}
</script>

<style scoped lang="sass">
.cart
  width: 100%
  font-size: .7em

  tr.result
    //background-color: silver
    td
      text-align: right

  td
    padding: 10px
    border-top: 1px solid silver

</style>