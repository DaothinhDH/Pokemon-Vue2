import axios from "axios";

const fetchProducts = () => {
  return axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=120&offset=0")
    .then((response) => {
      return response.data.results.map((result, index) => ({
        id: index + 1,
        name: result.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
        // abilities: data.abilities.map((ability) => ability.ability.name),
      }));
    })
    .catch((error) => {
      console.error("Có lỗi khi gọi API", error);
      return [];
    });
};

export { fetchProducts };

const fetchPokemonDetails = (id) => {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`) 
    .then((res) => {
      const data = res.data;
      return {
        id: id,
        name: data.name,
        image: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((ability) => ability.ability.name),
      };
    })
    .catch((error) => {
      console.error("Error fetching Pokemon details: ", error);
      return null;
    });
};

export { fetchPokemonDetails };
