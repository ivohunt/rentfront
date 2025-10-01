<template>
  <div>
    <div>
      <h1>Tellimuse kinnitamine</h1>
    </div>
    <div class="col-4 mx-auto">

      <table class="table ">
        <thead>
        <tr>
          <th scope="col">Tellimuse number</th>
          <td> {{ order.orderNumber }}</td>
        </tr>
        <tr>
          <th scope="col">Algus</th>
          <td> {{ order.start }}</td>
        </tr>
        <tr>
          <th scope="col">Lõpp</th>
          <td> {{ order.end }}</td>
        </tr>
        <tr>
          <th scope="col">Staatus</th>
          <td> {{ order.status }}</td>
        </tr>
        <tr>
          <th scope="col">Summa</th>
          <td> {{ order.totalPrice }}</td>
        </tr>
        <tr>
          <th scope="col">Tellitud varustus</th>
          <td> {{  }}</td>
        </tr>

        </thead>
      </table>

      <div>
        <button @click="" type="button" class="btn btn-outline-primary me-3">Alusta uut</button>
        <button @click="" type="button" class="btn btn-primary ">Kinnita tellimus</button>
      </div>
    </div>

  </div>
</template>

<script>
import {useRoute} from "vue-router";
import OrderService from "@/service/OrderService";
import NavigationService from "@/service/NavigationService";

export default {
  name: 'ConfirmOrderView',
  data() {
    return {
      orderId: Number(useRoute().query.orderId),
      userId: sessionStorage.getItem('userId'),

      order: {
        orderId: '',
        orderNumber: '',
        start: '',
        end: '',
        status: '',
        totalPrice: 0,
      }


    }
  },
  methods: {

    getOpenOrder(userId) {
      OrderService.getOpenOrder(userId)
          .then((response => this.order = response.data))
          .catch(() => NavigationService.navigateToErrorView())
    },

  },
  mounted() {
    this.getOpenOrder(this.userId)
  }
}
</script>