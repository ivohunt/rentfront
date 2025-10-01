<template>

</template>

<script>
import {useRoute} from "vue-router";

export default {
  name: 'ConfirmOrderView',
  data() {
    return {
      orderId: Number(useRoute().query.orderId)
    }
  },
  methods: {},
  mounted() {
  }
}
</script>