<template>
  <div class="structure">
    <div class="structure__row structure__main-row">
      <p>Название</p>
      <p>Общее кол-во</p>
      <p>Фактическое кол-во</p>
      <p>Действия</p>
    </div>
    <TreeNode
      v-for="(division, index) in divisions.children"
      v-bind:division="division"
      v-bind:path="[index]"
      v-bind:key="index"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import TreeNode from "./TreeNode";

export default {
  computed: mapGetters(["divisions"]),
  components: {
    TreeNode,
  },
};
</script>

<style>
.structure {
  margin-bottom: 40px;
}

.structure__main-row {
  color: #fff;
  background-color: rgb(48, 62, 78);
}

.structure__main-row p {
  border-right: 1px solid #fff;
}

.structure__main-row p:last-of-type {
  border: none;
}

.structure__row {
  display: flex;
  margin: 3px 0;
}

.structure__row p {
  margin: 0;
  padding: 15px 20px;
}

.structure__row:not(.structure__main-row) p:nth-child(1):hover {
  cursor: pointer;
}

.structure__row p:nth-child(1) {
  flex-basis: 50%;
  box-sizing: border-box;
}

.structure__row p:nth-child(2) {
  flex-basis: 20%;
}

.structure__row p:nth-child(3) {
  flex-basis: 20%;
}

.structure__row p:nth-child(4) {
  flex-basis: 10%;
}

@media screen and (max-width: 768px) {
  .structure__row p:nth-child(1) {
    flex-basis: 50%;
    box-sizing: border-box;
  }

  .structure__row p:nth-child(2) {
    flex-basis: 15%;
  }

  .structure__row p:nth-child(3) {
    flex-basis: 0%;
    display: none;
  }

  .structure__row p:nth-child(4) {
    flex-basis: 25%;
  }
}
</style>
