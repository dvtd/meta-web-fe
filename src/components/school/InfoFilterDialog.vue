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
          color="#262261"
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
              color="#262261"
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
                  v-model="phone"
                  :error-messages="phoneErrors"
                  outlined
                  clearable
                  label="Phone"
                  prepend-inner-icon="mdi-account-tie"
                  required
                  @input="$v.phone.$touch()"
                  @blur="$v.phone.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-model="schoolLevel"
                  :items="dropdownLevel"
                  label="School level"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col
              >
                <location-autocomeplete :location="location"></location-autocomeplete>
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
import LocationAutocomplete from '../LocationAutocomplete'

export default {
  components: { 'location-autocomeplete': LocationAutocomplete },
  props: {
    formTitle: String,
    isDialogOpen: Boolean,
    editedItem: Object
  },

  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(30) },
    email: { required, email },
    phone: { required },
    location: { required }
  },

  data () {
    return {
      location: '',
      name: '',
      email: '',
      phone: '',
      schoolLevel: '',
      searchResults: [],
      service: null,
      control: false,
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
      dropdownLevel: [
        'Primary', 'Secondary', 'High'
      ],
      nameReserve: '',
      emailReserve: '',
      phoneReserve: '',
      schoolLevelReserve: '',
      locationReserve: ''
    }
  },

  metaInfo () {
    return {
      script: [{
        src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCk50AFQxdB0WR4DJHpawBPGcEvXPueFxI&libraries=places',
        async: true,
        defer: true,
        callback: () => this.MapsInit() // will declare it in methods
      }]
    }
  },

  watch: {
    editedItem: function () {
      this.name = this.editedItem.SchoolName
      this.email = this.editedItem.Email
      this.phone = this.editedItem.PhoneNumber
      this.location = this.editedItem.Locations
      this.schoolLevel = this.editedItem.SchoolLevel
      this.searchResults = [location]

      this.schoolLevelReserve = this.schoolLevel
      this.nameReserve = this.name.valueOf()
      this.emailReserve = this.email.valueOf()
      this.phoneReserve = this.phone.valueOf()
      this.locationReserve = this.location.valueOf()
    },

    location (newValue) {
      if (newValue) {
        this.service.getPlacePredictions({
          input: this.location,
          types: ['(cities)']
        }, this.displaySuggestions)
      }
    }

  },

  mounted () {
    // eslint-disable-next-line no-undef,no-unused-vars
    var autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete.$refs.input

    )
  },

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 30 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('phone is required.')
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
      this.phone = ''
      this.location = ''
      this.schoolLevel = 'Primary'
    },
    reset () {
      this.$v.$reset()
      this.name = this.nameReserve
      this.email = this.emailReserve
      this.phone = this.phoneReserve
      this.location = this.locationReserve
      this.schoolLevel = this.schoolLevelReserve
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
