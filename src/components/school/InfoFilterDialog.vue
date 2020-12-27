<template>
  <v-dialog
    v-model="isDialogOpen"
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
                v-model="editedItem.ContractInfo"
                label="ContractInfo"
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
          @click="$emit('close')"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="$emit('save')"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    formTitle: String,
    isDialogOpen: Boolean,
    editedItem: Object
  },
  data () {

  }
}
</script>
