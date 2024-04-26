<template>
  <div id="app" data-app>
    <div class="table-container">
      <Comp-header />
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Ngày bắt được</th>
            <th>Hình ảnh</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pokemon, index) in cartList" :key="index">
            <td>{{ pokemon.name }}</td>
            <td>{{ pokemon.date }}</td>
            <td>
              <img
                :src="pokemon.image"
                :alt="pokemon.name"
                class="pokemon-image"
              />
            </td>
            <td>
              <button class="action-button" @click="releasePkm(index)">
                Thả
              </button>
              <!-- <button class="action-bt">Nâng cấp</button> -->
            </td>
          </tr>
        </tbody>
      </table>

      <v-dialog v-model="confirmDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Xác nhận</v-card-title>
          <v-card-text>Bạn có chắc chắn muốn thả pokemon không?</v-card-text>
          <v-card-actions>
            <v-btn color="error" text @click="confirmDelete">Đồng ý</v-btn>
            <v-btn color="primary" text @click="cancelDelete">Hủy</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CompHeader from "../CompHeader.vue";

export default {
  components: { CompHeader },
  name: "CompCart",
  computed: {
    ...mapGetters(["cartList"]),
  },
  data() {
    return {
      confirmDialog: false,
      deleteIndex: null,
    };
  },
  methods: {
    releasePkm(index) {
      this.deleteIndex = index;
      this.confirmDialog = true;
    },
    confirmDelete() {
      this.$store.dispatch("releasePokemon", this.deleteIndex);
      this.confirmDialog = false;
    },
    cancelDelete() {
      this.confirmDialog = false;
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

.table-container {
  max-width: 100%;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.back-button {
  text-decoration: none;
  color: #000;
  margin-bottom: 20px;
  display: block;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 10px;
  text-align: left;
}

thead {
  background-color: #f2f2f2;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr {
  height: 50px;
}

.pokemon-image {
  width: 150px;
  margin: 0 auto;
  object-fit: cover;
}

.action-button,
.action-bt {
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  margin-right: 5px;
}

.action-button {
  background-color: #4caf50;
}

.action-button:hover {
  background-color: #45a049;
}

.action-bt {
  background-color: #008cba;
}

.action-bt:hover {
  background-color: #007a8c;
}
</style>
