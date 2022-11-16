<template>
  <v-row>
    <v-col>
      <input type="file" accept="image/*" @change="uploadImage" ref="inputFile" hidden>
      <div  xstyle="height: 600px; overflow: scroll">
      <v-radio-group v-model="selected">
        <div v-for="chassis of list" class="row">
          <v-col>{{ chassis.partNumber }}</v-col>
          <v-col>
            <v-btn @click="selectChassis(chassis)">Upload</v-btn>
          </v-col>
          <v-col><img :src="`/upload/${chassis.partNumber}.jpg?rnd=${rnd}`" height="50"/></v-col>
<!--          <v-col>
            <v-radio :value="chassis.id"/>
          </v-col>-->
        </div>
      </v-radio-group>
      </div>
    </v-col>
<!--    <v-col>
      {{ selected }}
      <div v-for="c of dirs">
        <v-btn @click="copyImage(c)">{{ c }}</v-btn>
      </div>
    </v-col>-->
  </v-row>
</template>

<script>
import chassis from "~/pages/configurations/chassis";

export default {
  name: "chassis-list",
  data() {
    return {
      selected: null,
      list: [],
      dirs: [],
      rnd: 1
    }
  },
  created() {
    this.getChassis()
  },
  methods: {
    async copyImage(file) {
      await this.$axios.$post('/admin/chassis-copy-image/' + this.selected, {file})
      this.rnd = Math.random()
    },
    async getChassis() {
      this.list = await this.$axios.$get('/admin/chassis')
      //this.dirs = await this.$axios.$get('/admin/chassis-dirs')
    },
    async selectChassis(chassis) {
      this.selected = chassis
      this.$refs.inputFile.click()
    },
    async uploadImage(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("chassis", this.selected);
      await this.$axios.$post('/admin/upload-chassis-image/' + this.selected.id, formData)
      this.$refs.inputFile.value = null
      this.rnd = Math.random()
    },
    async deleteImage() {

    }
  }
}
</script>

<style scoped>

</style>