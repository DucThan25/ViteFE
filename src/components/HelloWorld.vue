<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>Xin chào!</h1>

  <div class="card">
    <p>
      Vui lòng chọn chức năng từ menu trái!
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
