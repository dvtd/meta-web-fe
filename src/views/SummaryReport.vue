<template>
  <v-container id="regular-tables" fluid tag="section">
    <summary-report-grid></summary-report-grid>
  </v-container>
</template>

<script>
import SummaryReportGrid from '@/components/SummaryReportGrid'
export default {
  components: {
    'summary-report-grid': SummaryReportGrid
  }
}
</script>

<style></style>
