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
import { mapGetters, mapActions } from "vuex";
import { DOI_DAU } from "../js/pokemon";
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
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
    // this.updatePokemonList();
  },
  methods: {
    ...mapActions({
      releasePokemon: "releasePokemon",
    }),
    openPopup() {
      this.popupVisible = true;
    },
    closePopup() {
      this.popupVisible = false;
    },
    attackPokemon(attackPokemon) {
      console.log("Tấn công", attackPokemon);
      console.log("Phòng thủ", this.item);
      const defender = this.item;
      const attackType = attackPokemon.types[0];
      let attackerAttackStat = attackPokemon.stats.find(
        (stat) => stat.stat.name === "attack"
      ).base_stat;
      const attackerHpStat = attackPokemon.stats.find(
        (stat) => stat.stat.name === "hp"
      ).base_stat;
      const attackerDefenseStat = attackPokemon.stats.find(
        (stat) => stat.stat.name === "defense"
      ).base_stat;
      const defenderType = defender.types[0];
      const defenderAttackStat = defender.stats.find(
        (stat) => stat.stat.name === "attack"
      ).base_stat;
      const defenderHpStat = defender.stats.find(
        (stat) => stat.stat.name === "hp"
      ).base_stat;
      const defenderDefenseStat = defender.stats.find(
        (stat) => stat.stat.name === "defense"
      ).base_stat;
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        this.$toast.open({
          type: "error",
          message: "Đăng nhập để chơi game",
          duration: 2000,
        });
        return this.$$router.push("/login");
      }
      const heSoDamage = DOI_DAU[attackType][defenderType];
      const finalDamage = attackerAttackStat * heSoDamage;
      const result = finalDamage - (defenderHpStat + defenderDefenseStat);
      if (result >= 0) {
        this.$toast.open({
          type: "success",
          message: "Chúc mừng Pokemon của bạn đã chiến thắng !",
          duration: 2000,
        });
      } else {
        const indexToRemove = this.cartList.findIndex(
          (item) => item.id === attackPokemon.id
        );
        this.releasePokemon(indexToRemove);
        this.$toast.open({
          type: "error",
          message: "Rất tiếc Pokemon của bạn đã bị đánh bại !",
          duration: 2000,
        });
      }
      this.popupVisible = false;
    },
  },
  mounted() {
    console.log("item", this.item);
  },
};
</script>
