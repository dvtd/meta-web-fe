<template>
  <v-container id="regular-tables" fluid tag="section">
    <v-row>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="blue darken-4"
          icon="mdi-frequently-asked-questions"
          title=" All Staff"
          value="100"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
          class="subCard"
        />
      </v-col>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="amber"
          icon="mdi-account-question"
          title="AC"
          value="50"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
          class="subCard"
        />
      </v-col>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="success"
          icon="mdi-account-check"
          title="AM"
          value="30"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
          class="subCard"
        />
      </v-col>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="red"
          icon="mdi-account-cancel"
          title="Teacher"
          value="20"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
          class="subCard"
        />
      </v-col>
    </v-row>
    <meta-staff-grid
      :icon="iconTable"
      title="LIST OF STAFF"
      class="px-5 py-3"
      :headerTable="headers"
      :dataTable="_getListOfStaff"
      :staffGrid=true
      :tabTitle="tabs"
      :colorGrid="colorTabs"
    >
    </meta-staff-grid>
    <div class="py-3" />
  </v-container>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import DataGrid from '@/components/DataGrid'
import MaterialStatsCard from '@/components/MaterialStatsCard'
export default {
  components: {
    'base-material-stats-card': MaterialStatsCard,
    'meta-staff-grid': DataGrid
  },
  data () {
    return {
      tabs: [
        {
          title: 'All'
        },
        {
          title: 'AC'
        },
        {
          title: 'AM'
        },
        {
          title: 'Teacher'
        }
      ],
      colorTabs: ['blue darken-4', 'amber', 'success', 'red'],
      iconTable: [
        'mdi-frequently-asked-questions',
        'mdi-account-question',
        'mdi-account-check',
        'mdi-account-cancel'
      ],
      headers: [
        {
          text: 'User Name',
          value: 'username',
          sortable: false,
          aligh: 'start'
        },
        { text: 'Staff Name', value: 'fullName' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phoneNumber' },
        { text: 'Adrress', value: 'address' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      select: [],
      items: [
        { state: 'Florida', abbr: 'FL' },
        { state: 'Georgia', abbr: 'GA' },
        { state: 'Nebraska', abbr: 'NE' },
        { state: 'California', abbr: 'CA' },
        { state: 'New York', abbr: 'NY' }
      ]
    }
  },

  computed: {
    ...mapGetters('staffList', ['_getListOfStaff']),
    ...mapState('staffList', ['_listOfStaff'])
  },

  // watch: {
  //   dialog (val) {
  //     val || this.close()
  //   }
  // },
  mounted () {
  },

  methods: {
    ...mapActions('departmentList', ['_getAllDepartment'])
  }
}
</script>
