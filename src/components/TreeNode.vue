<template>
  <div>
    <div
      class="structure__row"
      v-bind:style="{
        backgroundColor: 'rgba(163,196,250,' + parseInt(depth) / 5 + ')',
      }"
    >
      <p
        v-bind:style="{
          paddingLeft: 20 + parseInt(depth) * 25 + 'px',
        }"
        v-on:click="toggleExpandDivision(path)"
      >
        <i
          v-if="division.children && division.children.length > 0"
          class="fa fa-angle-right structure__icon structure__expander"
          v-bind:style="{
            transform: division.expanded ? 'rotate(90deg)' : '',
          }"
        ></i>
        {{ division.name }}
      </p>
      <p>{{ division.count }}</p>
      <p>{{ division.fact }}</p>
      <p>
        <i
          v-on:click="changeEditPath(path)"
          class="fa fa-pencil structure__icon"
        ></i>
        <i
          v-on:click="deleteDivision(path)"
          class="fa fa-trash structure__icon"
        ></i>
      </p>
    </div>
    <transition name="fade">
      <div
        v-if="division.children && division.children.length > 0"
        v-show="division.expanded"
      >
        <TreeNode
          v-bind:key="child.name"
          v-for="(child, index) in division.children"
          v-bind:division="child"
          v-bind:depth="parseInt(depth) + 1"
          v-bind:path="[...path, index]"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: mapMutations([
    "deleteDivision",
    "toggleExpandDivision",
    "changeEditPath",
  ]),
  props: {
    division: {
      type: Object,
      required: true,
    },
    depth: {
      type: Number,
      default: 0,
    },
    path: {
      type: Array,
      required: true,
    },
  },
  name: "TreeNode",
};
</script>

<style scoped>
.structure__icon {
  font-size: 18px;
}

.structure__icon:nth-child(2) {
  margin-left: 15px;
}

.structure__icon:hover {
  cursor: pointer;
}

.structure__expander {
  margin-right: 20px;
}

@media screen and (max-width: 800px) {
  .structure__row p:nth-child(1) {
    padding-left: 20px !important;
  }
}
</style>
