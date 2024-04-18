<template>
  <div>
    <Comp-header />
    <div class="product-list">
      <div
        class="product"
        v-for="product in paginatedData"
        :key="product.id"
        @click="showProductDetails(product.id)"
      >
        <div class="img">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="name">
          <h3>{{ product.name.toUpperCase() }}</h3>
          <h3>#{{ product.id }}</h3>
        </div>
      </div>
    </div>
    <CompPaginate
      class="paginate"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-changed="changePage"
    ></CompPaginate>
  </div>
</template>

<script>
import axios from "axios";
import CompPaginate from "../components/CompPaginate.vue";
import CompHeader from "../components/CompHeader.vue";
export default {
  name: "List",
  components: {
    CompPaginate,
    CompHeader,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 12, // Số mục trên mỗi trang
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    fetchProducts() {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=120&offset=0")
        .then((response) => {
          this.products = response.data.results.map((result, index) => ({
            id: index + 1,
            name: result.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          }));
        })
        .catch((error) => {
          console.error("Có lỗi khi gọi API", error);
        });
    },
    showProductDetails(id) {
      this.$router.replace({ path: `/product/${id}` });
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.products.slice(startIndex, endIndex);
    },
  },
};
</script>

<style scoped>
.paginate {
  display: flex;
  justify-content: center;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px;
}
.name {
  display: flex;
  align-content: center;
  justify-content: space-between;
}
.product {
  transition: transform 0.3s ease;
}

.product:hover {
  transform: translateY(-5px);
}
.product {
  width: calc(23% - 20px);
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #ceedf32c;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  color: #504949;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  cursor: pointer;
}

.product img {
  object-fit: cover;
  width: 80%;
  height: 210px;
  object-fit: cover;
}

.product h2 {
  margin-top: 10px;
}
</style>
