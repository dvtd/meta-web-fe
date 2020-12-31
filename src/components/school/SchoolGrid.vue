<template>
  <v-card v-bind="$attrs" :class="classes" class="v-card--material pa-3">
    <div class="d-flex grow flex-wrap">
      <v-sheet
        :class="{
          'pa-7': !$slots.image
        }"
        :color="colorTable"
        :max-height="icon ? 90 : undefined"
        :width="icon ? 'auto' : '100%'"
        elevation="6"
        class="text-start v-card--material__heading mb-n6"
        dark
      >
        <slot v-if="$slots.heading" name="heading" />

        <slot v-else-if="$slots.image" name="image" />

        <div
          v-else-if="title && !icon"
          class="display-1 font-weight-light"
          v-text="title"
        />

        <v-icon v-else-if="icon" size="32" v-text="icon" />
      </v-sheet>
      <div class="ml-4">
        <div class="card-title font-weight-light" v-text="title" />
      </div>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
      ></v-text-field>
      <v-spacer></v-spacer>
      <info-filter-dialog :is-dialog-open="dialog" :edited-item="editedItem" :form-title="formTitle" @close="close"></info-filter-dialog>
      <warning-dialog :is-dialog-open="dialogWarning" @close="closeDelete" @confirm="deleteItemConfirm" :dialog-content="warningContent"></warning-dialog>
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
              :headers="headerData"
              :items="tableData"
              sort-by="calories"
              class="elevation-1"
            >
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
</template>

<script>

import WarningDialog from '../WarningDialog'
import InfoFilterDialog from './InfoFilterDialog'
export default {
  components: { 'info-filter-dialog': InfoFilterDialog, 'warning-dialog': WarningDialog },
  props: {
    headerData: {
      type: Array,
      default: undefined
    },
    tableData: {
      type: Array,
      default: undefined
    }
  },
  data () {
    return {
      title: 'LIST OF SCHOOL',
      icon: 'mdi-warehouse',
      colorTable: 'black',
      dialog: false,
      dialogWarning: false,
      warningContent: '',
      isWarning: false,
      editedIndex: -1,
      editedItem: {
        ContactInfo: '',
        Id: 0,
        IsDeleted: false,
        Location: 0,
        Name: '',
        Representative: ''
      },
      defaultItem: {
        ContactInfo: '',
        Id: 0,
        IsDeleted: false,
        Location: 0,
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
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogWarning (val) {
      val || this.closeDelete()
    }
  },

  methods: {
    editItem (item) {
      this.editedIndex = this.tableData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      if (this.editedItem.IsDeleted === true) {
        this.warningContent = 'This school: ' + this.editedItem.Name + ' is deleted! You cannot edit it!'
        this.dialogWarning = true
        this.isWarning = true
        return
      }
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.tableData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.warningContent = 'Are you sure you want to delete this item?'
      this.dialogWarning = true
    },

    deleteItemConfirm () {
      if (this.isWarning === true) {
        this.closeDelete()
        return
      }
      this.tableData.splice(this.editedIndex, 1)
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
      if (this.isWarning === true) {
        this.isWarning = false
      }
      this.dialogWarning = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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

<style scoped>

</style>
