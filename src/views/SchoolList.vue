<template>
  <v-container id="regular-tables" fluid tag="section">
    <v-row>
      <v-col cols="12" md="3">
        <base-material-stats-card
          color="#262261"
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
      { text: 'SchoolName', value: 'SchoolName' },
      { text: 'Locations', value: 'Locations' },
      { text: 'SchoolLevel', value: 'SchoolLevel' },
      { text: 'Email', value: 'Email' },
      { text: 'PhoneNumber', value: 'PhoneNumber' },
      { text: 'IsDeactivated', value: 'IsDeleted' },
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
      this.schools = [{ SchoolId: { $oid: '5ff1ce0ffc13ae4956000000' }, SchoolName: 'Babette Birkwood', Locations: '01112 Rowland Avenue', SchoolLevel: 'Primary', Email: 'bbirkwood0@deviantart.com', PhoneNumber: '517-544-8178', IsDeleted: true },
        { SchoolId: { $oid: '5ff1ce0ffc13ae4956000001' }, SchoolName: 'Raddy Turmell', Locations: '504 Kingsford Court', SchoolLevel: 'Primary', Email: 'rturmell1@multiply.com', PhoneNumber: '762-813-5339', IsDeleted: false },
        { SchoolId: { $oid: '5ff1ce0ffc13ae4956000002' }, SchoolName: 'Ty Atter', Locations: '4 Buena Vista Drive', SchoolLevel: 'Primary', Email: 'tatter2@epa.gov', PhoneNumber: '506-493-3995', IsDeleted: false },
        { SchoolId: { $oid: '5ff1ce0ffc13ae4956000003' }, SchoolName: 'Marni Hazley', Locations: '42389 Park Meadow Pass', SchoolLevel: 'Primary', Email: 'mhazley3@hud.gov', PhoneNumber: '360-330-3728', IsDeleted: false },
        { SchoolId: { $oid: '5ff1ce0ffc13ae4956000004' }, SchoolName: 'Vitia Storrie', Locations: '4 Tennyson Hill', SchoolLevel: 'Primary', Email: 'vstorrie4@ameblo.jp', PhoneNumber: '715-982-3345', IsDeleted: true },
        { SchoolId: { $oid: '5ff1ce0ffc13ae4956000005' }, SchoolName: 'Adams Baughn', Locations: '3496 Algoma Park', SchoolLevel: 'Secondary', Email: 'abaughn5@4shared.com', PhoneNumber: '640-221-8089', IsDeleted: true },
        { SchoolId: { $oid: '5ff1ce0ffc13ae4956000006' }, SchoolName: 'Alvy Dallon', Locations: '420 Cardinal Junction', SchoolLevel: 'Secondary', Email: 'adallon6@goodreads.com', PhoneNumber: '392-633-5150', IsDeleted: true },
        { SchoolId: { $oid: '5ff1ce0ffc13ae4956000007' }, SchoolName: 'Uta Verchambre', Locations: '532 American Ash Plaza', SchoolLevel: 'Secondary', Email: 'uverchambre7@skyrock.com', PhoneNumber: '356-191-7428', IsDeleted: false },
        { SchoolId: { $oid: '5ff1ce0ffc13ae4956000008' }, SchoolName: 'Simone Rourke', Locations: '64238 Merry Place', SchoolLevel: 'High', Email: 'srourke8@wired.com', PhoneNumber: '678-972-7891', IsDeleted: true },
        { SchoolId: { $oid: '5ff1ce0ffc13ae4956000009' }, SchoolName: 'Murielle Blackborn', Locations: '844 Oxford Lane', SchoolLevel: 'High', Email: 'mblackborn9@usatoday.com', PhoneNumber: '918-435-4496', IsDeleted: false }]
    }
  }
}
</script>
