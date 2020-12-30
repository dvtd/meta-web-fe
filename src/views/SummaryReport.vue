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

<style>
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 0.85rem;
}
</style>
