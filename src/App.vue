<template>
  <div id="app">
    <Header />
    <AddDivision />
    <Table />
    <Modal v-if="isOpen" />
    <ForkMe />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Header from "./components/Header";
import AddDivision from "./components/AddDivision";
import Table from "./components/Table";
import Modal from "./components/Modal";
import ForkMe from "./components/ForkMe";

export default {
  name: "App",
  computed: mapGetters(["isOpen"]),
  components: { Header, AddDivision, Table, Modal, ForkMe },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
