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
          color="amber"
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
          color="success"
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
      { text: 'LocationId', value: 'LocationId' },
      { text: 'ContractInfo', value: 'ContractInfo' },
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
        LocationId: 21,
        ContractInfo: 'arassell0@nbcnews.com',
        IsDeleted: true
      },
      {
        Id: 55,
        Name: 'Riannon Eginton',
        Representative: 'Lotte Edes',
        LocationId: 71,
        ContractInfo: 'ledes1@cargocollective.com',
        IsDeleted: false
      },
      {
        Id: 84,
        Name: 'Bernardina Farres',
        Representative: 'Terrill Wegener',
        LocationId: 63,
        ContractInfo: 'twegener2@blogspot.com',
        IsDeleted: false
      },
      {
        Id: 38,
        Name: 'Chic Colebrook',
        Representative: 'Pierette Cuff',
        LocationId: 71,
        ContractInfo: 'pcuff3@amazon.com',
        IsDeleted: true
      },
      {
        Id: 100,
        Name: 'Elyn Challiner',
        Representative: 'Paolo Ziemecki',
        LocationId: 96,
        ContractInfo: 'pziemecki4@nbcnews.com',
        IsDeleted: true
      },
      {
        Id: 100,
        Name: 'Elyn Challiner',
        Representative: 'Paolo Ziemecki',
        LocationId: 96,
        ContractInfo: 'pziemecki4@nbcnews.com',
        IsDeleted: true
      },
      {
        Id: 100,
        Name: 'Elyn Challiner',
        Representative: 'Paolo Ziemecki',
        LocationId: 96,
        ContractInfo: 'pziemecki4@nbcnews.com',
        IsDeleted: true
      },
      {
        Id: 100,
        Name: 'Elyn Challiner',
        Representative: 'Paolo Ziemecki',
        LocationId: 96,
        ContractInfo: 'pziemecki4@nbcnews.com',
        IsDeleted: true
      },
      {
        Id: 100,
        Name: 'Elyn Challiner',
        Representative: 'Paolo Ziemecki',
        LocationId: 96,
        ContractInfo: 'pziemecki4@nbcnews.com',
        IsDeleted: true
      }]
    }
  }
}
</script>
