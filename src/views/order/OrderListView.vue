<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h2>Minu tellimused</h2>
      </div>
    </div>

    <table class=" col col-6 table-hover mx-auto">
      <thead>
      <tr>
        <th scope="col">Tellimuse number</th>
        <th scope="col">Algus</th>
        <th scope="col">Lõpp</th>
        <th scope="col">Olek</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orders" :key="order.orderId">
        <td>{{ order.orderNumber }}</td>
        <td>{{ order.start }}</td>
        <td>{{ order.end }}</td>
        <td>{{ order.status }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import OrderService from "@/service/OrderService";

export default {
  name: 'OrderListView',
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
          status: ''
        }
      ]

    }
  },
  methods: {
    getOrders() {
      OrderService.sendGetOrdersRequest(this.userId)
          .then(response => this.orders = response.data)
          .catch(error => console.log(error))
    },


  },
  mounted() {
    this.getOrders()
  }
}
</script>