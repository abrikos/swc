<template>
  <div>
    <h1>Minter testnet</h1>
    <ul>
      <li>
        Создайте кошелек на странице консоли <a href="https://console.testnet.minter.network">https://console.testnet.minter.network</a>
        Запомните сгенерированный адрес кошелька и надежно сохраните сгененрированную СИД-фразу. По СИД-фразе вы
        получаете доступ к своему кошельку. <small>(по этой же СИД-фразе открывается доступ к кошельку и в основной сети
        Minter</small>
      </li>
      <li>Зайдите в телеграм-бота <a href="https://t.me/MinterTestNetTapBot">@MinterTestNetTapBot</a> и отправьте ему
        Ваш сгенерированный ранее адрес кошелька. Бот отправит Вам на кошелёк некоторое количество MNT
      </li>
      <li>
        В
        <nuxt-link to="/user/cabinet">личном кабинете покера</nuxt-link>
        введите этот адрес в соответствующее поле для вывода. При запросе вывода средств на этот адрес будет совершен
        перевод запрошенного количества MNT
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "help"
}
</script>

<style scoped>

</style>
