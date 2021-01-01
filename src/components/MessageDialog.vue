<template>
   <v-row justify="center">
   <v-dialog v-model="isOpenDialog" max-width="500px"  @click:outside="close">
          <v-card>
            <v-card-title class="headline">{{message}}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
  </v-dialog>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      dialog: this.isOpenDialog
    }
  },
  methods: {
    close () {
      this.isOpenDialog = false
      this.$nextTick(() => {
        this.$emit('closeMessageDialog')
      })
    },
    save () {
      this.isOpenDialog = false
      this.$nextTick(() => {
        this.$emit('confirmMessageDialog')
      })
    }
  },
  props: {
    message: {
      type: String,
      default: undefined
    },
    isOpenDialog: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
