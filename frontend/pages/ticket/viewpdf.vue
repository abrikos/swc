<template>
<div>
  <div @click="generatePDF()" class="np-btn">Generate PDF</div>
  <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="100400"
      :filename="`ticket-${$route.params.pathMatch}`"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      :pdf-margin="10"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      @progress="onProgress($event)"
      ref="html2Pdf"
  >
      <TicketView slot="pdf-content"/>
  </vue-html2pdf>
  <TicketView/>
</div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
import TicketView from "~/components/TicketView";
export default {
  name: "viewpdf",
  layout: 'pdf',
  components: {TicketView, VueHtml2pdf},
  methods: {
    onProgress(event) {
      console.log(`Processed: ${event} / 100`);
    },
    hasGenerated() {
      alert("PDF generated successfully!");
    },
    generatePDF() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
}
</script>

<style scoped>

</style>