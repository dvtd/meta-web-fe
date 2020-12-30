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
    <v-data-table
      :headers="headers"
      :items="_listOfStaff"
      :search="search"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Staff</v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="amber" dark class="mb-2" v-bind="attrs" v-on="on">
                New Staff
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.username"
                      label="User Name"
                      :rules="StaffNameRules"
                      :counter="100"
                      clearable
                      required
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.fullName"
                      label="Staff Name"
                      :rules="StaffFullNameRules"
                      :counter="100"
                      clearable
                      required
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.email"
                      label="Staff Email"
                      :rules="emailRules"
                      :counter="450"
                      required
                      clearable
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.phoneNumber"
                      label="Phone Number"
                      :rules="phoneNumberRules"
                      clearable
                      required
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.address"
                      label="Address"
                      :rules="addressRules"
                      :counter="450"
                      clearable
                    />
                  </v-row>
                  <v-row>
                    <v-select
                      v-model="select"
                      hint="Choose role for staff"
                      :items="_listOfRole"
                      item-text="roleName"
                      item-value="id"
                      label="Role"
                      persistent-hint
                      @change="changeRole"
                    ></v-select>
                  </v-row>
                  <v-row>
                    <div class="text-center">
                    <v-chip class="ma-2" color="blue darken-4" outlined pill>
                      Permissions
                      <v-icon right>
                        mdi-checkbox-marked-circle
                      </v-icon>
                    </v-chip>
                    </div>
                  </v-row>
                  <v-row>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)" v-if="!item.isDeleted">
          mdi-delete
        </v-icon>
        <v-icon small @click="reviveItem(item)" v-if="item.isDeleted">
          mdi-clipboard-plus
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import MaterialStatsCard from '@/components/MaterialStatsCard'
export default {
  components: {
    'base-material-stats-card': MaterialStatsCard
  },
  data () {
    var regex = /(09|01[2|6|8|9])+([0-9]{8})\b/g
    return {
      search: '',
      dialog: false,
      StaffNameRules: [
        v => !!v || 'Staff name is required',
        v =>
          (v && v.length < 100) || 'Staff name must be less than 100 characters'
      ],
      StaffFullNameRules: [
        v => !!v || 'Staff Full name is required',
        v =>
          (v && v.length < 100) || 'Staff name must be less than 100 characters'
      ],
      phoneNumberRules: [
        v => (v && v.match(regex)) || 'Phone Number must be format phone number'
      ],
      addressRules: [
        v => (v && v.length < 450) || 'Address must be less than 450 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => (v && v.length < 450) || 'Email must be less than 450 characters',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
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
      editedIndex: -1,
      editedItem: {
        id: '',
        username: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        address: ''
      },
      defaultItem: {
        id: '',
        username: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        address: ''
      },
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
    ...mapState('departmentList', ['_listOfDepartment']),
    ...mapState('staffList', ['_listOfStaff']),
    formTitle () {
      return this.editedIndex === -1 ? 'New Staff' : 'Edit Staff'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  mounted () {
    this._getAllStaff()
  },

  methods: {
    ...mapActions('staffList', [
      '_getAllStaff',
      '_addStaff',
      '_updateStaff',
      '_deleteStaff'
    ]),
    ...mapActions('departmentList', ['_getAllDepartment']),

    changeDepartment (item) {
      this.editedItem.departments = item
    },
    editItem (item) {
      this.select = item.departments
      this.editedIndex = this._listOfStaff.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem (item) {
      confirm('Are you sure you want to delete this Staff?') &&
        (await this._deleteStaff(item))
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async reviveItem (item) {
      item.isDeleted = !item.isDeleted
      confirm('Are you sure you want to reivive this Staff?') &&
        (await this._updateStaff(item))
    },
    async save () {
      if (this.editedIndex > -1) {
        await this._updateStaff(this.editedItem)
      } else {
        await this._addStaff(this.editedItem)
      }
      await this._getAllStaff()
      this.close()
    }
  }
}
</script>
