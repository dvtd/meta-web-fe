<template>
  <v-text-field
    v-model="address"
    outlined
    clearable
    prepend-inner-icon="mdi-map-marker"
    required
    @input="$v.address.$touch()"
    @blur="$v.address.$touch()"
    ref="autocomplete"
  ></v-text-field>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  mixins: [validationMixin],

  validations: {
    address: { required }
  },

  props: {
    location: String
  },

  data () {
    return {
      address: ''
    }
  },

  mounted () {
    // eslint-disable-next-line no-undef,no-unused-vars
    var autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete.$refs.input

    )
  },

  watch: {
    location: function () {
      this.address = this.location
    }
  },

  methods: {
    addressErrors () {
      const errors = []
      if (!this.$v.address.$dirty) return errors
      !this.$v.address.required && errors.push('address is required.')
      return errors
    }
  }
}
</script>
