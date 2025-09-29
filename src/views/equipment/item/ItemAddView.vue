<template>

  <div>
    <div>
      <h1>
        Uue ühiku lisamine
      </h1>
    </div>
    <div class="row col-4 mx-auto">
      <CategoriesDropdown class="mb-3" :categories="categories"
                          @event-new-category-selected="equipmentSizesDropdown.methods.getEquipmentSizes()"/>
      <EquipmentSizesDropdown :equipmentSizes="equipmentSizes"/>
    </div>


  </div>

</template>

<script>
import CategoriesDropdown from "@/components/CategoriesDropdown.vue";
import EquipmentSizesDropdown from "@/components/EquipmentSizesDropdown.vue";
import CategoryService from "@/service/CategoryService";
import NavigationService from "@/service/NavigationService";
import equipmentSizesDropdown from "@/components/EquipmentSizesDropdown.vue";

export default {
  name: 'AddItemView',
  computed: {
    equipmentSizesDropdown() {
      return equipmentSizesDropdown
    }
  },

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