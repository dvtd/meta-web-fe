<template>
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
      <info-filter-dialog :is-dialog-open="dialog" :edited-item="editedItem" :form-title="formTitle" @close="close" @save="save"></info-filter-dialog>
      <delete-dialog :is-dialog-open="dialogDelete" @close="closeDelete" @confirm="deleteItemConfirm"></delete-dialog>
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

import DeleteDialog from './DeleteDialog'
import InfoFilterDialog from './InfoFilterDialog'
export default {
  components: { 'info-filter-dialog': InfoFilterDialog, 'delete-dialog': DeleteDialog },
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
      dialog: false,
      dialogDelete: false,
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
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  methods: {
    editItem (item) {
      this.editedIndex = this.tableData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.tableData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
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
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.tableData[this.editedIndex], this.editedItem)
      } else {
        this.tableData.push(this.editedItem)
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

<style scoped>

</style>
