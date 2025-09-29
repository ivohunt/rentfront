<template>

  <div>
    <div>
      <h1>
        Uue ühiku lisamine
      </h1>
    </div>
    <div class="row col-4 mx-auto">
      <CategoriesDropdown class="mb-3" :categories="categories" />
      <EquipmentSizesDropdown/>
    </div>


  </div>

</template>

<script>
import CategoriesDropdown from "@/components/CategoriesDropdown.vue";
import EquipmentSizesDropdown from "@/components/EquipmentSizesDropdown.vue";
import CategoryService from "@/service/CategoryService";
import NavigationService from "@/service/NavigationService";

export default {
  name: 'AddItemView',
  components: {EquipmentSizesDropdown, CategoriesDropdown},
  data() {
    return {
      categories: Array,
      equipmentSizes: Array,

    }
  },
  methods: {

    getCategories() {
      CategoryService.sendGetCategoriesRequest()
          .then(response => this.categories = response.data)
          .catch(() => NavigationService.navigateToErrorView())
    },

  },
  mounted() {
    this.getCategories()
  }
}
</script>