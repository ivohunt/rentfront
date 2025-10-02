<template>
  <table class="table table-hover mb-4">
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
      <td> {{ order.totalPrice }}€</td>
      <td> {{ order.status }}</td>
      <td>
        <font-awesome-icon @click="navigateToOrderEditView(order.orderId)" class=" cursor-pointer mx-3"
                           icon="fa-sharp fa-pen-to-square"/>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
import NavigationService from "@/service/NavigationService";

export default {
  name: 'OrdersTable',
  props: {
    orders: Array
  },
  methods: {
    navigateToOrderEditView(orderId) {
      NavigationService.navigateToOrderEditView(orderId)
    },
  }
}
</script>