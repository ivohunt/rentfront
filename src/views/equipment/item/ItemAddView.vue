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
                          @event-new-category-selected="setCategory"/>

      <EquipmentSizesDropdown :equipmentSizes="equipmentSizes"
                              :selectedEquipmentSizeId="selectedEquipmentSizeId"
                              @event-new-equipment-size-selected="onEquipmentSizeSelected"
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
      selectedCategoryId: 0,
      selectedEquipmentSizeId: 0,
      selectedSizeTypeId:0,

      categories: [
        {
          categoryId: 0,
          categoryName: '',
          price: 0,
          sizeTypeId: 0,
        }
      ],

      equipmentSizes: [
        {
          equipmentSizeId: 0,
          equipmentSizeName: ''
        }
      ]

    };
  },
  methods: {

    getCategories() {
      CategoryService.sendGetCategoriesRequest()
          .then(response => this.categories = response.data)
          .catch(() => NavigationService.navigateToErrorView())
    },

    setCategory(categoryId) {
      this.selectedCategoryId = categoryId
      const selectedCategory = this.categories.find(c => c.categoryId === categoryId);
      if (selectedCategory) {
        this.getEquipmentSizes(selectedCategory.sizeTypeId);
      }
    },

    getEquipmentSizes(sizeTypeId) {
      EquipmentSizeService.sendGetEquipmentSizesRequest(sizeTypeId)
          .then((response) => (this.equipmentSizes = response.data))
          .catch((error) => console.error(error));
    },

    onEquipmentSizeSelected(sizeId) {
      this.selectedEquipmentSizeId = sizeId;
    }

  },


  mounted() {
    this.getCategories()
  }
}
</script>