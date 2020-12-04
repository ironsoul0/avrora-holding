<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3 name="header">Редактирование</h3>
          </div>

          <form @submit.prevent="submit">
            <div class="modal-body">
              <input v-model="name" placeholder="Новое имя" />
              <input
                type="number"
                v-model="fact"
                placeholder="Новое фактическое кол-во"
              />
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <button
                  :disabled="!name || !fact || fact <= 0"
                  class="modal-body__button"
                  type="submit"
                >
                  Изменить
                </button>
                <button
                  class="modal-body__button modal-default-button"
                  v-on:click="toggleOpen()"
                  type="button"
                >
                  Закрыть
                </button>
              </slot>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  methods: {
    ...mapMutations(["toggleOpen", "editDivision"]),
    submit() {
      this.editDivision({
        name: this.name,
        fact: parseInt(this.fact),
        path: this.editPath,
      });
      this.toggleOpen();
    },
  },
  computed: {
    ...mapGetters(["editPath"]),
  },
  data() {
    return {
      name: "",
      fact: "",
    };
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-body input {
  width: 200px;
  margin-bottom: 15px;
  padding: 5px 10px;
  outline: none;
  font-size: 14px;
}

.modal-body__button {
  border: none;
  padding: 7px 12px;
  opacity: 0.8;
  transition: opacity 0.1s ease-in;
  margin-top: 5px;
  font-size: 14px;
}

.modal-body__button:hover {
  border: none;
  opacity: 1;
  cursor: pointer;
}
</style>
