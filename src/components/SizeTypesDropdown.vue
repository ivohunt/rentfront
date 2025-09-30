<template>
  <div>
<!--    todo: eemalda productionist-->
<!--    1,Suusa suurused-->
<!--    2,Saapa suurused-->
<!--    3,Laua suurused-->
<!--    4,Kiivri suurused-->

    <select :value="selectedSizeTypeId" @change="handleSizeDropdownChange" class="form-select">
      <option disabled :value="0">Vali suuruste tüüp</option>
      <option v-for="sizeType in sizeTypes" :key="sizeType.sizeTypeId" :value="sizeType.sizeTypeId">{{ sizeType.sizeTypeName }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SizeTypesDropdown',
  props: {
    sizeTypes: Array,
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