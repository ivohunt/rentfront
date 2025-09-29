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
                          :selectedCategoryId="item.categoryId"
                          @event-new-category-selected="onCategorySelected"/>

      <EquipmentSizesDropdown :selectedSizeTypeId="item.sizeTypeId"
                              :selectedEquipmentSizeId="item.equipmentSizeId"
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
      categories: [],
      item: {
        categoryId: 0,
        sizeTypeId: 0,
        equipmentSizeId: 0,
      }
    };
  },
  methods: {

    getCategories() {
      CategoryService.sendGetCategoriesRequest()
          .then(response => this.categories = response.data)
          .catch(() => NavigationService.navigateToErrorView())
    },

    onCategorySelected(categoryId) {
      const category = this.categories.find((c) => c.categoryId === categoryId);
      if (category) {
        this.item.categoryId = category.categoryId;
        this.item.sizeTypeId = category.sizeTypeId;
        this.item.equipmentSizeId = 0; // reset previous selection
      }
    },


    onEquipmentSizeSelected(equipmentSizeId) {
      this.item.equipmentSizeId = equipmentSizeId;
    },

  },


  mounted() {
    this.getCategories()
  }
}
</script>