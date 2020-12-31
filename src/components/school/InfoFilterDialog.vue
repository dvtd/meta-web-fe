<template>

  <div>

    <v-dialog
      v-model="isDialogOpen"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
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

      <v-form>
        <v-card tile>
          <v-card-title class="pa-0">
            <v-toolbar
              dark
              color="primary"
            >
              <v-btn
                icon
                dark
                @click="close()"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>{{formTitle}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  @click="submit"
                >
                  Save
                </v-btn>
              </v-toolbar-items>
              <v-menu
                bottom
                right
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list rounded>
                  <v-list-item-group color="primary">
                    <v-list-item
                      v-for="(item, i) in dropdownItems"
                      :key="i"
                      @click="handleAction(i)"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-card-title>

          <v-card-text class="filter_form">

            <v-row>
              <v-col
              >
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  :counter="30"
                  outlined
                  clearable
                  label="Name"
                  prepend-inner-icon="mdi-account-edit-outline"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
              >
                <v-text-field
                  v-model="representative"
                  :error-messages="representativeErrors"
                  :counter="30"
                  outlined
                  clearable
                  label="Representative"
                  prepend-inner-icon="mdi-account-tie"
                  required
                  @input="$v.representative.$touch()"
                  @blur="$v.representative.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
              >
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  label="E-mail"
                  prepend-inner-icon="mdi-email-edit-outline"
                  outlined
                  clearable
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col
              >
                <v-text-field
                  v-model="location"
                  :error-messages="locationErrors"
                  outlined
                  clearable
                  label="Location"
                  prepend-inner-icon="mdi-map-marker"
                  required
                  @input="$v.location.$touch()"
                  @blur="$v.location.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>

          </v-card-text>
          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-form>
    </v-dialog>

  </div>

</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  props: {
    formTitle: String,
    isDialogOpen: Boolean,
    editedItem: Object
  },

  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(30) },
    email: { required, email },
    representative: { required, maxLength: maxLength(30) },
    location: { required }
  },

  data () {
    return {
      location: '',
      control: false,
      name: '',
      email: '',
      representative: '',
      dropdownItems: [
        {
          title: 'Reset',
          icon: 'mdi-refresh'
        },
        {
          title: 'Clear all',
          icon: 'mdi-broom'
        }
      ],
      nameReserve: '',
      emailReserve: '',
      representativeReserve: '',
      locationReserve: ''
    }
  },

  watch: {
    editedItem: function () {
      this.name = this.editedItem.Name
      this.email = this.editedItem.ContactInfo
      this.representative = this.editedItem.Representative
      this.location = this.editedItem.Location

      this.nameReserve = this.name.valueOf()
      this.emailReserve = this.email.valueOf()
      this.representativeReserve = this.representative.valueOf()
      this.locationReserve = this.location.valueOf()
    }
  },

  computed: {
    userName () {
      console.log('Name ne: ' + this.editedItem.Name)
      return this.editedItem.Name
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 30 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    representativeErrors () {
      const errors = []
      if (!this.$v.representative.$dirty) return errors
      !this.$v.representative.maxLength && errors.push('Representative must be at most 30 characters long')
      !this.$v.representative.required && errors.push('Representative is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    locationErrors () {
      const errors = []
      if (!this.$v.location.$dirty) return errors
      !this.$v.location.required && errors.push('Location is required.')
      return errors
    }
  },

  methods: {
    close () {
      this.isDialogOpen = false
      this.clear()
      this.$emit('close')
    },
    submit () {
      this.$v.$touch()
      this.openStatus = false
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.representative = ''
      this.location = ''
    },
    reset () {
      this.$v.$reset()
      this.name = this.nameReserve
      this.email = this.emailReserve
      this.representative = this.representativeReserve
      this.location = this.locationReserve
    },
    handleAction (i) {
      switch (i) {
        case 0:
          this.reset()
          break
        case 1:
          this.clear()
          break
      }
    }
  }
}
</script>
<style>
  .filter_form {
    margin-top: 30px;
  }
</style>
