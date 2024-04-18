import CompDetails from "../components/product/CompDetails.vue";

export default [
  {
    path: "/product/:id/",
    name: "CompDetails",
    component: CompDetails,
    props: true,
  },
];
