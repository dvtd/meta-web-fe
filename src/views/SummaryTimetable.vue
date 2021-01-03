<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <timetable></timetable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SummaryTimetableGrid from '@/components/SummaryTimetableGrid'

export default {
  components: {
    timetable: SummaryTimetableGrid
  },
  data: () => ({

  })
}
</script>
<style scoped>

</style>
