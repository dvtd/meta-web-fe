<template>
  <v-data-table
    :headers="headerRequestTable"
    :items="dataRequestTable"
    :items-per-page="5"
    :search="searchValue"
  >
    <template v-slot:item.requestID="{ item }">
      <router-link
        :to="{ path: 'requestdetail', query: { ticketId: item.requestID } }"
        >{{ item.requestID }}</router-link
      >
    </template>
    <template v-slot:item.sendAtTime="{ item }">
      {{ item.sendAtTime | formatDatetime }}
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip :color="getColor(item.status)" dark>
        {{ item.status }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="clickToEditRequest(item)"
        >mdi-pencil</v-icon
      >
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'
export default {
  filters: {
    formatDatetime (value) {
      return moment(value).format('DD/MM/YYYY')
    }
  },
  data () {
    return {}
  },
  methods: {
    getColor (status) {
      for (let index = 1; index < this.parentTitleGrid.length; index++) {
        const tabCurrent = this.parentTitleGrid[index]
        if (status === tabCurrent.title) {
          return this.colorStatus[index]
        }
      }
    },
    clickToEditRequest (request) {
      this.$router.push({
        path: '/requestID',
        query: { ticketId: request.requestID },
        params: { ticketId: request.requestID }
      })
    }
  },
  props: {
    headerRequestTable: {
      type: Array,
      default: undefined
    },
    dataRequestTable: {
      type: Array,
      default: undefined
    },
    searchValue: {
      type: String,
      default: undefined
    },
    parentTitleGrid: {
      type: Array,
      default: undefined
    },
    colorStatus: {
      type: Array,
      default: undefined
    }
  }
}
</script>

<style></style>
