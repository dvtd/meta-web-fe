<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <meta-material-card
          color="amber"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                  prepend-inner-icon="mdi-account"
                    class="purple-input"
                    label="User Name"
                    v-model="_getUserProfile.username"
                    disabled
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                  prepend-inner-icon="mdi-email"
                    label="Email Address"
                    v-model="_getUserProfile.email"
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                  prepend-inner-icon="mdi-account-edit"
                    label="First Name"
                    v-model="_getUserProfile.firstname"
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                  prepend-inner-icon="mdi-account-edit"
                    label="Last Name"
                    v-model="_getUserProfile.lastname"
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                  prepend-inner-icon="mdi-map-marker"
                    label="Adress"
                    v-model="_getUserProfile.address"
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                  prepend-inner-icon="mdi-phone"
                    label="Phone"
                    type="number"
                    class="purple-input"
                    v-model="_getUserProfile.phone"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                  prepend-inner-icon="mdi-flag"
                    label="Country"
                    v-model="_getUserProfile.country"
                    class="purple-input"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                  prepend-inner-icon="mdi-information"
                    class="purple-input"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    v-model="_getUserProfile.description"
                  />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="amber" class="mr-0">
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </meta-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from '@/components/MaterialCard'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  components: {
    'meta-material-card': MaterialCard
  },
  computed: {
    ...mapGetters('userprofile', ['_getUserProfile']),
    ...mapState('userprofile', ['_userProfile'])
  },
  methods: {
    ...mapActions('userprofile', ['_getInformationUser'])
  },
  mounted () {
    this._getInformationUser()
  }
}
</script>
