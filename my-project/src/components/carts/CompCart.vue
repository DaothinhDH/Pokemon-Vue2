<template>
  <div class="table-container">
    <router-link to="/" class="back-button">⇐ Quay lại</router-link>
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
        <tr v-for="(pokemon, index) in cart" :key="index">
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
            <button class="action-button">Thả</button>
            <button class="action-bt">Nâng cấp</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CompCart",
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
};
</script>



<style>

</style>
