<template>

<div class="col-5 mx-auto">
  <AlertGood :message="successMessage"/>
  <AlertSad :message="errorMessage"/>
</div>

  <div >
    <div class="row justify-content-center">
      <div class="col col-5">
        <h2>Ühe tellimuse haldus</h2>
      </div>
    </div>
    <div class="row justify-content-center mb-5">
      <div class="col col-5">
        <table class="table table-hover">
          <thead>
          <tr>
            <th>Tellimuse number</th>
            <td>{{ orderInfo.orderNumber }}</td>
          </tr>
          <tr>
            <th>Algus</th>
            <td> {{ orderInfo.start }}</td>
          </tr>
          <tr>
            <th>Lõpp</th>
            <td>{{ orderInfo.end }}</td>
          </tr>
          <tr>
            <th>Eesnimi</th>
            <td>{{ orderInfo.userFirstName }}</td>
          </tr>
          <tr>
            <th>Perekonnanimi</th>
            <td>{{ orderInfo.userLastName }}</td>
          </tr>
          <tr>
            <th>Kliendi email</th>
            <td>{{ orderInfo.userEmail }}</td>
          </tr>
          <tr>
            <th>Kliendi telefon</th>
            <td>{{ orderInfo.userPhone }}</td>
          </tr>
          <tr>
            <th>Staatus</th>
            <td>{{ orderInfo.status }}</td>
          </tr>
          </thead>
        </table>
      </div>
    </div>
    <div class="row justify-content-center mb-5">
      <div class="col col-5">
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
      </div>
    </div>


    <div class="row mx-auto col-6">
      <div class="col-4 mx-auto">
        <button @click="printPage" class="btn btn-outline-primary">Prindi PDF</button>
      </div>

      <div class="col-4 mx-auto">
        <button v-if="orderIsUnconfirmed" @click="updateStatusToConfirmed" class="btn btn-primary"
                type="submit">Kinnita tellimus
        </button>

        <button v-if="orderIsConfirmed" @click="updateStatusToActivate" class="btn btn-primary" type="submit">
          Aktiveeri tellimus
        </button>

        <button v-if="orderIsActivated" @click="updateStatusToFinished" class="btn btn-primary" type="submit">
          Lõpeta tellimus
        </button>
      </div>



    </div>
  </div>

</template>

<script>
import OrderService from "@/service/OrderService";
import {useRoute} from "vue-router";
import AlertSad from "@/components/alert/AlertSad.vue";
import NavigationService from "@/service/NavigationService";
import AlertGood from "@/components/alert/AlertGood.vue";

export default {
  name: 'OrderEditView',
  components: {AlertGood, AlertSad},
  data() {
    return {
      orderId: Number(useRoute().query.orderId),
      userId: Number(sessionStorage.getItem('userId')),
      errorMessage: '',
      successMessage: '',

      orderIsUnconfirmed: false,
      orderIsConfirmed: false,
      orderIsActivated: false,
      orderIsFinished: false,


      orderInfo: {
        orderNumber: '',
        start: '',
        end: '',
        status: '',
        userFirstName: '',
        userLastName: '',
        userPhone: '',
        userEmail: '',
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

    getOrderInfo() {

      OrderService.sendGetCustomerOrdersRequest(this.orderId)
          .then(response => this.handleGetOrderInfoResponse(response))
          .catch(() => this.errorMessage = 'Tellimuse andmete laadimine ebaõnnestus');
    },

    handleGetOrderInfoResponse(response) {
      this.orderInfo = response.data
      this.orderIsUnconfirmed = this.orderInfo.status === 'Kinnitamata'
      this.orderIsConfirmed = this.orderInfo.status === 'Kinnitatud'
      this.orderIsActivated = this.orderInfo.status === 'Aktiveeritud'
      this.orderIsFinished = this.orderInfo.status === 'Lõpetatud'
    },

    getOrderItems() {
      console.log('getting orderitems')
      const orderId = this.$route.query.orderId;

      OrderService.getOrderItems(orderId)
          .then(response => this.orderItems = response.data)
          .catch(() => this.errorMessage = 'Tellimuse andmete laadimine ebaõnnestus');
    },

    updateStatusToConfirmed() {
      OrderService.sendPatchOrderRequest(this.orderId, "Kinnitatud")
          .then(() => this.handleUpdateStatusToConfirmedResponse())
          .catch(() => NavigationService.navigateToErrorView())
    },

    updateStatusToActivate() {
      OrderService.sendPatchOrderRequest(this.orderId, "Aktiveeritud")
          .then(() => this.handleUpdateStatusToActivatedResponse())
          .catch(() => NavigationService.navigateToErrorView())
    },

    updateStatusToFinished() {
      OrderService.sendPatchOrderRequest(this.orderId, "Lõpetatud")
          .then(() => this.handleUpdateStatusToFinishedResponse())
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleUpdateStatusToConfirmedResponse() {
      this.successMessage = "Tellimus kinnitatud"
      setTimeout(this.resetAllMessages, 3000)
      this.getOrderInfo()
    },

    handleUpdateStatusToActivatedResponse() {
      this.successMessage = "Tellimus aktiveeritud"
      setTimeout(this.resetAllMessages, 3000)
      this.getOrderInfo()
    },

    handleUpdateStatusToFinishedResponse() {
      this.successMessage = "Tellimus lõpetatud"
      setTimeout(this.resetAllMessages, 3000)
      this.getOrderInfo()
    },

    printPage() {
      window.print();
    },

    resetAllMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },

  },
  mounted() {
    this.getOrderInfo();
    this.getOrderItems();

  }
}
</script>
