<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-8">
        <h2>Kasutaja kinnitatud tellimused</h2>
        <OrdersTable class="table table-hover mb-5" :orders="userConfirmedOrders"/>

        <h2>Admini kinnitatud tellimused</h2>
        <OrdersTable class="table table-hover mb-5" :orders="adminConfirmedOrders"/>

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

      userConfirmedOrders: [
        {
          orderId: 0,
          orderNumber: '',
          start: '',
          end: '',
          totalPrice: '',
          status: ''
        }
      ],
      adminConfirmedOrders: [
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
      OrderService.sendGetAllOrdersRequest('Kasutaja kinnitatud')
          .then(response => this.userConfirmedOrders = response.data)
          .catch(error => console.log(error))
    },


    getConfirmedOrders() {
      OrderService.sendGetAllOrdersRequest('Admini kinnitatud')
          .then(response => this.adminConfirmedOrders = response.data)
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