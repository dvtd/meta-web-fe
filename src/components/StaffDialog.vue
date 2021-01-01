<template>
  <v-dialog v-model="isStaffDialog" max-width="500px" @click:outside="close">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="blue darken-4" dark class="mb-2" v-bind="attrs" v-on="on">
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
              chips
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
          <v-row v-if="select!= 'Unassigned Teacher'">
            <v-col
              cols="12"
              sm="6"
              md="6"
              v-for="item in isStaff ? listPermissionForStaff : listPermissionForTeacher"
              :key="item"
            >
              <v-checkbox
                :label="item"
                color="amber"
                :value="item"
                hide-details
              ></v-checkbox>
            </v-col>
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
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('staffList', ['_getListOfStaff']),
    ...mapState('staffList', ['_listOfStaff', '_listOfRole']),
    formTitle () {
      return this.editedIndex === -1 ? 'New Staff' : 'Edit Staff'
    }
  },
  props: {
    isStaffDialog: {
      type: Boolean,
      default: false
    },
    editedStaff: {
      type: Object,
      default: undefined
    }
  },
  data () {
    var regex = /(09|01[2|6|8|9])+([0-9]{8})\b/g
    return {
      isOpen: false,
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
      select: 'Teacher',
      isStaff: false,
      listPermissionForStaff: [
        'View Timetable',
        'School Management',
        'View statistic',
        'Request Management'
      ],
      listPermissionForTeacher: [
        'View Timetable',
        'View statistic',
        'Request Management'
      ]
    }
  },
  methods: {
    ...mapActions('staffList', [
      '_getAllStaff',
      '_addStaff',
      '_updateStaff',
      '_deleteStaff'
    ]),
    editItem (item) {
      this.editedIndex = this._listOfStaff.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.isStaffDialog = true
    },
    changeRole () {
      if (this.select === 'Teacher' || this.select === 'Teacher Assistant') {
        this.isStaff = false
      } else if (this.select === 'AC' || this.select === 'AM') {
        this.isStaff = true
      }
    },
    close () {
      this.isStaffDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.$emit('closeDialog', this.isStaffDialog)
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

<style></style>
