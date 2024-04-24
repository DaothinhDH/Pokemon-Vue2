export default {
  data() {
    return {
      inputValue: "",
    };
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    model: {
      get() {
        return this.value || this.inputValue;
      },
      set(value) {
        this.$emit("input", value);
        this.inputValue = value;
      },
    },
  },
};
