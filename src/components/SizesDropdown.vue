<template>
  <div>
    <select :value="selectedSizeType" @change="handleSizeDropdownChange" class="form-select">
      <option v-for="size in sizes" :key="size.sizeType" :value="size.sizeType">{{ size.sizeType }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SizesDropdown',
  props: {
    sizes: Array,
    selectedSizeType: {
      type: String,
      default: ''
    }
  },

  data() {
    return {}
  },
  methods: {
    handleSizeDropdownChange(event) {
      this.$emit('event-new-sizetype-selected', String(event.target.value))
    }
  },
  mounted() {
  }
}
</script>