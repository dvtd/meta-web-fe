<template>
  <v-container id="regular-tables" fluid tag="section">
    <v-row>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="blue darken-4"
          icon="mdi-calendar-clock"
          title=" Total Session"
          :value="10 ? '100' : '100'"
        />
      </v-col>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="blue accent-3"
          icon="mdi-timer"
          title="Run time (min)"
          :value="10 ? '50' : '50'"
        />
      </v-col>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="blue accent-2"
          icon="mdi-clock-time-nine"
          title="Run Time (hr)"
          :value="10 ? '30' : '30'"
        />
      </v-col>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="amber"
          icon="mdi-account-alert"
          title=" Absent"
          :value="10 ? '20' : '20'"
        />
      </v-col>
    </v-row>
    <summary-report-grid
      :headerTable="headers"
      :dataTable="Teachers"
    ></summary-report-grid>
  </v-container>
</template>

<script>
import SummaryReportGrid from '@/components/SummaryReportGrid'
import MaterialStatsCard from '@/components/MaterialStatsCard'
export default {
  components: {
    'summary-report-grid': SummaryReportGrid,
    'base-material-stats-card': MaterialStatsCard
  },
  data: function () {
    return {
      headers: [
        {
          text: 'Teacher',
          align: 'start',
          filterable: true,
          value: 'name'
        },
        { text: 'Class', value: 'class', width: 85 },
        { text: 'Shift ', value: 'shift', width: 125 },
        { text: 'Date ', value: 'date' },
        { text: 'Day ', value: 'day' },
        { text: 'Session ', value: 'session' },
        { text: 'Absent ', value: 'absent' },
        { text: 'Present ', value: 'present' },
        { text: 'Run time (min) ', value: 'runTimeMin' },
        { text: 'Runtime (hour) ', value: 'runTimeHr' },
        { text: 'OT ', value: 'ovetime' },
        { text: 'Note', value: 'note', width: 400, sortable: false }
      ],
      Teachers: [
        {
          name: 'Dan',
          class: '15A9',
          shift: '07:30 - 16:25',
          date: '12/1/2020',
          day: 0,
          session: 6,
          absent: 3,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0,
          note:
            'off in the morning, cancel 4 periods, off in the morning, cancel 4 periods'
        },
        {
          name: 'Michelle',
          class: 210,
          shift: '07:30 - 16:25',
          date: '12/1/2020',
          day: 0,
          session: 7,
          absent: 2,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        },
        {
          name: 'Dan',
          class: 159,
          shift: '07:30 - 16:25',
          date: '12/2/2020',
          day: 0,
          session: 6,
          absent: 1,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        },
        {
          name: 'Michelle',
          class: 210,
          shift: '07:30 - 16:25',
          date: '12/2/2020',
          day: 0,
          session: 7,
          absent: 0,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        },
        {
          name: 'Dan',
          class: 159,
          shift: '07:30 - 16:25',
          date: '12/3/2020',
          day: 0,
          session: 6,
          absent: 0,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        },
        {
          name: 'Michelle',
          class: 210,
          shift: '07:30 - 16:25',
          date: '12/3/2020',
          day: 0,
          session: 7,
          absent: 0,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        },
        {
          name: 'Dan',
          class: 159,
          shift: '07:30 - 16:25',
          date: '12/4/2020',
          day: 0,
          session: 6,
          absent: 0,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        },
        {
          name: 'Michelle',
          class: 210,
          shift: '07:30 - 16:25',
          date: '12/4/2020',
          day: 0,
          session: 7,
          absent: 0,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        },
        {
          name: 'Dan',
          class: 159,
          shift: '07:30 - 16:25',
          date: '12/7/2020',
          day: 0,
          session: 6,
          absent: 0,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        },
        {
          name: 'Michelle',
          class: 210,
          shift: '07:30 - 16:25',
          date: '12/7/2020',
          day: 0,
          session: 7,
          absent: 0,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        },
        {
          name: 'Dan',
          class: 159,
          shift: '07:30 - 16:25',
          date: '12/8/2020',
          day: 0,
          session: 6,
          absent: 0,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        },
        {
          name: 'Michelle',
          class: 210,
          shift: '07:30 - 16:25',
          date: '12/8/2020',
          day: 0,
          session: 7,
          absent: 0,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        },
        {
          name: 'Dan',
          class: 159,
          shift: '07:30 - 16:25',
          date: '12/9/2020',
          day: 0,
          session: 6,
          absent: 0,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        },
        {
          name: 'Michelle',
          class: 210,
          shift: '07:30 - 16:25',
          date: '12/9/2020',
          day: 0,
          session: 7,
          absent: 0,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        },
        {
          name: 'Dan',
          class: 159,
          shift: '07:30 - 16:25',
          date: '12/10/2020',
          day: 0,
          session: 6,
          absent: 0,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        },
        {
          name: 'Michelle',
          class: 210,
          shift: '07:30 - 16:25',
          date: '12/10/2020',
          day: 0,
          session: 7,
          absent: 0,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0
        }
      ]
    }
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
