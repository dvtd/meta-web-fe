<template>
  <v-container id="regular-tables" fluid tag="section">
    <v-row>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="primary"
          icon="mdi-select-all"
          title=" All Schools"
          :value="_getFinishedRequest"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
          class="subCard"
        />
      </v-col>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="success"
          icon="mdi-school"
          title="Primary School"
          :value="_getTotalWaitingRequest"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
          class="subCard"
        />
      </v-col>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="amber"
          icon="mdi-school"
          title="Secondary school"
          :value="_getTotalRejectedRequest"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
          class="subCard"
        />
      </v-col>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="red"
          icon="mdi-school"
          title=" High school"
          :value="_getTotalInProgressRequest"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
          class="subCard"
        />
      </v-col>
    </v-row>
    <school-grid :headerData="headers" :tableData="schools"></school-grid>
  </v-container>
</template>
<script>

import MaterialStatsCard from '../components/MaterialStatsCard'
import { mapActions, mapGetters } from 'vuex'
import SchoolGrid from '../components/school/SchoolGrid'

export default {
  components: {
    'school-grid': SchoolGrid,
    'base-material-stats-card': MaterialStatsCard
  },
  data: () => ({
    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'Id'
      },
      { text: 'Name', value: 'Name' },
      { text: 'Representative', value: 'Representative' },
      { text: 'Location', value: 'Location' },
      { text: 'ContactInfo', value: 'ContactInfo' },
      { text: 'IsDeleted', value: 'IsDeleted' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    schools: []
  }),

  mounted () {
    this._getAllSchools()
  },

  computed: {
    ...mapGetters('schoolList', ['_getListOfSchool'])
  },

  created () {
    this.initialize()
  },

  methods: {
    ...mapActions('schoolList', ['_getAllSchools']),
    initialize () {
      this.schools = [{
        Id: 92,
        Name: 'Alli Benka',
        Representative: 'Atlante Rassell',
        Location: 'Address 1',
        ContactInfo: 'arassell0@nbcnews.com',
        IsDeleted: true
      },
      {
        Id: 55,
        Name: 'Riannon Eginton',
        Representative: 'Lotte Edes',
        Location: 'Address 2',
        ContactInfo: 'ledes1@cargocollective.com',
        IsDeleted: false
      },
      {
        Id: 84,
        Name: 'Bernardina Farres',
        Representative: 'Terrill Wegener',
        Location: 'Address 3',
        ContactInfo: 'twegener2@blogspot.com',
        IsDeleted: false
      },
      {
        Id: 38,
        Name: 'Chic Colebrook',
        Representative: 'Pierette Cuff',
        Location: 'Address 4',
        ContactInfo: 'pcuff3@amazon.com',
        IsDeleted: true
      },
      {
        Id: 100,
        Name: 'Elyn Challiner',
        Representative: 'Paolo Ziemecki',
        Location: 'Address 5',
        ContactInfo: 'pziemecki4@nbcnews.com',
        IsDeleted: true
      },
      {
        Id: 100,
        Name: 'Elyn Challiner',
        Representative: 'Paolo Ziemecki',
        Location: 'Address 6',
        ContactInfo: 'pziemecki4@nbcnews.com',
        IsDeleted: true
      },
      {
        Id: 100,
        Name: 'Elyn Challiner',
        Representative: 'Paolo Ziemecki',
        Location: 'Address 7',
        ContactInfo: 'pziemecki4@nbcnews.com',
        IsDeleted: true
      },
      {
        Id: 100,
        Name: 'Elyn Challiner',
        Representative: 'Paolo Ziemecki',
        Location: 'Address 8',
        ContactInfo: 'pziemecki4@nbcnews.com',
        IsDeleted: true
      },
      {
        Id: 100,
        Name: 'Elyn Challiner',
        Representative: 'Paolo Ziemecki',
        Location: 'Address 9',
        ContactInfo: 'pziemecki4@nbcnews.com',
        IsDeleted: true
      }]
    }
  }
}
</script>
