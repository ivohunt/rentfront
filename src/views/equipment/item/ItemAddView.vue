<template>

  <div>
    <div>
      <h1>
        Uue ühiku lisamine
      </h1>
    </div>
    <div class="row col-4 mx-auto">
      <CategoriesDropdown class="mb-3"
                          :categories="categories"
                          :selectedCategoryId="selectedCategoryId"
                          @event-new-category-selected="onCategorySelected"/>

      <EquipmentSizesDropdown v-if="equipmentSizes.length > 0"
                              :equipmentSizes="equipmentSizes"
                              :selected-size-type-id="selectedSizeTypeId"
                              @event-new-sizetype-selected="onSizeSelected"
      />
    </div>


  </div>

</template>

<script>
import CategoriesDropdown from "@/components/CategoriesDropdown.vue";
import EquipmentSizesDropdown from "@/components/EquipmentSizesDropdown.vue";
import CategoryService from "@/service/CategoryService";
import NavigationService from "@/service/NavigationService";
import EquipmentSizeService from "@/service/EquipmentSizeService";

export default {
  name: 'AddItemView',

  components: {EquipmentSizesDropdown, CategoriesDropdown},
  data() {
    return {
      categories: Array,
      equipmentSizes: Array,
      selectedCategoryId: 0,
      selectedEquipmentSizeId: 0,

    }
  },
  methods: {

    getCategories() {
      CategoryService.sendGetCategoriesRequest()
          .then(response => this.categories = response.data)
          .catch(() => NavigationService.navigateToErrorView())
    },

    onCategorySelected(categoryId) {
      this.selectedCategoryId = categoryId
      EquipmentSizeService.sendGetEquipmentSizesRequest(categoryId)
          .then(response => {
            this.equipmentSizes = response.data;
            this.selectedEquipmentSizeId = 0;
          })
          .catch(() => NavigationService.navigateToErrorView())
    },

    getEquipmentSizes(sizeTypeId) {
      EquipmentSizeService.sendGetEquipmentSizesRequest(sizeTypeId)
          .then(response => this.equipmentSizes = response.data)
          .catch(() => NavigationService.navigateToErrorView())
    },

    onEquipmentSizeSelected(sizeId) {
      this.selectedEquipmentSizeId = sizeId;
      console.log("Selected size ID:", sizeId)
    },

  },


  mounted() {
    this.getCategories()
  }
}
</script>