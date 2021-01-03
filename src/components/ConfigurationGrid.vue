<template>
  <v-app id="inspire">
    <v-card class="mx-10">
      <v-toolbar color="#262261" dark>
        <v-icon> mdi-cogs </v-icon>

        <v-toolbar-title>Settings</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>

      <v-list flat subheader three-line>
        <v-subheader>Features</v-subheader>
        <v-divider></v-divider>
        <v-list-item-group v-model="settings" multiple active-class="">
          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Notifications</v-list-item-title>
                <v-list-item-subtitle
                  >Enable notification feature in system</v-list-item-subtitle
                >
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Attendance</v-list-item-title>
                <v-list-item-subtitle>Enable attendace feature</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Request</v-list-item-title>
                <v-list-item-subtitle>Enable request feature</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-toolbar color="#262261" dark>
        <v-btn color="green" class="ma-2 white--text"> Save </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red" class="ma-2 white--text"> Cancel </v-btn>
      </v-toolbar>
    </v-card>
  </v-app>
</template>

<script>
export default {}
</script>

<style></style>
