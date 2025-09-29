<template>
  <div>

    <div>
      <table class="table w-25 mx-auto">
        <thead>
        <tr>
          <th scope="col">Kategooria</th>
          <th scope="col">Hind</th>
          <th scope="col">Muuda</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categories">
          <th scope="row">{{ category.categoryName }}</th>
          <td>{{ category.price }}</td>
          <td>
            <font-awesome-icon @click="editCategory" class="mx-3" type="button" icon="fa-sharp fa-pen-to-square"/>
            <font-awesome-icon @click="deleteCategory" type="button" icon="fa-sharp fa-trash"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>


    <div class="row col-6 mx-auto">

      <AlertSad :message="errorMessage"/>
      <AlertGood :message="successMessage"/>

      <div class="col">
        <div class="form-floating mb-3">
          <input v-model="category.categoryName" type="text" class="form-control" placeholder="Kategooria nimi">
          <label for="floatingInput">Kategooria nimi</label>
        </div>
      </div>

      <div class="col">
        <div class="form-floating">
          <div class="form-floating mb-3">
            <input v-model="category.price" type="number" class="form-control" placeholder="Hind">
            <label for="floatingInput">Hind</label>
          </div>
        </div>
      </div>

      <div class="col">
        <div>
          <SizesDropdown :sizes="sizes" :selectedSizeTypeId="category.sizeTypeId"
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
import CategoryService from "@/service/CategoryService";
import NavigationService from "@/service/NavigationService";
import SizesDropdown from "@/components/SizesDropdown.vue";
import SizeTypeService from "@/service/SizeTypeService";

export default {
  name: 'PriceEditView',
  components: {SizesDropdown, AlertGood, AlertSad},
  data() {
    return {

      errorMessage: '',
      successMessage: '',
      selectedSizeType: '',

      sizes: [
        {
          sizeTypeId: 0,
          sizeTypeName: ''
        }
      ],

      categories: [
        {
          categoryId: 0,
          categoryName: '',
          price: 0
        }
      ],

      category: {
        categoryName: '',
        price: 0,
        sizeTypeId: 0
      }
    }
  },

  methods:
      {
        addCategory() {
          this.findIfFieldsAreFilled()
          if (this.errorMessage === '') {
            CategoryService.sendPostAddCategoryRequest(this.category)
                .then(() => this.handleAddCategoryResponse())
                .catch(error => this.handleAddCategoryError(error))
          }
        },

        findIfFieldsAreFilled() {
          if (this.category.categoryName === '') {
            this.errorMessage = "Sisesta kategooria nimi"
          } else if (this.category.price === 0) {
            this.errorMessage = "Sisesta kategooria päevahind"
          }
          setTimeout(this.resetErrorMessage, 4000)
        },

        handleAddCategoryResponse() {
          this.successMessage = "Kategooria lisatud"
          setTimeout(this.resetSuccessMessage, 4000)
        },

        handleAddCategoryError(error) {
          this.errorResponse = error.response.data
          if (error.response.status === 403 && this.errorResponse.errorCode === 222) {
            this.errorMessage = this.errorResponse.message
            setTimeout(this.resetErrorMessage, 4000)
          } else NavigationService.navigateToErrorView()
        },

        getCategories() {
          CategoryService.sendGetCategoriesRequest()
              .then(response => this.categories = response.data)
              .catch(() => NavigationService.navigateToErrorView())
        },

        getSizeTypes() {
          SizeTypeService.sendGetSizeTypesRequest()
              .then(response => this.sizes = response.data)
              .catch(() => NavigationService.navigateToErrorView())
        },

        setSizeType(selectedSizeTypeId) {
          this.category.sizeTypeId = selectedSizeTypeId
        },

        resetErrorMessage() {
          this.errorMessage = ''
        },

        resetSuccessMessage() {
          this.successMessage = ''
        },

        deleteCategory(){
          CategoryService.sendDeleteCategoryRequest(this.categories.categoryId)
              .then(() => this.$emit('event-category-succesfully-deleted', this.categories.categoryName))
              .catch()
        }

      }
  ,
  beforeMount() {
    this.getSizeTypes()
    this.getCategories()
  },

  mounted() {
  }
}
</script>