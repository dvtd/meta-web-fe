<template>
  <v-app id="inspire">
    <v-card v-bind="$attrs" class="v-card--material pa-3">
      <div class="d-flex grow flex-wrap">
        <v-sheet
          :class="{
            'pa-7': !$slots.image
          }"
          :max-height="icon ? 90 : undefined"
          :width="icon ? 'auto' : '100%'"
          elevation="6"
          class="text-start v-card--material__heading mb-n6 blue darken-4"
          dark
        >
          <slot v-if="$slots.heading" name="heading" />

          <slot v-else-if="$slots.image" name="image" />

          <div
            v-else-if="title && !icon"
            class="display-1 font-weight-light"
            v-text="title"
          />

          <v-icon v-else-if="icon" size="32" v-text="icon" />
        </v-sheet>

        <div v-if="$slots['after-heading']" class="ml-6">
          <slot name="after-heading" />
        </div>

        <div v-else-if="icon && title" class="ml-4">
          <div class="card-title font-weight-light" v-text="title" />
        </div>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </div>
      <v-tabs dark background-color="blue darken-4"> </v-tabs>
      <v-card>
        <v-data-table
          :headers="headers"
          :items="Teachers"
          :search="search"
          :items-per-page="-1"
        >
          <template v-slot:item.runtimehr="{ item }">
            {{ item.runtimemin | convertMinToHour }}
          </template>
          <template v-slot:item.day="{ item }">
            {{ item.date | getDayOfTheWeek }}
          </template>
        </v-data-table>
      </v-card>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      icon: 'mdi-clipboard-text',
      title: 'SUMMARY REPORT',
      search: '',
      headers: [
        {
          text: 'Teacher',
          align: 'start',
          filterable: true,
          value: 'name'
        },
        { text: 'Class', value: 'class' },
        { text: 'Shift ', value: 'shift' },
        { text: 'Date ', value: 'date' },
        { text: 'Day ', value: 'day' },
        { text: 'Session ', value: 'session' },
        { text: 'Run time (min) ', value: 'runtimemin' },
        { text: 'Runtime (hour) ', value: 'runtimehr' },
        { text: 'OT ', value: 'ovetime' },
        { text: 'Total ', value: 'total' }
      ],
      Teachers: [
        {
          name: 'Dan',
          class: 159,
          shift: '07:30 - 16:25',
          date: '12/1/2020',
          day: 0,
          session: 6,
          runtimemin: 240,
          runtimehr: 0,
          ovetime: 0,
          total: 0
        },
        {
          name: 'Michelle',
          class: 210,
          shift: '07:30 - 16:25',
          date: '12/12/2020',
          day: 0,
          session: 6,
          runtimemin: 240,
          runtimehr: 0,
          ovetime: 0,
          total: 0
        }
      ]
    }
  },
  filters: {
    convertMinToHour: function (value) {
      return parseInt(value) / 60
    },
    getDayOfTheWeek: function (value) {
      var date = new Date(value)
      console.log(date.toString())
      console.log(date.getDay())
      switch (date.getDay()) {
        case 0:
          return 'Sunday'
        case 1:
          return 'Monday'
        case 2:
          return 'Tuesday'
        case 3:
          return 'Wednesday'
        case 4:
          return 'Thursday'
        case 5:
          return 'Friday'
        case 6:
          return 'Saturday'
        default:
          return 'Invalid Date'
      }
    }
  }
}
</script>

<style></style>
