<template>
  <v-data-table
    :headers="headerStaffTable"
    :items="dataStaffTable"
    :search="searchValue"
    sort-by="name"
    class="elevation-1"
  >
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
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
    }
  },
  methods: {
    editItem (item) {
      this.$emit('editStaff', item)
    },
    deleteItem (item) {
      this.$emit('deleteStaff', item)
      // confirm('Are you sure you want to delete this Staff?') &&
      //   (await this._deleteStaff(item))
    }

  },
  props: {
    headerStaffTable: {
      type: Array,
      default: undefined
    },
    dataStaffTable: {
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
