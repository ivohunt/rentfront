<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h2>Tellimuste haldamine</h2>
      </div>
    </div>
    <table class="table w-40 mx-auto table-hover">
      <thead>
      <tr>
        <th scope="col">Tellimuse nr</th>
        <th scope="col">Algus</th>
        <th scope="col">Lõpp</th>
        <th scope="col">Hind</th>
        <th scope="col">Olek</th>
        <th scope="col">Muuda</th>
      </tr>

      </thead>
      <tbody>
      <tr v-for="order in orders" key="order.orderId">
        <td> {{ order.orderNumber }}</td>
        <td> {{ order.start }}</td>
        <td> {{ order.end }}</td>
        <td> {{order.totalPrice}}€</td>
        <td> {{ order.status }}</td>
        <td>
          <font-awesome-icon @click="navigateToOrderEditView(order.orderId)" class=" cursor-pointer mx-3"
                             icon="fa-sharp fa-pen-to-square"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import OrderService from "@/service/OrderService";
import OrderEditView from "@/views/order/OrderEditView.vue";
import NavigationService from "@/service/NavigationService";

export default {
  name: 'OrderAdminView',
  computed: {
    OrderEditView() {
      return OrderEditView
    }
  },

  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      errorMessage: '',
      successMessage: '',

      orders: [
        {
          orderId: 0,
          orderNumber: '',
          start: '',
          end: '',
          totalPrice:'',
          status: ''
        }
      ]
    }
  },
  methods: {
    navigateToOrderEditView(orderId){
      NavigationService.navigateToOrderEditView(orderId)
    },

    getOrders() {
      OrderService.sendGetAllOrdersRequest(this.userId)
          .then(response => this.orders = response.data)
          .catch(error => console.log(error))
    },

  },
  mounted() {
    this.getOrders()

  }
}
</script>