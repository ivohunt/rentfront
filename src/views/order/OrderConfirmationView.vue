<template>
  <div>
    <div>
      <h1>Tellimuse kinnitamine</h1>
    </div>
    <div class="col-5 mx-auto">
      <AlertGood :message="successMessage"/>
      <AlertSad :message="errorMessage"/>
    </div>
    <div class="col-5 mx-auto">


      <table class="table table-hover">
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

        </thead>
      </table>

      <h2>Tellitud varustus</h2>
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">Varustuse tüüp</th>
          <th scope="col">Suurus</th>
          <th scope="col">Hind</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="orderItem in orderItems" :key="orderItem.orderItemId">
          <td>{{ orderItem.categoryName }}</td>
          <td>{{ orderItem.equipmentSize }}</td>
          <td>{{ orderItem.price }}</td>
        </tr>
        </tbody>
      </table>

      <div>
        <button @click="navigateToAvailableEquipmentView" type="button" class="btn btn-outline-primary me-3">Lisa
          varustust
        </button>
        <button @click="updateStatusToUnconfirmed" type="button" class="btn btn-primary ">Kinnita tellimus</button>
      </div>
    </div>

  </div>
</template>

<script>
import {useRoute} from "vue-router";
import OrderService from "@/service/OrderService";
import NavigationService from "@/service/NavigationService";
import AlertGood from "@/components/alert/AlertGood.vue";
import AlertSad from "@/components/alert/AlertSad.vue";

export default {
  name: 'ConfirmOrderView',
  components: {AlertSad, AlertGood},
  data() {
    return {
      orderId: Number(useRoute().query.orderId),
      userId: sessionStorage.getItem('userId'),
      errorMessage: '',
      successMessage: '',

      order: {
        orderId: '',
        orderNumber: '',
        start: '',
        end: '',
        status: '',
        totalPrice: 0,
      },

      orderItems: [
        {
          orderItemId: 0,
          categoryName: '',
          equipmentSize: '',
          price: 0
        }
      ],

    }
  },
  methods: {

    getOpenOrder(userId) {
      OrderService.getOpenOrder(userId)
          .then((response => this.order = response.data))
          .catch(() => NavigationService.navigateToErrorView())
    },

    getOrderItems() {
      const orderId = this.$route.query.orderId;

      OrderService.getOrderItems(orderId)
          .then(response => this.orderItems = response.data)
          .catch(() => this.errorMessage = 'Tellimuse andmete laadimine ebaõnnestus');
    },

    orderOpenAlert() {
      this.successMessage = "Sul on tellimus pooleli. Kinnita või alusta uut"
    },

    updateStatusToUnconfirmed() {
      OrderService.sendPatchOrderRequest(this.orderId, "Kasutaja kinnitatud")
          .then(() => this.handleUpdateStatusToConfirmedResponse())
          .catch(() => NavigationService.navigateToErrorView())

    },

    handleUpdateStatusToConfirmedResponse() {
      this.successMessage = "Tellimus kinnitatud"
      setTimeout(this.resetAllMessages, 3000)
      this.getExistingOrder()
      this.getOrderItems();
    },

    getExistingOrder() {
      OrderService.getExistingOrder(this.orderId)
          .then((response) => this.handleGetExistingOrderResponse(response))
          .catch(() => this.errorMessage = "Ei leitud avatud tellimust")
    },

    handleGetExistingOrderResponse(response) {
      this.order = response.data
    },


    navigateToAvailableEquipmentView() {
      NavigationService.navigateToAvailableEquipmentView()

    },


  },
  mounted() {
    this.getOpenOrder(this.userId)
    this.getOrderItems();
    this.orderOpenAlert()
  }
}
</script>