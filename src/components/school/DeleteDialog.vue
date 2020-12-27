<template>
  <v-dialog v-model="isDialogOpen" max-width="500px">
    <v-card>
      <v-alert
        icon="mdi-alert"
        dense
        type="warning"
      >
        Are you sure you want to delete this <strong>school</strong>?
      </v-alert>
      <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn color="blue darken-1" class="ma-1" text @click="$emit('close')">Cancel</v-btn>
        <v-btn color="error" plain class="ma-1" text @click="$emit('confirm')">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isDialogOpen: Boolean
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
