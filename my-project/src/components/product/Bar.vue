<template>
  <div>
    <apexchart
      width="500"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
export default {
  props: {
    pokemon: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    chartOptions() {
      console.log(this.pokemon);
      return {
        chart: {
          id: "vuechart-example",
          width: 100
        },
        xaxis: {
          categories: this.pokemon.map(item => item.stat.name)
        },
        plotOptions: {
          bar: {
            borderRadius: 6,
            dataLabels: {
              position: "center" // top, center, bottom
            }
          }
        }
      };
    },
    series() {
      return [
        {
          name: "value",
          data: this.pokemon.map(item => item.base_stat)
        }
      ];
    }
  }
};
</script>
