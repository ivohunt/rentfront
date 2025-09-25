<template>
  <div>
    <select :value="selectedSizeTypeId" @change="handleSizeDropdownChange" class="form-select">
      <option disabled :value="0">Vali suuruste tüüp</option>
      <option v-for="size in sizes" :key="size.sizeTypeId" :value="size.sizeTypeId">{{ size.sizeTypeName }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SizesDropdown',
  props: {
    sizes: Array,
    selectedSizeTypeId: {
      type: Number,
      default: 'default'
    }
  },

  data() {
    return {}
  },
  methods: {
    handleSizeDropdownChange(event) {
      this.$emit('event-new-sizetype-selected', Number(event.target.value))
    }
  },
  mounted() {
  }
}
</script>