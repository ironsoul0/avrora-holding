<template>
  <div class="add-form">
    <form @submit.prevent="submit">
      <button class="add-form__submit" type="submit">Добавить</button>
    </form>
  </div>
</template>

<style scoped>
.add-form {
  padding: 20px;
}

.add-form__submit {
  border: none;
  padding: 10px 8px;
}
</style>
