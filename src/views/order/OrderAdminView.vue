<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-8">
        <h2>Kinnitamata tellimused</h2>
        <OrdersTable class="table table-hover mb-5" :orders="unconfirmedOrders"/>

        <h2>Kinnitatud tellimused</h2>
        <OrdersTable class="table table-hover mb-5" :orders="confirmedOrders"/>

        <h2>Aktiivsed tellimused</h2>
        <OrdersTable class="table table-hover mb-5" :orders="activeOrders"/>

        <h2>Lõpetatud tellimused</h2>
        <OrdersTable class="table table-hover mb-5" :orders="finishedOrders"/>
      </div>

    </div>

  </div>
</template>

<script>

import OrderService from "@/service/OrderService";
import OrdersTable from "@/components/OrdersTable.vue";

export default {
  name: 'OrderAdminView',
  components: {OrdersTable},

  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      errorMessage: '',
      successMessage: '',

      unconfirmedOrders: [
        {
          orderId: 0,
          orderNumber: '',
          start: '',
          end: '',
          totalPrice: '',
          status: ''
        }
      ],
      confirmedOrders: [
        {
          orderId: 0,
          orderNumber: '',
          start: '',
          end: '',
          totalPrice: '',
          status: ''
        }
      ],
      activeOrders: [
        {
          orderId: 0,
          orderNumber: '',
          start: '',
          end: '',
          totalPrice: '',
          status: ''
        }
      ],
      finishedOrders: [
        {
          orderId: 0,
          orderNumber: '',
          start: '',
          end: '',
          totalPrice: '',
          status: ''
        }
      ],

    }
  },
  methods: {


    getOrders() {
      this.getUnconfirmedOrders()
      this.getConfirmedOrders()
      this.getActiveOrders()
      this.getFinishedOrders()
    },

    getUnconfirmedOrders() {
      OrderService.sendGetAllOrdersRequest('Kinnitamata')
          .then(response => this.unconfirmedOrders = response.data)
          .catch(error => console.log(error))
    },


    getConfirmedOrders() {
      OrderService.sendGetAllOrdersRequest('Kinnitatud')
          .then(response => this.confirmedOrders = response.data)
          .catch(error => console.log(error))
    },

    getActiveOrders() {
      OrderService.sendGetAllOrdersRequest('Aktiivne')
          .then(response => this.activeOrders = response.data)
          .catch(error => console.log(error))
    },

    getFinishedOrders() {
      OrderService.sendGetAllOrdersRequest('Lõpetatud')
          .then(response => this.finishedOrders = response.data)
          .catch(error => console.log(error))
    },

  },
  mounted() {
    this.getOrders()

  }
}
</script>