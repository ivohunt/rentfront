<template>

  <div>

    <Modal :modal-is-open="modalIsOpen"
           @event-close-modal="$emit('event-close-modal')">

      <template #title>
        <h4>Logi välja?</h4>
      </template>

      <template #body>
      </template>

      <template #buttons>
        <button type="button" class="btn btn-outline-secondary me-3" @click="$emit('event-close-modal')">Sulge</button>
        <button type="button" class="btn btn-primary" @click="$emit('event-execute-logout')">Logi välja</button>
      </template>

    </Modal>


  </div>
</template>


<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'LogoutModal',
  components: {Modal},
  props: {
    modalIsOpen: Boolean,
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }
}
</script>