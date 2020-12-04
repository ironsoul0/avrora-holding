<template>
  <div class="add-form">
    <form @submit.prevent="submit">
      <div>
        <input
          class="add-form__input"
          type="text"
          placeholder="Название"
          v-model="name"
        />
        <input
          class="add-form__input"
          type="number"
          placeholder="Фактическое кол-во"
          v-model="fact"
        />
        <select class="add-form__input" v-model="selected">
          <option disabled value="">Выберите родителя</option>
          <option v-bind:value="[]">Отсутствует</option>
          <option
            v-for="option in nestedDivisions"
            v-bind:value="option.path"
            v-bind:key="option.text"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <button
        :disabled="!name || !fact || !selected || fact <= 0"
        class="add-form__submit"
        type="submit"
      >
        Добавить
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: mapGetters(["nestedDivisions"]),
  methods: {
    ...mapMutations(["addDivision"]),
    submit() {
      this.addDivision({
        name: this.name,
        fact: parseInt(this.fact),
        selected: this.selected,
      });

      this.name = "";
      this.fact = "";
      this.selected = "";
    },
  },
  data() {
    return {
      name: "",
      fact: "",
      selected: "",
    };
  },
};
</script>

<style scoped>
.add-form {
  padding: 20px;
}

.add-form__submit {
  border: none;
  padding: 10px 12px;
  opacity: 0.8;
  transition: opacity 0.1s ease-in;
}

.add-form__submit:hover {
  border: none;
  padding: 10px 12px;
  opacity: 1;
  cursor: pointer;
}

.add-form__input {
  width: 200px;
  margin-bottom: 15px;
  padding: 5px 10px;
  outline: none;
  font-size: 14px;
}

.add-form__input:nth-last-of-type(1) {
  margin-left: 20px;
}
</style>
