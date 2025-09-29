<template>
  <div>
<!--    todo: eemalda productionist-->
<!--    1,Suusa suurused-->
<!--    2,Saapa suurused-->
<!--    3,Laua suurused-->
<!--    4,Kiivri suurused-->
    <select :value="selectedCategoryId" @change="handleCategoryDropdownChange" class="form-select">
      <option disabled :value="0">Vali kategooria</option>
      <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">{{ category.categoryName }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CategoriesDropdown',
  props: {
    categories: Array,
    selectedCategoryId: {
      type: Number,
      default: 'default'
    }
  },

  data() {
    return {}
  },
  methods: {
    handleCategoryDropdownChange(event) {
      this.$emit('event-new-category-selected', Number(event.target.value))
    }
  },
  mounted() {
  }
}
</script>