<template>

  <div>
    <div>
      <h1>
        Uue ühiku lisamine
      </h1>
    </div>
    <div class="row col-4 mx-auto">


      <ItemAddImg :image-data="temp"/>

      <ImageInput @event-new-image-selected="setItemAddImageData"/>

      <CategoriesDropdown class="mb-3"
                          :categories="categories"
                          :selectedCategoryId="selectedCategoryId"
                          @event-new-category-selected="setCategory"/>

      <EquipmentSizesDropdown :equipmentSizes="equipmentSizes"
                              :selectedEquipmentSizeId="selectedEquipmentSizeId"
                              @event-new-equipment-size-selected="onEquipmentSizeSelected"
      />
    </div>

    <div class="row mt-5 mb-5 justify-content-center">
      <div class="col-4">
        <input type="text" class="form-control form-control-text border border-secondary rounded px-100" placeholder="Notes">
      </div>
    </div>



    <div>
      <div class="form-floating mt-5">
        <button @click="handleAddItemResponse" type="submit" class="btn btn-primary">Lisa</button>
      </div>
    </div>


  </div>

</template>

<script>
import CategoriesDropdown from "@/components/CategoriesDropdown.vue";
import EquipmentSizesDropdown from "@/components/EquipmentSizesDropdown.vue";
import CategoryService from "@/service/CategoryService";
import NavigationService from "@/service/NavigationService";
import EquipmentSizeService from "@/service/EquipmentSizeService";
import itemAddService from "@/service/ItemAddService";
import ImageInput from "@/components/image/ImageInput.vue";
import ItemAddImg from "@/components/image/ItemAddImg.vue";

export default {
  name: 'AddItemView',

  components: {ItemAddImg, ImageInput, EquipmentSizesDropdown, CategoriesDropdown},
  data() {
    return {
      selectedCategoryId: 0,
      selectedEquipmentSizeId: 0,
      selectedSizeTypeId:0,

      addable: [{
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
        ],
      }]

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
    },

    handleAddItemResponse() {
      itemAddService.sendPostAddItem(this.selectedEquipmentSizeId)
      this.successMessage = "Varustus lisatud"
    },

    setItemAddImageData(itemImageData) {
      this.addable.itemImageData = itemImageData
    },
  },



  mounted() {
    this.getCategories()
  }
}
</script>