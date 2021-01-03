<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <div class="text-center">
          <v-btn
            width="100px"
            medium
            color="#262261"
            class="mr-2 yellow--text"
          >
            <v-icon left>
              mdi-file-plus
            </v-icon>
            New
          </v-btn>
          <v-btn
            width="100px"
            medium
            color="#262261"
            class="mr-2 yellow--text"
          >
            <v-icon left>
              mdi-file-export
            </v-icon>
            Export
          </v-btn>
        </div>
        <v-form>
          <v-select
            v-model="selectedyear"
            :items="years"
            label="Year"
          ></v-select>
          <v-select
            v-model="selectedweek"
            :items="weeks"
            label="Week"
          ></v-select>
          <div class="text-center">
            <v-btn
              dark
              color="#262261"
              class="mr-2 yellow--text"
            >
              Search
            </v-btn>
          </div>
        </v-form>
      </v-col>
      <v-col cols="9">
        <b-table-simple bordered caption-top responsive fixed hover>
          <caption class="text-center">
            <h2>Admin Time at MAJOR 11/11 - 17/11</h2>
          </caption>
          <colgroup><col><col></colgroup>
          <colgroup><col><col><col></colgroup>
          <colgroup><col><col></colgroup>
          <b-thead>
            <b-tr>
              <b-th></b-th>
              <b-th class="text-center">Monday</b-th>
              <b-th class="text-center">Tuesday</b-th>
              <b-th class="text-center">Wednesday</b-th>
              <b-th class="text-center">Thursday</b-th>
              <b-th class="text-center">Friday</b-th>
              <b-th class="text-center">Saturday</b-th>
              <b-th class="text-center">Sunday</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(item, index) in teachers"
                    :key="item.monday"
            >
              <b-th v-if="index == 0" :rowspan="teachers.length">Morning</b-th>
              <b-td class="text-center" @click="clickToTimetableDetails">{{ item.monday }}</b-td>
              <b-td class="text-center" @click="clickToTimetableDetails">{{ item.tuesday }}</b-td>
              <b-td class="text-center" @click="clickToTimetableDetails">{{ item.wednesday }}</b-td>
              <b-td class="text-center" @click="clickToTimetableDetails">{{ item.thursday }}</b-td>
              <b-td class="text-center" @click="clickToTimetableDetails">{{ item.friday }}</b-td>
              <b-td class="text-center" @click="clickToTimetableDetails">{{ item.saturday }}</b-td>
              <b-td class="text-center" @click="clickToTimetableDetails">{{ item.sunday }}</b-td>
            </b-tr>
          </b-tbody>
          <b-thead>
            <b-tr>
              <b-th></b-th>
              <b-th class="text-center">Monday</b-th>
              <b-th class="text-center">Tuesday</b-th>
              <b-th class="text-center">Wednesday</b-th>
              <b-th class="text-center">Thursday</b-th>
              <b-th class="text-center">Friday</b-th>
              <b-th class="text-center">Saturday</b-th>
              <b-th class="text-center">Sunday</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
          <b-tr v-for="(item, index) in teachers"
                  :key="item.monday"
          >
            <b-th v-if="index == 0" :rowspan="teachers.length">Afternoon</b-th>
            <b-td class="text-center" @click="clickToTimetableDetails">{{ item.monday }}</b-td>
            <b-td class="text-center" @click="clickToTimetableDetails">{{ item.tuesday }}</b-td>
            <b-td class="text-center" @click="clickToTimetableDetails">{{ item.wednesday }}</b-td>
            <b-td class="text-center" @click="clickToTimetableDetails">{{ item.thursday }}</b-td>
            <b-td class="text-center" @click="clickToTimetableDetails">{{ item.friday }}</b-td>
            <b-td class="text-center" @click="clickToTimetableDetails">{{ item.saturday }}</b-td>
            <b-td class="text-center" @click="clickToTimetableDetails">{{ item.sunday }}</b-td>
          </b-tr>
          </b-tbody>
        </b-table-simple>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      years: ['2020', '2021', '2022', '2023', '2024', '2025'],
      weeks: [],
      selectedyear: '',
      selectedweek: '',
      teachers: [
        {
          monday: 'ANNA',
          tuesday: 'CERRIN',
          wednesday: 'BON',
          thursday: 'CODY',
          friday: 'ADAM',
          saturday: 'ADAM',
          sunday: ''
        },
        {
          monday: 'ADRIAN',
          tuesday: 'COURTNEY',
          wednesday: 'CONOR',
          thursday: 'CHLOE',
          friday: 'ANNA',
          saturday: 'ARI',
          sunday: ''
        },
        {
          monday: 'ARI',
          tuesday: 'DYLAN',
          wednesday: 'GREGG',
          thursday: 'DYLAN',
          friday: 'BRETT',
          saturday: 'BYRON',
          sunday: ''
        },
        {
          monday: 'ALANNAH',
          tuesday: 'GREGG',
          wednesday: 'INDIA',
          thursday: 'HUGO',
          friday: 'CARLI',
          saturday: 'CARLI',
          sunday: ''
        },
        {
          monday: 'BYRON',
          tuesday: 'INDIA',
          wednesday: 'JARED',
          thursday: 'HOPE',
          friday: 'CERRIN',
          saturday: 'GEORGE',
          sunday: ''
        },
        {
          monday: 'CARLI',
          tuesday: 'JEREMY',
          wednesday: 'JOSHY',
          thursday: 'JEREMY',
          friday: 'CHLOE',
          saturday: 'HOPE',
          sunday: ''
        },
        {
          monday: 'CERRIN',
          tuesday: 'KILLIAN',
          wednesday: 'JEREMY',
          thursday: 'KILLIAN',
          friday: 'CHELCIE',
          saturday: 'JEREMY',
          sunday: ''
        },
        {
          monday: 'COURTNEY',
          tuesday: 'LUKE',
          wednesday: 'JOE',
          thursday: 'KYE',
          friday: 'DALMAIN',
          saturday: 'JESSICA',
          sunday: ''
        },
        {
          monday: 'CONRAD',
          tuesday: 'LARRIE',
          wednesday: 'KILLIAN',
          thursday: 'LUKE',
          friday: 'DYLAN',
          saturday: 'JORDAN D',
          sunday: ''
        },
        {
          monday: 'CHELCIE',
          tuesday: 'LLOYD R',
          wednesday: 'LARRIE',
          thursday: 'LILLY',
          friday: 'GREGG',
          saturday: 'KATIE',
          sunday: ''
        },
        {
          monday: 'DALMAIN',
          tuesday: 'MEGAN',
          wednesday: 'INDIA',
          thursday: 'MEGAN',
          friday: 'INDIA',
          saturday: 'LUKE',
          sunday: ''
        },
        {
          monday: 'GEORGE',
          tuesday: 'MURRAY',
          wednesday: 'ROGAN',
          thursday: 'PHOEBE',
          friday: 'JOSHY',
          saturday: 'LARRIE',
          sunday: ''
        }
      ]
    }
  },
  methods: {
    clickToTimetableDetails () {
      console.log('abcde')
    }
  }
}
</script>

<style scoped>
  thead {
    background-color: #262261;
    color: #f1c40f;
  }
  table.table-bordered > thead > tr > th {
    border:0.5px solid black;
  }
  table.table-bordered > tbody > tr > td {
    border:0.5px solid black;
  }
    table.table-bordered > tbody > tr > th {
    border:0.5px solid black;
  }
  .table.table-hover.table-bordered tr:hover {
    background:none;
  }
  td:hover {
  background: lightgray;
  cursor: pointer;
}
</style>
