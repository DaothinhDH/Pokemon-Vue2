<template>
  <div>
    <CompHeader />
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
</template>

<script>
import { fetchProducts } from "../api/api";
import CompHeader from "../components/CompHeader.vue";
export default {
  name: "List",
  components: {
    CompHeader,
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 12,
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    changePage(page) {
      this.page = page;
    },
    fetchProducts() {
      fetchProducts()
        .then((products) => {
          this.products = products;
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
      const startIndex = (this.page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.products.slice(startIndex, endIndex);
    },
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px;
}
.name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
.product {
  transition: transform 0.3s ease;
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

.product:hover {
  transform: translateY(-5px);
}

.product img {
  object-fit: cover;
  width: 80%;
  height: 210px;
  object-fit: cover;
}

.custom-pagination {
  margin-top: 20px;
}
</style>
