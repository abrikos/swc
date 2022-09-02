<template>
  <v-card>
    <v-card-title>{{ticket.subject}}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col md="8">
          <div v-for="post of ticket.swticketposts" :key="post.ticketpostid" class="post">
            <strong>
              {{post.subject}}
            </strong>
            <br/>
            {{post.fullname}}
            {{post.email}}
            <hr/>
            <span v-html="post.contents.replace('\n', '<br/>')"></span>
          </div>
        </v-col>
        <v-col>
          <div v-for="file of ticket.swattachments" :key="file.attachmentid" class="attach">
            <span v-if="file.filetype.match('image')">
              <a :href="`/files/${file.storefilename}`"><v-img :src="`/files/${file.storefilename}`" width="300"/></a>
              <br/>
            </span>
            <span v-else>
            {{fromUnix(file.dateline)}}
            <a :href="`/attachments/${file.storefilename}`" :download="file.filename">{{file.filename}}</a>
            {{file.filetype}}
              </span>
          </div>
        </v-col>
      </v-row>


    </v-card-text>
  </v-card>
</template>

<script>
import moment from "moment"
export default {
  name: "view",
  data(){
    return {
      ticket: {
        swticketposts:[]
      }
    }
  },
  created() {
    this.$axios.$get('/ticket/view/' + this.id)
        .then(data => {
          console.log(data.swticketposts)
          this.ticket = data;
        })
  },
  computed:{
    id() {
      return this.$route.params.pathMatch;
    }
  },
  methods:{
    fromUnix(timestamp){
      return moment.unix(timestamp).format('YYYY-MM-DD HH:mm')
    },
  }
}
</script>

<style scoped lang="sass">
.post
  margin-bottom: 10px
  padding: 5px
  border: 1px solid silver
</style>