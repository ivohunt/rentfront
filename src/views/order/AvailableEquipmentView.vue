<template>
  <div>

    <div class="row"><h1>Saadaval varustus</h1>
    </div>

    <div class="row mx-auto d-inline-flex justify-content-xxl-center mb-3">

      <AlertSad :message="errorMessage"/>
      <AlertGood :message="successMessage"/>

      <div v-if="hasOpenOrder">
        <div>Laenutuse algus: {{ existingOrder.start }} <br> Laenutuse lõpp: {{ existingOrder.end }}</div>
      </div>
      <div v-else class="row">
        <div class="col-4">
          <label for="startDate">Laenutuse algus</label>
          <input v-model="newOrder.start" id="startDate" class="form-control" type="date"/>
        </div>
        <div class="col-4">
          <label for="endDate">Laenutuse lõpp</label>
          <input v-model="newOrder.end" id="endDate" class="form-control" type="date"/>
        </div>

        <div class="col-4">
          <button @click="createOrder" type="button" class="btn btn-primary">Vali kuupäevad</button>
        </div>

      </div>


    </div>

    <div >
      <div>
        <h3>Varustuse kategooriad</h3>
        <div class="categories">
          <button
              v-for="category in categories"
              :key="category.categoryId"
              @click="onCategorySelected(category.availableItems)"
              class="btn btn-outline-primary btn-lg m-1"
          >
            {{ category.categoryName }}
          </button>
        </div>

        <table v-if="availableItems.length > 0" class="table table-hover w-25 mx-auto">
          <thead>
          <tr>
            <th scope="col">Suurus</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="availableItem in availableItems">
            <td class="col-5">
              <button class="btn btn-outline-primary btn-lg" @click="addToOrder(availableItem.itemId)">
                {{ availableItem.equipmentSizeName }}
              </button>
            </td>
          </tr>
          </tbody>
        </table>


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

        <div v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</div>
        <div v-if="successMessage" class="text-success mt-2">{{ successMessage }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import OrderService from "@/service/OrderService";
import CategoryService from "@/service/CategoryService";
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
      hasOpenOrder: false,
      orderId: 0,
      newOrder: {
        start: '',
        end: '',
        userId: sessionStorage.getItem('userId')
      },
      existingOrder: {
        orderId: 0,
        orderNumber: '',
        start: '',
        end: '',
        status: '',
        totalPrice: 0,
        userId: 0
      },

      availableItems: [],

      categories: [
        {
          categoryId: 0,
          categoryName: '',
          price: 0,
          availableItems: [
            {
              itemId: 0,
              status: '',
              notes: '',
              equipmentSizeId: 0,
              equipmentSizeName: ''
            }
          ]
        }
      ],
      selectedCategoryId: 0,
      equipmentSizes: [],
      selectedEquipmentSizeId: null,
      orderItems: [],
      errorMessage: '',
      successMessage: '',
    }
  },
  methods: {

    addToOrder(itemId) {
      OrderService.sendPostAddItemToOrderRequest(this.orderId, itemId)
          .then(()=> this.successMessage = "Ühik lisatud tellimusele " + this.existingOrder.orderNumber)
          .catch(() => NavigationService.navigateToErrorView())

      this.getAvailableCategories(this.existingOrder.start, this.existingOrder.end)
      this.availableItems = []

    },


    createOrder() {
      if (!this.newOrder.start || !this.newOrder.end) {
        this.errorMessage = "Palun sisesta algus- ja lõppkuupäev";
        return;
      }

      OrderService.sendPostOrderRequest(this.newOrder)
          .then(response => this.handleCreateOrderResponse(response))
          .catch(error => this.handleCreateOrderError(error));
      this.getAvailableCategories()
      location.reload()
    },

    handleCreateOrderResponse(response) {
      let orderId = response.data
      this.getExistingOrder(this.orderId)
      this.successMessage = 'Tellimus loodud';
      this.errorMessage = '';
      console.log("Order created:", response.data);
      this.hasOpenOrder = true
      sessionStorage.setItem('orderId', orderId)
      sessionStorage.setItem('userHasOpenOrder', this.hasOpenOrder)
      // Fetch available categories for step 2
      this.getAvailableCategories(this.newOrder.start, this.newOrder.end);
    },

    handleCreateOrderError(error) {
      console.error("Error creating order:", error);
      if (error.response && error.response.data && error.response.data.message) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = 'Tellimuse loomisel tekkis viga';
      }
      this.successMessage = '';
    },

    getAvailableCategories(start, end) {
      CategoryService.getAvailableCategories(start, end)
          .then(response => {
            this.categories = response.data;
            this.errorMessage = '';
          })
          .catch(error => {
            console.error(error);
            this.errorMessage = 'Kategooriate toomisega tekkis viga';
          });
    },

    onCategorySelected(availableItems) {
      this.availableItems = availableItems
    },

    addItemToOrder(item) {
      if (!this.newOrder.orderId) {
        this.errorMessage = "Order not created yet!";
        return;
      }

      const orderItemDto = {
        orderId: this.newOrder.orderId,
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

    // getOpenOrder() {
    //   if (sessionStorageService.userHasOpenOrder())
    //     OrderService.getOpenOrder(orderId)
    //         .then((response) => this.newOrder = response.data)
    //         .catch(() => NavigationService.navigateToAvailableEquipmentView())
    // },
    getExistingOrder() {
      OrderService.getExistingOrder(this.orderId)
          .then((response) => this.handleGetExistingOrderResponse(response))
          .catch(() => this.errorMessage = "Ei leitud avatud tellimust")
    },

    handleGetExistingOrderResponse(response) {
      this.existingOrder = response.data
      this.getAvailableCategories(this.existingOrder.start, this.existingOrder.end)
    }
  },
  mounted() {
    this.hasOpenOrder = SessionStorageService.userHasOpenOrder()
    this.orderId = SessionStorageService.getOrderId()

    // todo
    if (this.hasOpenOrder) {
      this.getExistingOrder(this.orderId)
      // too ära this.orderId järgi andmed this.existingOrder jaoks andmed (GET /midagi/midagi?orderId=x)
    }
  }
}
</script>