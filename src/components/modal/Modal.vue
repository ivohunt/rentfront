<template>
  <!-- Modal -->
  <div v-if="modalIsOpen" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <slot name="title"></slot>
          <button type="button" class="btn-close" @click="$emit('event-close-modal')" aria-label="Sulge"></button>
        </div>


        <div class="modal-body">
          <slot name="body"></slot>
        </div>


        <div class="modal-footer">
          <slot name="footer"></slot>
          <button type="button" class="btn btn-secondary" @click="$emit('event-close-modal')">Sulge</button>
        </div>


      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Modal',
  props: {
    modalIsOpen: Boolean,
  },

  data() {
    return {
    }
  },
  methods: {},
  mounted() {
  }
}
</script>