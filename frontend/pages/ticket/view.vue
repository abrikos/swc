<template>
  <v-card>
    <v-card-title>{{ ticket.subject }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col md="8">
          <div v-for="post of ticket.swticketposts" :key="post.ticketpostid" class="post">
            <strong>
              {{ post.subject }}
            </strong>
            <br/>
            {{ fromUnix(post.dateline) }}
            <strong>{{ post.fullname }}</strong>
            <a :href="`mailto:${post.email}`">{{ post.email }}</a>
            <hr/>
            <span v-html="post.contents.replaceAll('\n', '<br/>')"></span>
          </div>
        </v-col>
        <v-col>
          <div v-for="file of ticket.swattachments" :key="file.attachmentid" class="attach">
            <span v-if="file.filetype.match('image')">
              <a :href="`/files/${file.storefilename}`"><v-img :src="`/files/${file.storefilename}`" width="300"/></a>
              <br/>
            </span>
            <span v-else>
              {{ fromUnix(file.dateline) }}
              <span class="link" @click="saveFile(`/files/${file.storefilename}`, file.filename)" >{{ file.filename }}</span>
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
  data() {
    return {
      ticket: {
        swticketposts: []
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
  computed: {
    id() {
      return this.$route.params.pathMatch;
    }
  },
  methods: {
    saveFile(url, filename){
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.overrideMimeType("octet/stream");
      xhr.onload = function() {
        if (xhr.status === 200) {
          const blob = xhr.response
          const url = URL.createObjectURL(blob);

          // Create a new anchor element
          const a = document.createElement('a');

          // Set the href and download attributes for the anchor element
          // You can optionally set other attributes like `title`, etc
          // Especially, if the anchor element will be attached to the DOM
          a.href = url;
          a.download = filename || 'download';

          // Click handler that releases the object URL after the element has been clicked
          // This is required for one-off downloads of the blob content
          const clickHandler = () => {
            setTimeout(() => {
              URL.revokeObjectURL(url);
              this.removeEventListener('click', clickHandler);
            }, 150);
          };

          // Add the click event listener on the anchor element
          // Comment out this line if you don't want a one-off download of the blob content
          a.addEventListener('click', clickHandler, false);

          // Programmatically trigger a click on the anchor element
          // Useful if you want the download to happen automatically
          // Without attaching the anchor element to the DOM
          // Comment out this line if you don't want an automatic download of the blob content
          a.click();
          //window.location = (URL || webkitURL).createObjectURL(xhr.response);
        }
      };
      xhr.send();
    },
    fromUnix(timestamp) {
      return moment.unix(timestamp).format('YYYY-MM-DD HH:mm')
    },
  }
}
</script>

<style scoped lang="sass">
.link
  text-decoration: underline
  cursor: pointer
  color: #1976d2
.post
  margin-bottom: 10px
  padding: 5px
  border: 1px solid silver
</style>