<template>
  <div class="mt-5 mb-2">
    <img v-if="imageData === '' || imageData === null || imageData === undefined"  src="../../assets/suusk.png" class="img-thumbnail" alt="Varustuse pilt">
    <img v-else :src="imageData" class="img-thumbnail" alt="Varustuse pilt">
  </div>
</template>
<script>
export default {
  name: 'ItemAddImg',
  props: {
    imageData: String
  }
}
</script>