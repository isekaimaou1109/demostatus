<template>
  <v-toolbar app color="white" dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>{{appTitle}}</v-toolbar-title>
    <img src='https://i.ibb.co/VHTwCdg/pe5.jpg' height='100%' />
    <!-- v-bind:class="['default', { 'active': 'index ? true : false' }]" -->
    <template v-if="title === 'Project'">
      <div style="margin: 0 10px;">
        <v-tabs color="blue" background-color='white'>
          <v-tabs-slider color="blue lighten-1"></v-tabs-slider>
          <v-tab 
            @click="changeIndex(0)"
            activeClass="active"
            class="default"
          >
            Projects
          </v-tab>
          <v-tab 
            activeClass="active"
            class="default"
            @click="changeIndex(1)"
          >
            Templates
          </v-tab> 
        </v-tabs>
      </div>
    </template>
    <template v-else></template>

    <v-spacer></v-spacer>
    <div id='right'>
      <template v-if="$store.getters.getCurrentUser !== null">
        <div class="grid">
          <v-icon style="font-size:32px" color="blue-grey lighten-3">mdi-help-circle-outline</v-icon>
          <span style="display:flex;gap:5px;">
            <v-icon style="font-size:18px;color:#3e3d3d">mdi-account</v-icon>
            <span style="color:#3e3d3d">{{ $store.state.currentUser }}</span>
          </span>
        </div>
      </template>
      <v-tabs v-else v-bind:light="isLight" color="blue" background-color='white'>
        <v-tabs-slider color="blue lighten-1"></v-tabs-slider>
        <v-tab 
          activeClass="active"
          class="default" 
          v-for="tab in tabs" v-bind:key="tab.key"
          @click.exact="changeCurrentActive(tab.key)"
          v-bind:to="tab.name.toLowerCase()"
        >
          {{ tab.name }}
        </v-tab>
      </v-tabs>
      <country-flag country='gbr'/>
    </div>
  </v-toolbar>
</template>

<style>
  .default {
    color: grey!important;
  }

  .active {
    color: #68c7ff!important;
  }

  #right {
    display: flex;
    align-items: center;
  }

  #align {
    padding: 10px;
  }

  .grid {
    display: flex;
    align-items: center;
    margin: 0px 20px;
    gap: 20px;
  }
</style>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "Nav",
    props: ["title"],
    data: () => ({
      isLight: true,
      width: 300,
      tabs: [
        { key: 0, name: 'Login' },
        { key: 1, name: 'Register' },
      ],
      currentIndex: 0,
      index: 0
    }),
    methods: {
      changeCurrentActive(index) {
        this.currentIndex = index
      },
      changeIndex(index) {
        this.index = index
        if(index == 0) {
          this.$router.push('/project')
        }
      }
    },
    computed: mapState({
      currentUser: state => state.a.currentUser,
    })
  }
</script>