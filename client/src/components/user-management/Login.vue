<template>
  <v-container>
    <v-row justify="center">
      <v-col
        sm="8"
      >
        <v-card>
            <v-card-title>
              Log In
            </v-card-title>
            <v-card-text>

              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                :append-icon="passwordVisibility"
                :type="show ? 'text' : 'password'"
                hint="Between 10 and 32 characters"
                counter
                label="Password"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                required
                @click:append="show = !show"
              ></v-text-field>

            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-row justify="end">
                  <v-btn
                    small
                    rounded
                    :disabled="$v.$invalid"
                    class="text-capitalize"
                    color="success"
                    @click="submit"
                  >
                    Submit
                  </v-btn>

                  <v-btn
                    small
                    rounded
                    class="text-capitalize"
                    color="error"
                    @click="reset"
                  >
                    Reset Form
                  </v-btn>
                </v-row>
              </v-container>
            </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <p>Need an account? Click
        <router-link :to="{name: 'Register'}">here</router-link>
        to sign up.</p>
    </v-row>
    <v-row justify="center">
      <p>Forgot your password? Click <router-link :to="{name: 'ForgotPassword'}">here</router-link> to reset.</p>
    </v-row>
  </v-container>
</template>

<script>
	import { validationMixin } from 'vuelidate';
	import { required, minLength, maxLength, email} from 'vuelidate/lib/validators';
	import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';

	export default {
		name: "Login",
		mixins: [validationMixin],
		validations: {
			email: { required, email },
			password: { required, minLength: minLength(10), maxLength: maxLength(10) },
		},
		data: () => ({
			email: '',
			password: '',
			show: false,
		}),
		computed: {
			emailErrors() {
				const errors = [];
				if (!this.$v.email.$dirty) return errors;
				!this.$v.email.required && errors.push('Email is required.');
				!this.$v.email.email && errors.push('A valid email address is required.');
				return errors
			},
			passwordErrors() {
				const errors = [];
				if (!this.$v.password.$dirty) return errors;
				!this.$v.password.required && errors.push('A password is required.');
				!this.$v.password.minLength && errors.push('Passwords must be at least 10 characters.');
				!this.$v.password.maxLength && errors.push('Passwords cannot be any longer than 32 characters.');
				return errors
			},
			passwordVisibility() { return !this.show ? mdiEyeOutline : mdiEyeOffOutline },
		},
		methods: {
			submit() {
				this.$v.$touch();
				console.log('this.$v.$invalid', this.$v.$invalid)
			},
			reset () {
				this.$v.$reset();
				this.email = '';
				this.password = '';
			},
		}
	}
</script>

<style scoped>

</style>