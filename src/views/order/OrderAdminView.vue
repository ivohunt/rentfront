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
        <th scope="col">Olek</th>
        <th scope="col">Muuda</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orders" key="order.orderId">
        <td> {{ order.orderNumber }}</td>
        <td> {{ order.start }}</td>
        <td> {{ order.end }}</td>
        <td> {{ order.status }}</td>
        <td>
          <font-awesome-icon @click="editOrder" class="mx-3" type="button" icon="fa-sharp fa-pen-to-square"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import OrderService from "@/service/OrderService";

export default {
  name: 'OrderAdminView',
  computed: {
  },
  data() {
    return {

      errorMessage: '',
      successMessage: '',

      orders: [{
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
    getOrdersBy(userId) {
      OrderService.sendGetOrdersRequest(userId)
          .then(response => this.orders = response.data)
          .catch(error => console.log(error))
    },

  },
  mounted() {
    this.getOrdersBy()
    
  }
}
</script>