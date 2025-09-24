<template>
  <div>
    <div class="row col-6 mx-auto">

      <AlertSad :message="errorMessage"/>
      <AlertGood :message="successMessage"/>

      <div class="col">
        <div class="form-floating mb-3">
          <input v-model="category.name" type="text" class="form-control" placeholder="Kategooria nimi">
          <label for="floatingInput">Kategooria nimi</label>
        </div>
      </div>

      <div class="col">
        <div class="form-floating">
          <div class="form-floating mb-3">
            <input v-model="category.price" type="text" class="form-control" placeholder="Hind">
            <label for="floatingInput">Hind</label>
          </div>
        </div>
      </div>

      <div class="col">
        <div>
          <SizesDropdown :sizes="sizes" :selected-size-type="category.sizeType"
                         @event-new-sizetype-selected="setSizeType"/>
        </div>
      </div>

      <div class="col">
        <button @click="addCategory" class="btn btn-outline-primary" type="submit">Lisa</button>
      </div>

    </div>

  </div>
</template>

<script>
import AlertSad from "@/components/alert/AlertSad.vue";
import AlertGood from "@/components/alert/AlertGood.vue";
import PriceService from "@/service/PriceService";
import NavigationService from "@/service/NavigationService";
import SizesDropdown from "@/components/SizesDropdown.vue";
import {toValue} from "vue";

export default {
  name: 'PriceEditView',
  components: {SizesDropdown, AlertGood, AlertSad},
  data() {
    return {

      errorMessage: '',
      successMessage: '',
      selectedSizeType: '',

      sizes: {
        sizeType: ''
      },

      category: {
        name: '',
        price: '',
        sizeType:''


      }
    }
  },

  methods:
      {
        addCategory() {
          this.findIfFieldsAreFilled()
          if (this.errorMessage === '') {
            PriceService.sendPostAddCategoryRequest(this.category)
                .then(() => this.handleAddCategoryResponse())
                .catch(error => this.handleAddCategoryError(error))
          }
        },

        findIfFieldsAreFilled() {
          if (this.category.name === '') {
            this.errorMessage = "Sisesta kategooria nimi"
          } else if (this.category.price === 0) {
            this.errorMessage = "Sisesta kategooria päevahind"
          }
          setTimeout(this.resetErrorMessage, 4000)
        },

        handleAddCategoryResponse() {
          this.successMessage = "Kategooria lisatud"
        },

        handleAddCategoryError(error) {
          this.errorResponse = error.response.data
          if (error.response.status === 403 && this.errorResponse.errorCode === 222) {
            this.errorMessage = this.errorResponse.errorMessage
            setTimeout(this.resetErrorMessage, 4000)
          } else NavigationService.navigateToErrorView()
        },

        resetErrorMessage() {
          this.errorMessage = ''
        },

        getSizeTypes() {
          PriceService.sendGetSizeTypesRequest()
              .then(response => this.sizes = response.data)
              .catch(() => NavigationService.navigateToErrorView())
        },

        setSizeType(newSizeType) {
          this.category.sizeType = newSizeType
         },

      }
  ,
  beforeMount() {
    this.getSizeTypes()
  },

  mounted() {
  }
}
</script>