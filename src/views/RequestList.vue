<template>
  <v-container id="regular-tables" fluid tag="section">
    <v-row>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="primary"
          icon="mdi-frequently-asked-questions"
          title=" All Request"
          :value="_getFinishedRequest ? '100' : '100'"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
          class="subCard"
        />
      </v-col>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="amber"
          icon="mdi-account-question"
          title="In-Progress"
          :value="_getTotalWaitingRequest ? '50' : '50' "
          sub-icon="mdi-clock"
          sub-text="Just Updated"
          class="subCard"
        />
      </v-col>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="success"
          icon="mdi-account-check"
          title="Accepted"
          :value="_getTotalRejectedRequest ? '30' : '30' "
          sub-icon="mdi-clock"
          sub-text="Just Updated"
          class="subCard"
        />
      </v-col>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="red"
          icon="mdi-account-cancel"
          title=" Rejected"
          :value="_getTotalInProgressRequest ? '20' :'20'"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
          class="subCard"
        />
      </v-col>
    </v-row>
    <request-grid
      icon="mdi-clipboard-text"
      title="LIST OF REQUEST"
      class="px-5 py-3"
      :headerTable="headers"
      :dataTable="_getListOfRequest"
    >
    </request-grid>

    <div class="py-3" />
  </v-container>
</template>
<script>
import RequestGrid from '@/components/RequestGrid'
import MaterialStatsCard from '@/components/MaterialStatsCard'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    'request-grid': RequestGrid,
    'base-material-stats-card': MaterialStatsCard
  },
  computed: {
    ...mapGetters('requestList', ['_getListOfRequest']),
    ...mapGetters('dashboard', [
      '_getListTotalTypeRequest',
      '_getFinishedRequest',
      '_getTotalWaitingRequest',
      '_getTotalRejectedRequest',
      '_getTotalInProgressRequest'
    ])
  },
  data () {
    return {
      headers: [
        {
          text: 'RequestID',
          align: 'start',
          sortable: false,
          value: 'requestID'
        },
        { text: 'ServiceName', value: 'serviceNm' },
        { text: 'Content', value: 'content' },
        { text: 'sendAtTime', value: 'sendAtTime' },
        { text: 'Status', value: 'status' },
        { text: 'Edit', value: 'actions', sortable: false }
      ]
    }
  },
  mounted () {
    // this._getAllRequestOfDepartment()
    // this._getAllRequestOfDepartmentDashboard()
  },
  methods: {
    ...mapActions('requestlist', ['_getAllRequestOfDepartment']),
    ...mapActions('dashboard', ['_getAllRequestOfDepartmentDashboard'])
  }
}
</script>
