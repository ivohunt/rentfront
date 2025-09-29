<template>
  <div class="container text-center">
    <div>
      <h4>Rendihinnad 2025/2026a hooajale</h4>
      <table class="table mx-auto w-25">
        <thead>
        <tr>
          <th scope="col">Varustus</th>
          <th scope="col">Hind päevas €</th>
        </tr>
        </thead>
        <tbody class="table-group-divider">
        <tr v-for="category in categories" :key="category.categoryId">
          <th scope="row"> {{ category.categoryName }}</th>
          <td>{{ category.price }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import NavigationService from "@/service/NavigationService";
import CategoryService from "@/service/CategoryService";
import SizeTypeService from "@/service/SizeTypeService";

export default {
  name: 'PricesView',
  data() {
    return {
      errorMessage: '',
      successMessage: '',

      categories: [{

        categoryId: 0,
        categoryName: '',
        price: 0
      }
      ],
      category: {
        categoryName: '',
        price: 0
      }
    }
  },
  methods: {

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
  },

  beforeMount() {
    this.getCategories()
    this.getSizeTypes()
  },

  mounted() {
  }
}
</script>
