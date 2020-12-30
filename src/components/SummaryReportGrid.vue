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
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="fromDate"
              label="From date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="fromDate" @input="menu1 = false"></v-date-picker>
        </v-menu>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="toDate"
              label="To date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="toDate" @input="menu2 = false"></v-date-picker>
        </v-menu>
        <v-btn class="ma-2" color="blue darken-4" dark>
          Find
          <v-icon dark right> mdi-update </v-icon>
        </v-btn>
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
          :headers-length="10"
          :items="Teachers"
          :search="search"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50]
          }"
          :items-per-page="30"
        >
          <template v-slot:[`item.present`]="{ item }">
            {{ item.session | calculatePresent(item.absent) }}
          </template>
          <template v-slot:[`item.day`]="{ item }">
            {{ item.date | getDayOfTheWeek }}
          </template>
          <template v-slot:[`item.runTimeMin`]="{ item }">
            {{ item.session | calculatePresent(item.absent) | calculateRunTimeMin }}
          </template>
          <template v-slot:[`item.runTimeHr`]="{ item }">
            {{
              item.session
                | calculatePresent(item.absent)
                | calculateRunTimeMin
                | calculateRunTimeHour
            }}
          </template>
          <!-- <template v-slot:item.isNoted="{ item }">
            <v-icon
              v-if="item.isNoted"
              small
              class="mr-2"
              @click="clickToEditRequest(item)"
              >mdi-notebook-outline</v-icon
            >
          </template> -->
          <template v-slot:item.isNoted="{ item }">
            <div v-html="item.isNoted"></div>
          </template>
        </v-data-table>
      </v-card>
    </v-card>
  </v-app>
</template>

<script>
import moment from 'moment'
export default {
  data: function () {
    return {
      icon: 'mdi-clipboard-text',
      title: 'SUMMARY REPORT',
      search: '',
      fromDate: new Date(Date.now() - 86400000 * 7).toISOString().substring(0, 10),
      toDate: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
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
        { text: 'Absent ', value: 'absent' },
        { text: 'Present ', value: 'present' },
        { text: 'Run time (min) ', value: 'runTimeMin' },
        { text: 'Runtime (hour) ', value: 'runTimeHr' },
        { text: 'OT ', value: 'ovetime' },
        { text: 'Total ', value: 'total' },
        { text: 'Note', value: 'isNoted', sortable: false }
      ],
      Teachers: [
        {
          name: 'Dan',
          class: 159,
          shift: '07:30 - 16:25',
          date: '12/1/2020',
          day: 0,
          session: 6,
          absent: 3,
          runTimeMin: 0,
          runTimeHr: 0,
          ovetime: 0,
          total: 0,
          isNoted: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa <br/>aaaaaaaaaaaaaaaaaaaaaaaaaaaa <br/>'
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
          ovetime: 0,
          total: 0
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
          ovetime: 0,
          total: 0
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
          ovetime: 0,
          total: 0
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
          ovetime: 0,
          total: 0
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
          ovetime: 0,
          total: 0
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
          ovetime: 0,
          total: 0
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
          ovetime: 0,
          total: 0
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
          ovetime: 0,
          total: 0
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
          ovetime: 0,
          total: 0
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
          ovetime: 0,
          total: 0
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
          ovetime: 0,
          total: 0
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
          ovetime: 0,
          total: 0
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
          ovetime: 0,
          total: 0
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
          ovetime: 0,
          total: 0
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
          ovetime: 0,
          total: 0
        }
      ]
    }
  },
  filters: {
    calculatePresent: function (session, absent) {
      return session - absent
    },
    calculateRunTimeMin: function (value) {
      return parseInt(value) * 40
    },
    calculateRunTimeHour: function (value) {
      return parseFloat(parseInt(value) / 60).toFixed(2)
    },
    formatDatetime: function (value) {
      return moment(value).format('DD/MM/YYYY')
    },
    getDayOfTheWeek: function (value) {
      var date = new Date(value)
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
<style lang="scss" scoped></style>
