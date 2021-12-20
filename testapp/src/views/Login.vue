<template>
  <div class="group">
    <Nav title="LOGIN" />

    <FormLayout name="LOGIN">
      <v-text-field
        prepend-icon="mdi-email"
        v-model="email"
        v-bind:rules="emailRule"
        label="Email"
        type="text"
        required
        @keyup.enter="submit"
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
    </FormLayout>

    <v-overlay v-bind:opacity="$store.getters.authState ? 0 : 1" v-bind:value="$store.getters.authState ? 0 : 1" v-bind:z-index="$store.getters.authState ? -1 : 5">
      <div class="center">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
        <p class="text">Authentication</p>
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
    name: "Login",
    components: {
      Nav,
      FormLayout
    },
    data: function () {
      return {
        title: "Trang Đăng Nhập",
        email: '',
        password: '',
        emailRule: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ],
        passwordRule: [
          v => !!v || 'Password is required',
          v => v.length <= 10 || 'Password must be greater than 16 characters (at least 1 upper case char, some digits, some lower case chars and 1 special char) for strong',
        ],
        show1: false
      }
    },
    head: {
      title: function () {
        return {
          inner: this.title
        }
      }
    },
    methods: {
      submit() {
        this.$store.dispatch('setCurrentUser', { username: this.email, password: this.password })
            .then(res => {
              console.log('res is ' + res)

              if(res == null) {
                this.$router.push('/project')
                return;
              }

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
    }
  }
</script>
