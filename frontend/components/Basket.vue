<template>
  <v-card v-if="configuration">
    <v-card-title>
      <v-col>Корзина</v-col>
      <v-col>${{ configuration.price.toFixed(2) }}</v-col>
    </v-card-title>

    <table class="cart">
      <thead>
      <th>Категория</th>
      <th>PartNumber</th>
      <th>Количество</th>
      <th>Цена, $</th>
      <th>Сумма, $</th>
      <th></th>
      </thead>
      <tbody>
      <tr>
        <td colspan="2">Платформа
          {{ configuration.chassis.partNumber }}
        </td>
        <td align="center">
          1
        </td>
        <td align="right">
          {{ configuration.chassis.price.toFixed(2) }}
        </td>
        <td align="right">
          {{ configuration.chassis.price.toFixed(2) }}
        </td>
      </tr>
      <tr v-for="(item, i) of configuration.partsSorted" :key="i">
        <td><v-btn icon x-small color="red" @click="remove(item)">
          <v-icon>mdi-close</v-icon>
        </v-btn> {{ item.component.category }} {{ item.component.type }}</td>
        <td align="center">{{ item.component.partNumber }}</td>
        <td align="center">{{ item.count }}</td>
        <td align="right">{{ item.component.price.toFixed(2) }}</td>
        <td align="right">{{ item.price.toFixed(2) }}</td>
      </tr>
      <tr v-if="configuration.service">
        <td colspan="4">
          {{ configuration.service.name }}
        </td>
        <td align="right">
          {{configuration.priceService.toFixed(2)}}
        </td>
        <!--        <td>
                  <v-btn icon x-small color="red" @click="removeService()">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </td>-->

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
    },
    async removeService() {
      await this.$axios.$put(`/configuration/${this.configuration.id}/field/service`, {service: null})
      await this.reload()
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