<template>
  <div>
    <img v-if="itemImageData === '' || itemImageData === null || itemImageData === undefined" src="suusarentfrontend\src\assets\suusk.png" class="img" alt="Lisatav varustus">
    <img v-else :src="itemImageData" class="img-thumbnail" alt="Varustuse pilt">
  </div>
</template>

<script>
export default {
  name: 'ItemAddImage',
  props: {
    itemImageData: String
  }
}
</script>