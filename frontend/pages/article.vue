<template>
  <div>
    <v-text-field label="Фильтр статей" v-model="filter"/>
    <v-data-table
        @click:row="handleClick"
        :headers="headers"
        :items="list.filter(d=>d.subject.toLowerCase().indexOf(filter) !== -1)"
        :items-per-page="15"
        class="row-pointer"
        style="cursor: pointer"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
      <template v-slot:item.dateline="{ item }">
        {{ $fromUnixTimestamp(item.dateline) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "articles",
  data(){
    return {
      filter:'',
      list:[],
      headers:[
        {text: 'Заглавие', value: 'subject'},
        {text: 'Дата', value: 'dateline'},
        {text: 'Просмотров', value: 'views', width: "110px"},
      ]
    }
  },
  created(){
    this.$axios.$get('/article/list')
        .then(res => {
          this.list = res;
        });
  },
  methods:{
    handleClick(item){
      window.open('/article/view/' + item.kbarticleid, '_blank');
    }
  }
}
</script>

<style scoped>

</style>