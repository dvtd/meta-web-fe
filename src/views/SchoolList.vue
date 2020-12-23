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
    <v-card v-bind="$attrs" :class="classes" class="v-card--material pa-3">
      <div class="d-flex grow flex-wrap">
        <v-toolbar-title>Schools Management</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
        ></v-text-field>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="success"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="white" x-large>mdi-account-multiple-plus-outline</v-icon>
              School
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Id"
                      label="Id"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Representative"
                      label="Representative"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.LocationId"
                      label="LocationId"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.ContractInfo"
                      label="ContractInfo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.IsDeleted"
                      label="IsDeleted"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-card>
        <v-tabs
          v-model="tab"
          :background-color="colorTable"
          dark
          icons-and-text
          @change="changeTab()"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab v-for="i in tabs" :key="i.title" :href="`#tab-${i.title}`">
            {{ i.title }}
          </v-tab>
          <v-tab-item v-for="i in tabs" :key="i.title" :value="'tab-' + i.title">
            <v-card flat>
              <v-data-table
                :headers="headers"
                :items="schools"
                sort-by="calories"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar
                    flat
                  >

                    <v-dialog v-model="dialogDelete" max-width="500px">
                      <v-card>
                        <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <template v-slot:no-data>
                  <v-btn
                    color="primary"
                    @click="initialize"
                  >
                    Reset
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-card>
  </v-container>
</template>
<script>

import MaterialStatsCard from '../components/MaterialStatsCard'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'base-material-stats-card': MaterialStatsCard
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
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
    schools: [],
    editedIndex: -1,
    editedItem: {
      ContractInfo: '',
      Id: 0,
      IsDeleted: false,
      LocationId: 0,
      Name: '',
      Representative: ''
    },
    defaultItem: {
      ContractInfo: '',
      Id: 0,
      IsDeleted: false,
      LocationId: 0,
      Name: '',
      Representative: ''
    },
    tab: 'All',
    tabs: [
      {
        title: 'All'
      },
      {
        title: 'Primary school'
      },
      {
        title: 'Secondary school'
      },
      {
        title: 'High school'
      }
    ]
  }),

  mounted () {
    this._getAllSchools()
  },

  computed: {
    ...mapGetters('schoolList', ['_getListOfSchool']),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
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
    },

    editItem (item) {
      this.editedIndex = this.schools.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.schools.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.schools.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.schools[this.editedIndex], this.editedItem)
      } else {
        this.schools.push(this.editedItem)
      }
      this.close()
    },

    changeTab () {
      var x = this.tab.split('tab-')[1]
      this.colorTable = this.getColor(x)
      switch (this.tab.split('tab-')[1]) {
        case 'All': {
          this._getAllSchools()
          break
        }
        case 'Primary school': {
          this._getAllSchools('Primary school')
          break
        }
        case 'Secondary school': {
          this._getAllSchools('Secondary school')
          break
        }
        case 'High school': {
          this._getAllSchools('High school')
          break
        }
      }
    },

    getColor (status) {
      if (status === 'Primary school') return 'success'
      else if (status === 'Secondary school') return 'amber'
      else if (status === 'High school') return 'red'
      else return 'primary'
    }

  }
}
</script>
