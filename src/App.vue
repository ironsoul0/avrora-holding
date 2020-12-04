<template>
  <div id="app">
    <Header />
    <AddDivision />
    <Table />
  </div>
</template>

<script>
import Header from "./components/Header";
import AddDivision from "./components/AddDivision";
import Table from "./components/Table";

export default {
  name: "App",
  components: { Header, AddDivision, Table },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
