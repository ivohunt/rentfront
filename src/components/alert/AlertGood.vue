<template>
  <div v-if="message.length > 0" class="alert alert-success"  role="alert">
    {{ message }}
  </div>

</template>

<script>
export default {
  name: 'AlertGood',
  props: {
    message: {
      type: String,
      default: ''
    }
  },
}
</script>