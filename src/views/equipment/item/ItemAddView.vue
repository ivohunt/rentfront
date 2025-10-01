<template>

  <div>
    <div>
      <h1>
        Uue ühiku lisamine
      </h1>
    </div>
    <div class="row col-4 mx-auto">

      <ItemAddImage :image-data="addedImage"/>
      <div>
        <div class="row mt-5 mb-5 justify-content-center">
          <input ref="fileInput" class="form-control" type="file" @change="handleImage" accept="image/png,image/jpeg,image/gif">
        </div>
      </div>

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
import ItemAddImage from "@/views/equipment/item/ItemAddImage.vue";
import itemAddService from "@/service/ItemAddService";

export default {
  name: 'AddItemView',

  components: {EquipmentSizesDropdown, CategoriesDropdown, ItemAddImage},
  props: {
    addedImage: Object
  },

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

    handleImage(event) {
      const selectedImage = event.target.files[0];
      this.emitBase64(selectedImage);
    },

    emitBase64(fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        let imageDataBase64 = reader.result;
        this.$emit('event-new-image-selected', imageDataBase64)
      };
      reader.onerror = function (error) {
        alert(error);
      }
      reader.readAsDataURL(fileObject);
    },

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

    handleAddItemResponse(categories, equipmentSizes) {
      itemAddService.sendPostAddItem(categories, equipmentSizes)
      this.successMessage = "Varustus lisatud"
    }

  },


  mounted() {
    this.getCategories()
  }
}
</script>