<template>
  <v-app>
    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<style>
  body, .group, #form-container {
    width: 100%;
    height: 100%;
  }

  #form-container {
    justify-content: center;
    align-items: center;
    gap: 50px;
  }

  #form-container,
  #form-container .form-box .form-box-body {
    display: flex;
    flex-direction: column;
  }

  #form-container .form-box {
    width: 550px;
    border: 1px solid #888;
    border-radius: 10px;
    box-shadow: 0 0 24px 8px #3333;
  }

  #form-container .form-box .form-box-header {
    background: #bdbdbd;
    padding: 10px 20px;
    border-radius: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  #form-container .form-box .form-box-body {
    padding: 20px 50px;
  }

  footer {
    text-align: center;
  }

  footer img {
    height: 64px;
  }

  footer pre {
    font-style: italic;
    color: #bbbbbb;
  }

  .v-btn--is-elevated {
    align-self: flex-end;
    margin-top: 60px;
  }
</style>

<script>
  export default {
    name: 'App'
  };
</script>

<style>
</style>