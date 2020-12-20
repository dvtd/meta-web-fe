<template>
  <v-container class="section-container" fluid>
    <v-row class="signin">
      <v-col cols="8" class="left">
        <img src="../assets/me-panner.png" alt="" width="450px">
      </v-col>
      <v-col cols="4" class="right">
        <h2>Sign In</h2>
        <v-form>
          <v-text-field
            outlined
            v-model="email"
            :error-messages="emailErrors"
            label="Email"
            name="Email"
            prepend-inner-icon="email"
            type="text"
            required
            color="#262261"
            class="custom-label-color"/>
          <v-text-field
            outlined
            v-model="password"
            :error-messages="passwordErrors"
            label="Password"
            name="Password"
            prepend-inner-icon="lock"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            required
            color="#262261"
            class="custom-label-color"
            @click:append="show = !show"/>
            <v-checkbox
              v-model="chkRememberPassword"
              label="Remember Password"/>
          <div class="text-center mt-2">
            <v-btn @click="submit" class="signin-btn">
              Sign In
            </v-btn>
          </div>
          <h4 class="text-center mt-6">Forgot Password ?</h4>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required }
  },

  data: () => ({
    email: '',
    password: '',
    show: false,
    chkRememberPassword: false
  }),

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
    }
  }
}
</script>

<style lang="scss">
.section-container {
  background: #262261;
  width: 100%;
  height: 100%;
  .signin {
    padding: 0;
    max-width: 1000px;
    margin: 0 auto;
    height: 100%;
    box-shadow: 0 0 5px 5px rgba($color: #000000, $alpha: 0.1);
    .left {
      padding: 30px;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      display: flex;
      background-color: #f1c40f;
    }
    .right {
      padding: 30px;
      box-sizing: border-box;
      background: white;
      color: #262261;
      .custom-label-color .v-label {
        color: #262261;
        opacity: 1;
      }
      h2 {
        text-align: center;
        margin: 30px 0;
      }
      .signin-btn {
        width: 30%;
        color: #262261;
      }
    }
  }
}

.theme--light.v-label {
    color: #262261;
}
.theme--light.v-input:not(.v-input--is-disabled) input{
    color: #262261;
}
</style>
