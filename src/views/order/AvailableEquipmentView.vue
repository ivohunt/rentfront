<template>
  <div>

    <div class="row"><h1>Saadaval varustus</h1>
    </div>

    <div class="row mx-auto d-inline-flex justify-content-xxl-center mb-3">

      <AlertSad :message="errorMessage"/>
      <AlertGood :message="successMessage"/>

      <div v-if="hasOpenOrder">
        <div>Algus: {{ order.start }} Lõpp: {{ order.end }}</div>
      </div>
      <div v-else>
        <div class="col-4">
          <label for="startDate">Algus</label>
          <input v-model="order.start" id="startDate" class="form-control" type="date"/>
        </div>
        <div class="col-4">
          <label for="endDate">Lõpp</label>
          <input v-model="order.end" id="endDate" class="form-control" type="date"/>
        </div>

        <div class="col-4">
          <button @click="createOrder" type="submit" class="btn btn-primary">Vali kuupäevad</button>
        </div>

      </div>


    </div>

    <div>
      <div>
        <h3>Available Categories</h3>
        <div class="categories">
          <button
              v-for="category in categories"
              :key="category.categoryId"
              @click="onCategorySelected(category.categoryId, category.sizeTypeId)"
              class="btn btn-outline-primary m-1"
          >
            {{ category.categoryName }}
          </button>
        </div>

        <div v-if="equipmentSizes.length">
          <h4>Available Items</h4>
          <ul>
            <li v-for="item in equipmentSizes" :key="item.itemId" class="d-flex align-items-center">
              <span>{{ item.equipmentSizeName }} — {{ item.status }}</span>
              <button
                  @click="addItemToOrder(item)"
                  class="btn btn-sm btn-success ms-2"
                  :disabled="orderItems.find(oi => oi.itemId === item.itemId)"
              >
                Add
              </button>
            </li>
          </ul>
        </div>

        <div v-if="orderItems.length">
          <h4>Order Items</h4>
          <ul>
            <li v-for="oi in orderItems" :key="oi.itemId">
              {{ oi.equipmentSizeName }} — {{ oi.price }} €
            </li>
          </ul>
        </div>

        <div class="mt-3">
          <button @click="finalizeOrder" class="btn btn-primary" :disabled="!orderItems.length">
            Finalize Order
          </button>
        </div>

        <div v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</div>
        <div v-if="successMessage" class="text-success mt-2">{{ successMessage }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import OrderService from "@/service/OrderService";
import CategoryService from "@/service/CategoryService";
import EquipmentSizeService from "@/service/EquipmentSizeService";
import AlertSad from "@/components/alert/AlertSad.vue";
import AlertGood from "@/components/alert/AlertGood.vue";
import NavigationService from "@/service/NavigationService";
import SessionStorageService from "@/service/SessionStorageService";
import sessionStorageService from "@/service/SessionStorageService";

export default {
  name: 'AvailableEquipmentView',
  components: {AlertGood, AlertSad},
  data() {
    return {
      hasOpenOrder: SessionStorageService.userHasOpenOrder(),
      orderId: SessionStorageService.getOrderId(),
      order: {
        start: '2025-10-01',
        end: '2025-10-02',
        userId: sessionStorage.getItem('userId')
      },
      orderStart: '',
      orderEnd: '',
      categories: [],
      selectedCategoryId: null,
      equipmentSizes: [],
      selectedEquipmentSizeId: null,
      orderItems: [],
      errorMessage: '',
      successMessage: '',
    }
  },
  methods: {

    createOrder() {
      console.log("createOrder called");

      if (!this.orderStart || !this.orderEnd) {
        this.errorMessage = "Palun sisesta algus- ja lõppkuupäev";
        return;
      }

      // Send request
      OrderService.createOrder(this.order)
          .then(response => {
            // Axios response usually wraps data inside .data
            this.order.orderId = response.data.orderId;
            this.successMessage = 'Tellimus loodud';
            this.errorMessage = '';
            console.log("Order created:", response.data);

            // Fetch available categories for step 2
            this.getAvailableCategories();
          })
          .catch(error => {
            console.error("Error creating order:", error);
            if (error.response && error.response.data && error.response.data.message) {
              this.errorMessage = error.response.data.message;
            } else {
              this.errorMessage = 'Tellimuse loomisel tekkis viga';
            }
            this.successMessage = '';
          });
    },

    getAvailableCategories() {
      if (!this.orderStart || !this.orderEnd) {
        this.errorMessage = "Palun vali algus- ja lõppkuupäev";
        return;
      }

      CategoryService.getAvailableCategories(this.orderStart, this.orderEnd)
          .then(response => {
            this.categories = response.data;
            this.errorMessage = '';
          })
          .catch(error => {
            console.error(error);
            this.errorMessage = 'Kategooriate toomisega tekkis viga';
          });
    },

    onCategorySelected(categoryId) {
      this.selectedCategoryId = categoryId;

      // Call service to get equipment sizes/items for this category
      EquipmentSizeService.getAvailableItems(categoryId)
          .then(response => {
            this.equipmentSizes = response.data;
          })
          .catch(err => {
            console.error("Error loading equipment sizes:", err);
            this.errorMessage = "Ei saanud suurusi laadida";
          });
    },

    addItemToOrder(item) {
      if (!this.order.orderId) {
        this.errorMessage = "Order not created yet!";
        return;
      }

      const orderItemDto = {
        orderId: this.order.orderId,
        itemId: item.itemId,
        price: item.price || 0, // or fetch price from category/item
      };

      OrderService.addItemToOrder(orderItemDto)
          .then((res) => {
            this.orderItems.push(item);
            this.successMessage = `${item.equipmentSizeName} added to order!`;
            setTimeout(() => (this.successMessage = ""), 3000);
          })
          .catch((err) => {
            console.error(err);
            this.errorMessage = "Failed to add item to order.";
            setTimeout(() => (this.errorMessage = ""), 3000);
          });
    },

    finalizeOrder() {
      OrderService.finalizeOrder(this.order.orderId)
          .then(() => {
            this.successMessage = "Order finalized!";
          })
          .catch(() => {
            this.errorMessage = "Failed to finalize order.";
          });
    },

    getOpenOrder() {
      if (sessionStorageService.userHasOpenOrder())
        OrderService.getOpenOrder(orderId)
            .then((response) => this.order = response.data)
            .catch(() => NavigationService.navigateToAvailableEquipmentView())
  },


}
,
mounted()
{

}
}
</script>