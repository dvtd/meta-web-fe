<template>
  <v-app id="inspire">
    <v-card v-bind="$attrs" class="v-card--material pa-3">
      <div class="d-flex grow flex-wrap">
        <v-sheet
          :class="{
            'pa-7': !$slots.image
          }"
          :max-height="icon ? 90 : undefined"
          :width="icon ? 'auto' : '100%'"
          elevation="6"
          class="text-start v-card--material__heading mb-n6 blue darken-4"
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

        <div v-if="$slots['after-heading']" class="ml-6">
          <slot name="after-heading" />
        </div>

        <div v-else-if="icon && title" class="ml-4">
          <div class="card-title font-weight-light" v-text="title" />
        </div>

        <v-spacer></v-spacer>
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="fromDate"
              label="From date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="fromDate" @input="menu1 = false"></v-date-picker>
        </v-menu>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="toDate"
              label="To date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="toDate" @input="menu2 = false"></v-date-picker>
        </v-menu>
        <v-btn class="ma-2" color="blue darken-4" dark>
          Find
          <v-icon dark right> mdi-update </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </div>
      <v-tabs dark background-color="blue darken-4"> </v-tabs>
      <v-card>
        <v-data-table
          :headers="headerTable"
          :headers-length="10"
          :items="dataTable"
          :search="search"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50]
          }"
          :items-per-page="30"
        >
        </v-data-table>
      </v-card>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data: function () {
    return {
      icon: 'mdi-clipboard-text',
      title: 'History',
      search: '',
      fromDate: new Date(Date.now() - 86400000 * 7).toISOString().substring(0, 10),
      toDate: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false
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
    }
  }
}
</script>

<style></style>
