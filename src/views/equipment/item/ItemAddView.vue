<template>

  <div>
    <div>
      <div class="row col-4 mx-auto">
        <AlertGood :message="successMessage"/>
      </div>

      <h1>
        Uue ühiku lisamine
      </h1>
    </div>

    <div>

      <div :style="{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '5px'}">
        <ItemAddImg :image-data="item.itemImageData"/>
        <div :style="{ display: 'flex', justifyContent: 'left', gap: '0px', marginTop: '200px' }" class="col-2">
          <ImageInput @event-new-image-selected="setItemAddImageData"/>
        </div>
      </div>

      <div class="row col-4 mx-auto">





        <CategoriesDropdown class="mb-3"
                            :categories="categories"
                            :selectedCategoryId="item.categoryId"
                            @event-new-category-selected="handleSelectedCategoryChange"/>

        <EquipmentSizesDropdown :selected-size-type-id="selectedSizeTypeId"
                                :selected-equipment-size-id="item.equipmentSizeId"
                                @event-new-equipment-size-selected="onEquipmentSizeSelected"
        />
      </div>



      <div :style="{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '5px'}">
        <div class="form-floating mt-5 mb-5">
          <div class="row mt-5 mb-5 justify-content-center">
            <div class="col-4">
              <input v-model="item.notes" type="text"
                     class="form-control form-control-text border border-secondary rounded px-100" placeholder="Notes">
            </div>
          </div>

          <button @click="addItem" type="submit" class="btn btn-primary">Lisa</button>
        </div>
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
import ItemService from "@/service/ItemService";
import ImageInput from "@/components/image/ImageInput.vue";
import ItemAddImg from "@/components/image/ItemAddImg.vue";
import AlertGood from "@/components/alert/AlertGood.vue";

export default {
  name: 'AddItemView',

  components: {AlertGood, ItemAddImg, ImageInput, EquipmentSizesDropdown, CategoriesDropdown},
  data() {
    return {
      successMessage: '',

      selectedSizeTypeId: 0,

      item: {
        categoryId: 0,
        notes: '',
        equipmentSizeId: 0,
        itemImageData: '',
      },


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
    };
  },
  methods: {
    getCategories() {
      CategoryService.sendGetCategoriesRequest()
          .then(response => this.categories = response.data)
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleSelectedCategoryChange(categoryId) {
      this.item.categoryId = categoryId
      const selectedCategory = this.categories.find(c => c.categoryId === categoryId);
      this.selectedSizeTypeId = selectedCategory.sizeTypeId
    },

    getEquipmentSizes(sizeTypeId) {
      EquipmentSizeService.sendGetEquipmentSizesRequest(sizeTypeId)
          .then(response => this.equipmentSizes = response.data)
          .catch(error => NavigationService.navigateToErrorView());
    },

    onEquipmentSizeSelected(sizeId) {
      this.item.equipmentSizeId = sizeId;
    },

    addItem() {
      ItemService.sendPostAddItem(this.item)
          .then(() => this.successMessage = "Varustus lisatud",
              this.item = {
                categoryId: 0,
                notes: '',
                equipmentSizeId: 0,
                itemImageData: '',
              })
          .catch(() => NavigationService.navigateToErrorView())
    },

    setItemAddImageData(itemImageData) {
      this.item.itemImageData = itemImageData
    },
  },


  mounted() {
    this.getCategories()
  }
}
</script>