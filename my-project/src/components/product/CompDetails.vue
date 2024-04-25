<template>
  <v-app>
    <v-main>
      <div>
        <Comp-header />
        <div class="details">
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
                  <div class="btn">
                    <button
                      :class="index === 0 ? 'primary' : 'purple'"
                      class="type-button"
                      v-for="(item, index) in details.types"
                      :key="index"
                    >
                      {{ item }}
                    </button>
                  </div>
                  <div class="aa2">
                    <img
                      @click="handleRandom()"
                      src="https://tse4.explicit.bing.net/th?id=OIP.73QAEFCZ5Go_d9q054dD2wHaFv&pid=Api&P=0&h=180"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div class="stats">
                <h2>Stats</h2>
                <div class="chart">
                  <Bar :pokemon="details.stats" />
                </div>
              </div>
            </div>
          </div>

          <v-alert
            v-if="!showEditForm && showAlert"
            type="error"
            dismissible
            @input="showAlert = false"
            >Không bắt được Pokémon!</v-alert
          >

          <v-dialog v-model="showEditForm" max-width="500px">
            <v-card>
              <div class="edit-form">
                <h3 class="title">
                  Bạn đã bắt được pokémon, hãy đặt tên cho nó!
                </h3>
                <div>
                  <input
                    class="input"
                    type="text"
                    v-model="editedName"
                    placeholder="Tên mới"
                  />
                </div>
                <div>
                  <button class="button primary" @click="saveName">Lưu</button>
                  <button class="button error" @click="cancelEdit">Hủy</button>
                </div>
              </div>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import { fetchPokemonDetails } from "../../api/api";
import CompHeader from "../CompHeader.vue";
import Bar from "./Bar.vue";
export default {
  name: "Details",
  components: { Bar, CompHeader },
  data() {
    return {
      details: null,
      showEditForm: false,
      editedName: "",
      showAlert: false,
      stats: [],
    };
  },
  created() {
    this.fetchDetails();
  },
  methods: {
    fetchDetails() {
      const id = this.$route.params.id;
      fetchPokemonDetails(id)
        .then((details) => {
          this.details = details;
          this.stats = details.stats;
          console.log("stats", details);
        })
        .catch((error) => {
          console.error("Lỗi khi tìm thông tin pokemon ", error);
        });
    },
    ...mapActions(["addToCart"]),
    handleRandom() {
      const catchSuccess = Math.random() < 0.5;

      if (catchSuccess) {
        this.showEditForm = true;
        this.showAlert = false;
      } else {
        this.showEditForm = false;
        this.$toast.open({
          type: "error",
          message: "Không bắt được pokemon",
          position: "top-right",
          duration: 2000,
        });
      }
    },
    saveName() {
      this.addToCart({
        id: this.details.id,
        name: this.editedName,
        image: this.details.image,
        types: this.details.types,
        date: new Date().toLocaleString(),
        ...this.details,
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
.details {
  padding-left: 170px;
}
.btn{
  display: flex;
  gap: 20px;
}
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
  margin: 20px;
  padding-left: 70px;

}
.aa2 > img {
  width: 28%;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}
.type-button,
.action-button {
  width: 100px;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  color: rgb(249, 250, 247) !important;

}
.aa2 > img:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 0px 8px 16px;
}

.aa1 h2 {
  margin-bottom: 1rem;
}

/* .aa1 button {
  color: rgba(197, 20, 20, 0.788);
  background-color: rgba(0, 0, 0.5, 0.3);
  padding: 0.5rem;
  border-radius: 5px;
  border-radius: 1px #6c6868;
} */

/* .aa1 button:hover {
  color: black;
} */

/* .btn-a {
  background: #77c856;
  cursor: pointer;
}

.btn-a:hover {
  background: #3f6c2c;
} */

/* .btn-b {
  background: #9f409f;
  cursor: pointer;
}

.btn-b:hover {
  background: #4d1d4d;
} */

.name {
  display: flex;
  justify-content: center;
  gap: 5rem;
}

img {
  width: 400px;
  object-fit: cover;
}
.edit-form {
  text-align: center;
  padding: 20px;
}
.button {
  padding: 8px 32px;
  border-radius: 4px;
  color: white;
  font-weight: 500;
  margin-top: 16px;
}
.input {
  margin: 10px 0;
  border: 1px solid #ccc;
  width: 100%;
  padding: 8px 6px;
  border-radius: 6px;
}
</style>
