<template>
  <v-app>
    <v-main>
      <div>
        <v-btn @click="openPopup">Attack</v-btn>

        <v-dialog v-model="popupVisible" max-width="800px">
          <v-card>
            <v-card-title>
              <span class="headline">Danh sách Pokémon trong giỏ hàng</span>
            </v-card-title>
            <v-card-text>
              <v-data-table :headers="headers" :items="cartList" item-key="id">
                <template v-slot:item.actions="{ item }">
                  <v-btn color="primary" @click="attackPokemon(item)"
                    >Tấn công</v-btn
                  >
                </template>
                <template v-slot:item.image="{ item }">
                  <img
                    :src="item.image"
                    alt="Pokemon"
                    height="50px"
                    width="50px"
                  />
                </template>
                <template v-slot:item.type="{ item }">
                  <v-btn
                    :class="index === 0 ? 'primary' : 'purple'"
                    variant="outlined"
                    size="small"
                    v-for="(type, index) in item.types"
                    :key="index"
                    >{{ type }}</v-btn
                  >
                </template>
              </v-data-table>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text @click="closePopup">Đóng</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-main>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["totalItemsInCart", "cartList"]),
  },
  data() {
    return {
      popupVisible: false,
      headers: [
        { text: "ID", align: "start", value: "id" },
        { text: "Image", value: "image" },
        { text: "Name", value: "name" },
        { text: "Type", value: "type" },
        { text: "Hành động", value: "actions", sortable: false },
      ],
      pokemonList: [],
    };
  },
  created() {
    this.updatePokemonList();
  },
  methods: {
    openPopup() {
      this.popupVisible = true;
    },
    closePopup() {
      this.popupVisible = false;
    },
    attackPokemon(selectedPokemon) {
      console.log("Tấn công", selectedPokemon);
      this.popupVisible = false;
    },
  },
  mounted() {
    console.log(this.cartList);
  },
};
</script>
