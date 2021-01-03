<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="sessions"
          :event-color="getEventColor"
          :type="type"
          :weekdays="weekday"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              Class:
              <span v-html="selectedEvent.class"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day'
    },
    weekday: [1, 2, 3, 4, 5, 6, 0],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    sessions: [
      {
        name: 'Admin',
        start: '2021-1-4 7:00',
        end: '2021-1-4 12:00',
        class: '',
        color: 'blue'
      },
      {
        name: 'TQTP3',
        start: '2021-1-5 8:15',
        end: '2021-1-5 8:55',
        class: 'CL 3.1',
        color: 'blue'
      },
      {
        name: 'TQTP3',
        start: '2021-1-5 9:30',
        end: '2021-1-5 10:10',
        class: 'CL 2.5',
        color: 'blue'
      },
      {
        name: 'TQTP3',
        start: '2021-1-5 10:15',
        end: '2021-1-5 10:55',
        class: 'CL 2.4',
        color: 'blue'
      },
      {
        name: 'TQTP3',
        start: '2021-1-5 13:40',
        end: '2021-1-5 14:20',
        class: 'CL 3.4',
        color: 'blue'
      },
      {
        name: 'TQTP3',
        start: '2021-1-5 15:00',
        end: '2021-1-5 15:40',
        class: 'CL 3.5',
        color: 'blue'
      },
      {
        name: 'TQTP3',
        start: '2021-1-5 15:40',
        end: '2021-1-5 16:20',
        class: 'CL 3.6',
        color: 'blue'
      },
      {
        name: 'NAT',
        start: '2021-1-6 9:45',
        end: '2021-1-6 10:30',
        class: 'CL 7.1',
        color: 'blue'
      },
      {
        name: 'NAT',
        start: '2021-1-6 10:30',
        end: '2021-1-6 11:15',
        class: 'CL 7.2',
        color: 'blue'
      },
      {
        name: 'NAT',
        start: '2021-1-6 12:30',
        end: '2021-1-6 13:15',
        class: 'CL 7.4',
        color: 'blue'
      },
      {
        name: 'NAT',
        start: '2021-1-6 13:15',
        end: '2021-1-6 14:00',
        class: 'CL 7.3',
        color: 'blue'
      },
      {
        name: 'NAT',
        start: '2021-1-6 14:00',
        end: '2021-1-6 14:45',
        class: 'CL 9.1',
        color: 'blue'
      },
      {
        name: 'NAT',
        start: '2021-1-6 15:15',
        end: '2021-1-6 16:00',
        class: 'CL 7.6',
        color: 'blue'
      },
      {
        name: 'NAT',
        start: '2021-1-6 16:00',
        end: '2021-1-6 16:45',
        class: 'CL 7.5',
        color: 'blue'
      },
      {
        name: 'PCT',
        start: '2021-1-7 10:10',
        end: '2021-1-7 11:30',
        class: 'CL 5.9',
        color: 'blue'
      },
      {
        name: 'Admin',
        start: '2021-1-7 12:00',
        end: '2021-1-7 17:30',
        class: '',
        color: 'blue'
      },
      {
        name: 'Admin',
        start: '2021-1-8 7:00',
        end: '2021-1-8 12:00',
        class: '',
        color: 'blue'
      },
      {
        name: 'Admin',
        start: '2021-1-8 12:00',
        end: '2021-1-8 17:30',
        class: '',
        color: 'blue'
      },
      {
        name: 'NAN',
        start: '2021-1-9 6:45',
        end: '2021-1-9 8:20',
        class: 'CL 10A10',
        color: 'blue'
      },
      {
        name: 'NAN',
        start: '2021-1-9 8:40',
        end: '2021-1-9 10:15',
        class: 'CL 10A11',
        color: 'blue'
      }

    ]
  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay
        })
      }

      this.events = events
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    }
  }
}
</script>
