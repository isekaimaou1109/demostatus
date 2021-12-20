<template>
  <div id="form-container">
    <div class="form-box">
      <div class="form-box-header">
        <h1>{{ name }}</h1>
      </div>

      <div class="form-box-body">
        <v-form v-model="valid">
          <slot></slot>
        </v-form>

        <v-btn
          color="primary"
          dark
          large        
        >
          {{ name }}
        </v-btn>
      </div>
    </div>

    <footer>
      <img src="https://i.ibb.co/YDS6BXv/pe4.jpg" />
      <pre>Copyrights &copy; 2020 Insight Technology Inc.</pre>
    </footer>
  </div>
</template>

<style>
  
</style>

<script>
  export default {
    name: "FormLayout",
    props: ["name", "info"],
    data: function() {
      return {
        fields: this.data
      }
    },
    methods: {
      register() {
        
      }
    }
  }
</script>