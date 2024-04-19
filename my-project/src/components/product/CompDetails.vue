<template>
  <div class="details">
    <router-link to="/" class="back-button">⇐ Quay lại</router-link>

    <div class="container" v-if="details">
      <div class="label">
        <h2>{{ details.name.toUpperCase() }}</h2>
      </div>

      <div class="name">
        <div class="img">
          <img :src="details.image" alt="" />
        </div>

        <div class="box">
          <div class="box1">
            <div class="aa">
              <h4>Height</h4>
              <span>{{ details.height }}</span>
              <h4>Weight</h4>
              <span>{{ details.weight }}</span>
            </div>

            <div>
              <h4>Abilities</h4>
              <span>{{ details.abilities.join(" / ") }}</span>
            </div>
          </div>

          <div class="aa1">
            <h2>Type</h2>
            <div class="aa2">
              <button @click="handleRandom()" class="btn-a">Bắt pokemon</button>
            </div>
          </div>
        </div>

        <div class="stats">
          <h2>Stats</h2>
          <div class="chart">
            <p>1</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showEditForm" class="edit-form">
      <h3>Bạn đã bắt được pokomen hãy đặt tên cho nó !</h3>
      <input type="text" v-model="editedName" placeholder="Tên mới" />
      <button @click="saveName">Lưu</button>
      <button @click="cancelEdit">Hủy</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "Details",
  data() {
    return {
      details: null,
      showEditForm: false,
      editedName: "",
    };
  },
  mounted() {
    this.fetchDetails();
  },
  methods: {
    fetchDetails() {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
        .then((res) => {
          const data = res.data;
          this.details = {
            id: this.$route.params.id,
            name: data.name,
            image: data.sprites.front_default,
            height: data.height,
            weight: data.weight,
            abilities: data.abilities.map((ability) => ability.ability.name),
          };
        })
        .catch((error) => {
          console.error("Error fetching Pokemon details: ", error);
        });
    },
    ...mapActions(["addToCart"]),
    handleRandom() {
      const catchSuccess = Math.random() < 0.5;

      if (catchSuccess) {
        this.showEditForm = true;
      } else {
        alert("Không bắt được Pokémon!");
      }
    },
    saveName() {
      this.addToCart({
        id: this.details.id,
        name: this.editedName,
        image: this.details.image,
        date: new Date().toLocaleString(),
      });

      this.showEditForm = false;
    },

    cancelEdit() {
      this.showEditForm = false;
    },
  },
};
</script>

<style scoped>
.buttuon-go {
  display: flex;
  justify-content: center;
}
.buttuon-go > button {
  background-color: #ec2f0e;
  font-size: 20px;
  color: #dff134fd;
}
.back-button {
  display: inline-block;
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}
.pokemon-image {
  max-width: 100%;
  height: auto;
}
* {
  box-sizing: border-box;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

.label h2 {
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 1rem;
}

.box {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.box h4 {
  color: white;
}

.box1 {
  display: flex;
  justify-content: space-evenly;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  gap: 10rem;
  background: #31a7d6ce;
  border-radius: 20px;
  padding: 1.5rem;
  color: #ee1a4f;
}

.aa2 {
  display: flex;
  gap: 1rem;
}

.aa1 h2 {
  margin-bottom: 1rem;
}

.aa1 button {
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px #6c6868;
}

.aa1 button:hover {
  color: black;
}

.btn-a {
  background: #77c856;
  cursor: pointer;
}

.btn-a:hover {
  background: #3f6c2c;
}

.btn-b {
  background: #9f409f;
  cursor: pointer;
}

.btn-b:hover {
  background: #4d1d4d;
}

.name {
  display: flex;
  justify-content: center;
  gap: 5rem;
}

img {
  width: 400px;
  object-fit: cover;
}
</style>
