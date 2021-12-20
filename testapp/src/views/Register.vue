<template>
  <div class="group">
    <Nav title="REGISTER" />

    <FormLayout name="REGISTER">
      <v-text-field
        prepend-icon="mdi-account"
        v-model="username"
        v-bind:rules="usernameRule"
        label="Username"
        type="text"
        @keyup.enter="submit"
        required
      ></v-text-field>

      <v-text-field
        prepend-icon="mdi-email"
        v-model="email"
        v-bind:rules="emailRule"
        @keyup.enter="submit"
        label="Email"
        type="text"
        required
      ></v-text-field>

      <v-text-field
        prepend-icon="mdi-lock"
        v-model="password"
        v-bind:rules="passwordRule"
        label="Password"
        v-bind:type="show1 ? 'text' : 'password'"
        v-bind:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show1 = !show1"
        @keyup.enter="submit"
        required
      ></v-text-field>

      <v-text-field
        prepend-icon="mdi-lock-check"
        v-model="confirmPassword"
        v-bind:rules="confirmPasswordRule"
        label="Confirm Password"
        v-bind:type="show2 ? 'text' : 'password'"
        v-bind:append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show2 = !show2"
        @keyup.enter="submit"
        required
      ></v-text-field>
    </FormLayout>

    <v-overlay v-bind:opacity="$store.getters.authState ? 0 : 1" v-bind:value="$store.getters.authState ? 0 : 1" v-bind:z-index="$store.getters.authState ? -1 : 5">
      <div class="center">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
        <p class="text">Registering And Authentication</p>
      </div>
    </v-overlay>
  </div>
</template>

<style>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }

  .center .text {font-size:24px;}
</style>

<script>
  import Nav from "@/components/Nav.vue";
  import FormLayout from "@/components/FormLayout.vue"
  import _ from 'lodash'


  export default {
    name: "Register",
    components: {
      Nav,
      FormLayout
    },
    data: function () {
      return {
        title: "Trang Đăng Kí",
        isHidden: this.$store.state.isDelay,
        username: '',
        usernameRule: [
          v => !!v || "Username is required",
          v => /[a-zA-Z0-9._-]+/.test(v) || "Username must be valid",
        ],
        email: '',
        emailRule: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        password: '',
        show1: false,
        passwordRule: [
          v => !!v || 'Password is required',
          v => v.length <= 16 || 'Password must be greater than 16 characters (at least 1 upper case char, some digits, some lower case chars and 1 special char) for strong',
        ],
        confirmPassword: '',
        show2: false,
        confirmPasswordRule: [
          v => !!v || 'Password is required',
          v => v.length <= 16 || 'Password must be greater than 16 characters (at least 1 upper case char, some digits, some lower case chars and 1 special char) for strong',
        ]
      }
    },
    methods: {
      submit() {
        this.$store.dispatch('createNewAccount', { username: this.username, password: this.password, email: this.email }).then((res) => {
          console.log('res is ' + res)

          var timeout = setTimeout(() => {
            this.$store.commit('serCurrentUser', res)
            window.location.assign('http://localhost:8080/project')
            _.debounce(function() {
              this.$store.commit('changeAuthState', true)
            }, 500)
            clearTimeout(timeout)
          }, 1000)
        }).catch(() => console.log)
      }
    },
    head: {
      title: function () {
        return {
          inner: this.title
        }
      }
    }
  }
</script>
