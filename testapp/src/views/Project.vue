<template>
  <div class="group">
    <Nav title="Project" />

    <div class="project">
      <div class="project-input">
        <div class="expansion-header">
          <v-text-field
            v-model="name"
            :counter="100"
            label="Project Name"
            required
            @focus="changeFocusState"
            @blur="changeFocusState"
          ></v-text-field>
        </div>

        <div v-bind:class="[{ visible: isFocus }, 'expansion-body']">
          <v-textarea
            outlined
            v-model="description"
            name="input-7-4"
            :counter="500"
            label="Project Description"
            @focus="changeFocusState"
            v-bind:value="description"
          ></v-textarea>

          <div class="button-container">
            <v-btn
              text
              color="black"
              @click="onCancelCreateNewProject"
            >
              Cancel
            </v-btn>

            <v-btn
              depressed
              color="primary"
              @click="createNewProject(null, name, description, true)"
            >
              Create
            </v-btn>
          </div>
        </div>
      </div>

      <div class="project-container">
        <div class="title-container"> 
          <h6 class="title">All Projects</h6>

          <v-icon large>mdi-menu</v-icon>
        </div>

        <div class="project-card-container">
          <template v-if="$store.state.list.length">
            <div 
              class="card-item"
              v-for="item in $store.state.list"
              v-bind:key="item.projectId"
            >
              <div class="card-item-top">
                <h3 style="display:inline;">{{ item.name }}</h3>
                <v-btn
                  color="transparent"
                  class="ma-2 white--text"
                  fab
                  x-small
                  @click="cloneDialog = true; clientId = item.clientId; projectName = item.name; description = item.description; projectId = item.projectId"
                  style="box-shadow:0 0 0 0;float:right;clear:both"
                >
                  <v-icon color="#3bb5ef" dark>
                    mdi-content-copy
                  </v-icon>
                </v-btn>
                <p>{{ item.projectId }}</p>
              </div>

              <div class="card-item-bottom">
                <p>{{ item.description }}</p>
                <v-btn
                  color="transparent"
                  class="ma-2 white--text"
                  fab
                  x-small
                  @click="dialog = true; clientId = item.clientId; projectName = item.name"
                  style="box-shadow: 0 0 0 0;"
                >
                  <v-icon color="red" dark>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </div>
            </div>
          </template>
          <template v-else>
            <p style="width:100%;text-align:center;">Project not found!!</p>
          </template>
        </div>
      </div>
    </div>

    <v-dialog
      v-model="cloneDialog"
      persistent
      max-width="500"
      width="350"
    >
      <v-card>
        <v-card-title class="text-h5">
          Confirm
        </v-card-title>
        <v-card-text>
          Project <strong>{{ projectName }}</strong> is going to be copied. Do you want to continue?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="darken-1"
            text
            @click="cloneDialog = false; clientId = ''; projectName = ''"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue"
            text
            @click="createNewProject(null)"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
      width="350"
    >
      <v-card>
        <v-card-title class="text-h5">
          Confirm
        </v-card-title>
        <v-card-text>
          Project <strong>{{ projectName }}</strong> is going to be removed. Are you sure?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="darken-1"
            text
            @click="dialog = false; clientId = ''; projectName = ''"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red"
            text
            @click="onDeleteSpecifiedProject"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
  .project {
    padding: 50px;
    display: flex;
    flex-direction: column;
    height: 100%;
  } 

  .project .project-input {
    width: 600px;
    align-self: center;
    display: flex;
    flex-direction: column;
    padding: 15px 30px;
    border: 1px solid #888;
    border-radius: 10px;
    box-shadow: 0 0 15px 7px #3333;
  }

  .project .project-input .expansion-header, 
  .project .project-input .expansion-body {
    width: 100%;
  }

  .project .project-input .expansion-body {
    visibility: hidden;
    height: 0;
    opacity: 0;
    transition: height 1s ease, opacity .2s ease 1s;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
  }

  .project-container {
    margin-top: 80px;
  }

  .project-container .title-container {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #888;
  }

  .visible {
    height: 256px!important;
    opacity: 1!important;
    visibility: visible!important;
  }

  .project-card-container {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .project-card-container .card-item {
    width: 350px;
    border: 1px solid #3333;
    border-radius: 10px;
  }

  .project-card-container .card-item .card-item-top,
  .project-card-container .card-item .card-item-bottom {
    padding: 20px 20px 0px 20px;
  }

  .project-card-container .card-item .card-item-top {
    border-bottom: 1px solid #3333;
    background: #bdbaba;
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    line-height: 2;
  }

  .project-card-container .card-item .card-item-bottom {
    display: flex;
    flex-direction: column;
  }
</style>

<script>
  import Nav from "@/components/Nav.vue";
  import randToken from 'rand-token'
  import axios from 'axios'

  export default {
    name: "Project",
    components: {
      Nav,
    },
    data: function () {
      return {
        title: "Trang Cá Nhân",
        isLoading: false,
        name: '',
        description: '',
        isFocus: false,
        overlay: true,
        dialog: false,
        cloneDialog: false,
        dialogName: '',

        clientId: '',
        projectName: '',
        projectId: ''
      }
    },
    created() {
      const fetchData = async () => {
        const data = await axios.get(
          `http://localhost:3000/projects/${this.$store.state.currentUser}`
        );

        this.$store.commit('changeProjectListItemList', data.data.data)
      };

      fetchData();
    },
    methods: {
      changeFocusState() {
        this.isFocus = !this.isFocus
        this.projectId = ''
        this.clientId = ''  
      },
      createNewProject(id = null, name = null, description = null, isRedirect = false) {
        this.cloneDialog = false
        var token = randToken.generate(24)
        console.log(`id ${this.projectId}`)
        this.$store.dispatch('postUserProject', {
          data: {
            projectId: (id ? id : this.projectId) || token,
            name: name || (this.clientId ? `${this.projectName}-Copied-${randToken.generate(6)}` : `${this.name}`),
            description: description || this.description,
            clientId: randToken.generate(12)
          },
          username: this.$store.state.currentUser
        }).then(res => {
          this.$store.commit('changeProjectListItemList', res)
          if(isRedirect) {
            this.$router.push(`/project/${token}`)
          }
        }).catch(() => console.log)
      },
      onDeleteSpecifiedProject() {
        console.log('same as ' + this.clientId + ' ' + this.$store.state.currentUser) // ok
        this.$store.dispatch('deleteSpecifiedProject', { 
          clientId: this.clientId, 
          username: this.$store.state.currentUser 
        }).then((res) => {
          this.$store.commit('changeProjectListItemList', res.data)
          this.dialog = false
        }).catch(() => console.log)
      },
      onCancelCreateNewProject() {
        this.name = '',
        this.description = ''
        this.isFocus = false
      },
      confirmClone(_id) {
        this.dialog = true
        this.clientId = _id
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
