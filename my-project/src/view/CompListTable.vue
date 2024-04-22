<template>
  <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="desserts" :search="search">
      <template v-slot:item.image="{ item }">
        <img :src="item.image" alt="Pokemon" height="50px" width="50px" />
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn color="primary" small @click="performAction(item)">Action</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { fetchProducts } from "../api/api";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "IMAGE", value: "image" },
        { text: "NAME", value: "name" },
        { text: "TYPE", value: "type" },
        { text: "ACTION", value: "action" },
      ],
      desserts: [],
    };
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      fetchProducts()
        .then((products) => {
            this.desserts = products;
          console.log(products);
        })
        .catch((error) => {
          console.error("Error loading products:", error);
        });
    },
    performAction(item) {
      console.log("Perform action for item:", item);
    },
  },
};
</script>

<style scoped>
</style>
