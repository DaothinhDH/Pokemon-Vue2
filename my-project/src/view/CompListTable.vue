<template>
  <div>
    <CompHeader />
    <div class="flex">
      <router-link to="/"><i class="fa-solid fa-bars"></i></router-link>
      <router-link to="/Table"><i class="fa-solid fa-table"></i></router-link>
    </div>
    <div class="v-card">
      <div class="v-card-title">
        ListPokemon
        <div class="v-spacer"></div>
        <input
          v-model="search"
          class="v-text-field"
          type="text"
          placeholder="Search"
        />
      </div>
      <table class="text-center">
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>TYPE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in displayedDesserts" :key="item.id">
            <td class="text-left">{{ item.id }}</td>
            <td>
              <img
                :src="item.image"
                alt="Pokemon"
                height="150px"
                width="150px"
              />
            </td>
            <td>
              <h2>{{ item.name }}</h2>
            </td>
            <td>
              <template v-for="(type, index) in item.types">
                <button
                  :class="index === 0 ? 'primary' : 'purple'"
                  class="type-button"
                  :key="index"
                >
                  {{ type }}
                </button>
              </template>
            </td>
            <td>
              <PopupTable
                class="attrack"
                :pokemonList="pokemonList"
                :item="item"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="4"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          class="custom-pagination"
          @input="changePage"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getTableProduct } from "../api/api";
import CompHeader from "../components/CompHeader.vue";
import PopupTable from "../components/product/PopubTable.vue";

export default {
  components: {
    CompHeader,
    PopupTable,
  },
  data() {
    return {
      search: "",
      desserts: [],
      page: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    displayedDesserts() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredDesserts.slice(start, end);
    },
    filteredDesserts() {
      return this.desserts.filter((dessert) =>
        dessert.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    pages() {
      return Math.ceil(this.filteredDesserts.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      getTableProduct()
        .then((products) => {
          this.desserts = products;
          this.pokemonList = products;
        })
        .catch((error) => {
          console.error("Error loading products:", error);
        });
    },
    performAction(item) {
      console.log("Perform action for item:", item);
    },
    changePage(page) {
      this.page = page;
    },
  },
};
</script>

<style scoped>
.attrack {
  width: 100px;
  height: 80px;
  margin-top: 39px;
  padding-left: 85px;
}
.v-card {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.v-card-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.v-text-field {
  width: 200px;
}

.text-left {
  text-align: left;
  font-size: 20px;
}

.text-center {
  width: 100%;
  height: 100%;
  text-align: center;
}

.primary {
  background-color: green;
  color: white;
  margin-right: 10px;
}

.purple {
  background-color: purple;
  color: white;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.flex a {
  text-decoration: none;
  background: purple;
  padding: 8px 10px;
  color: #fff;
  border-radius: 8px;
}

.type-button,
.action-button {
  width: 100px;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}
</style>
