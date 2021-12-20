<template>
  <div class="group">
    <Nav title="Project" />

    <div class="detail-container">
      <div class="detail-sidebar">
        <v-list shaped>
          <v-list-item-group
            v-model="selectedItem"
            color="primary"
          >
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>

      <div class="detail-body">
        <h1>Project</h1>
        <p>Description</p>
        <v-divider></v-divider>
        <v-tabs>
          <v-tab 
            v-for="tab in tabs"
            v-bind:key="tab.key"
          >
            {{ tab.name }}
          </v-tab>
        </v-tabs>
        <v-btn
          style="float:right;margin:30px 0px;"
          depressed
          color="primary"
        >
          ADD
        </v-btn>

        <v-data-table
          style="clear:both"
          v-model="selected"
          :headers="headers"
          :items="desserts"
          :single-select="singleSelect"
          item-key="name"
          show-select
          class="elevation-1"
        >
        </v-data-table>

        <div class="detail">
          <p>Detail</p>

          <div class="data">

            <div class="data-item">
              <p style="align-self:center">Seed Value</p>
              <v-checkbox
                color="grey"
                label="Enable"
              ></v-checkbox>
              <div class="data-child-item">
                <v-text-field
                  value="1"
                  single-line
                ></v-text-field>
              </div>
            </div>

            <div class="data-item">
              <p style="align-self:center">Header Lines</p>
              <div class="data-child-item">
                <v-text-field
                  value="1"
                  single-line
                ></v-text-field>
              </div>
            </div>

            <div class="data-item">
              <p style="align-self:center">Trail Lines</p>
              <div class="data-child-item">
                <v-text-field
                  value="0"
                  single-line
                ></v-text-field>
              </div>
            </div>

            <div class="data-item">
              <p style="align-self:center">Multi-threads</p>
              <div class="data-child-item">
                <v-text-field
                  value="1"
                  single-line
                ></v-text-field>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .detail-container {
    height: 100%;
    margin-top: 30px;
    display: flex;
  }

  .detail-container .detail-sidebar {
    height: inherit;
    width: 300px;
    padding: 10px;
  }

  .detail-container .detail-body {
    flex: 1;
    padding: 0 10px;
  }

  .table {
    box-shadow: 0 0 4px 1px #8888;
    border-radius: 5px;
    border: 1px solid #8888;
    flex-direction: column;
    display: flex;
  }

  .table .row {
    display: flex;
    align-items: center;
  }

  .detail {
    margin-top: 50px;
  }

  .data {
    padding: 20px;
  }

  .data-item {
    display: grid;
    grid-template-columns: 115px 100px 1fr;
    grid-gap: 32px;
  }

  .data-item:nth-child(2) .data-child-item,
  .data-item:nth-child(3) .data-child-item,
  .data-item:nth-child(4) .data-child-item {
    grid-column: 3/4;
  }

  .data-child-item {}

  .data-child-item {
    display: flex;
    flex: 1;
  }

  .data {
    width: 800px;
  }
</style>

<script>
  import Nav from "@/components/Nav.vue";

  export default {
    name: "ProjectDetail",
    components: {
      Nav,
    },
    data: function () {
      return {
        title: "Trang Cá Nhân",
        selectedItem: 1,
        items: [
          { text: 'Overview', icon: 'mdi-paper-roll' },
          { text: 'AI Label Analysis', icon: 'mdi-google-cloud' },
          { text: 'Tables', icon: 'mdi-table' },
          { text: 'Export', icon: 'mdi-application-export' },
          { text: 'Report', icon: 'mdi-flag' },
        ],
        tabs: [
          { key: 0, name: 'CSV' },
          { key: 1, name: 'DUMP' },
          { key: 0, name: 'DB' },
          { key: 1, name: 'QL1K' },
        ],
        headers: [
          {
            text: '#',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Storages', value: 'calories' },
          { text: 'Sources', value: 'fat' },
          { text: 'Info', value: 'carbs' },
          { text: 'Actions', value: 'protein' }
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
          }
        ]
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
