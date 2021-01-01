<template>
  <v-card v-bind="$attrs" :class="classes" class="v-card--material pa-3">
    <div class="d-flex grow flex-wrap">
      <v-avatar
        v-if="avatar"
        size="128"
        class="mx-auto v-card--material__avatar elevation-6"
        color="grey"
      >
        <v-img :src="avatar" />
      </v-avatar>

      <v-sheet
        v-else
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

        <v-icon v-else-if="iconSelected" size="32" v-text="iconSelected" />

        <div v-if="text" class="headline font-weight-thin" v-text="text" />
      </v-sheet>

      <div v-if="$slots['after-heading']" class="ml-6">
        <slot name="after-heading" />
      </div>

      <div v-else-if="icon && title" class="ml-4">
        <div class="card-title font-weight-light" v-text="title" />
      </div>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer v-if="staffGrid" />
      <meta-staff-dialog
        :editedStaff="editedItem"
        :isStaffDialog="dialog"
        @closeDialog="close($event)"
      >
      </meta-staff-dialog>
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
        <v-tab v-for="i in tabTitle" :key="i.title" :href="`#tab-${i.title}`">
          {{ i.title }}
        </v-tab>
        <v-tab-item
          v-for="i in tabTitle"
          :key="i.title"
          :value="'tab-' + i.title"
        >
          <v-card flat>
            <meta-request-table
              v-if="requestGrid"
              :headerRequestTable="headerTable"
              :dataRequestTable="dataTable"
              :searchValue="search"
              :parentTitleGrid="tabTitle"
              :colorStatus="colorGrid"
            >
            </meta-request-table>
            <meta-staff-table
              v-if="staffGrid"
              :headerStaffTable="headerTable"
              :dataStaffTable="dataTable"
              :searchValue="search"
              :parentTitleGrid="tabTitle"
              :colorStatus="colorGrid"
              @editStaff="updateStaff($event)"
              @deleteStaff="deleteStaff($event)"
            >
            </meta-staff-table>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <slot />
    <template v-if="$slots.actions">
      <v-divider class="mt-2" />

      <v-card-actions class="pb-0">
        <slot name="actions" />
      </v-card-actions>
    </template>
        <meta-message-dialog
        :isOpenDialog="isMessage"
        message="Are you sure you want to delete this Staff?"
        @closeMessageDialog="closeDialog"
        @confirmMessageDialog="confirmDialog"
      ></meta-message-dialog>
  </v-card>
</template>

<script>
import RequestTable from '@/components/RequestTable'
import StaffTable from '@/components/StaffTable'
import StaffDialog from '@/components/StaffDialog'
import MessageDialog from '@/components/MessageDialog'

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DataGrid',
  components: {
    'meta-request-table': RequestTable,
    'meta-staff-table': StaffTable,
    'meta-staff-dialog': StaffDialog,
    'meta-message-dialog': MessageDialog
  },
  data () {
    return {
      search: '',
      colorTable: 'black',
      iconSelected: this.icon[0],
      tab: this.tabTitle[0],
      editedItem: {},
      dialog: false,
      isMessage: false
    }
  },
  methods: {
    ...mapActions('requestlist', ['_getAllRequestOfDepartment']),
    clickToEditRequest (request) {
      this.$router.push({
        path: '/requestID',
        query: { ticketId: request.requestID },
        params: { ticketId: request.requestID }
      })
    },
    changeTab () {
      var tabLabel = this.tab.split('tab-')[1]
      for (let index = 0; index < this.tabTitle.length; index++) {
        const tabCurrent = this.tabTitle[index]
        if (tabLabel === tabCurrent.title) {
          this._getAllRequestOfDepartment(this.tabTitle[index].title)
          this.iconSelected = this.icon[index]
          this.colorTable = this.colorGrid[index]
        }
      }
    },
    updateStaff (staffIsSelected) {
      this.editedItem = staffIsSelected
      this.dialog = true
    },
    deleteStaff (staffIsSelected) {
      this.editedItem = staffIsSelected
      this.isMessage = true
    },
    close (isCloseDialog) {
      this.dialog = isCloseDialog
    },
    closeDialog () {
      this.isMessage = false
    },
    confirmDialog () {
      this.isMessage = false
    }
  },
  props: {
    headerTable: {
      type: Array,
      default: undefined
    },
    dataTable: {
      type: Array,
      default: undefined
    },

    avatar: {
      type: String,
      default: ''
    },
    colorGrid: {
      type: Array,
      default: undefined
    },
    icon: {
      type: Array,
      default: undefined
    },
    image: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    requestGrid: {
      type: Boolean,
      default: false
    },
    staffGrid: {
      type: Boolean,
      default: false
    },
    tabTitle: {
      type: Array,
      default: undefined
    }
  },

  computed: {
    ...mapGetters('requestlist', ['_getListOfRequest']),
    classes () {
      return {
        'v-card--material--has-heading': this.hasHeading
      }
    },
    hasHeading () {
      return Boolean(this.$slots.heading || this.title || this.icon)
    },
    hasAltHeading () {
      return Boolean(this.$slots.heading || (this.title && this.icon))
    }
  }
}
</script>

<style lang="sass">
.v-card--material
  margin-top: 5vh
  margin-bottom: 5vh
  &__avatar
    position: relative
    top: -64px
    margin-bottom: -32px

  &__heading
    position: relative
    top: -40px
    transition: .3s ease
    z-index: 1
</style>
