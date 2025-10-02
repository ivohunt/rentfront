<template>

  <div class="container text-center ">
    <div class="row justify-content-center">
      <div class="col col-4">
        <AlertSad :message="errorMessage"/>
        <h2>Ühe tellimuse haldus</h2>
      </div>
    </div>
    <div class="row justify-content-center mb-5">
      <div class="col col-4">
        <table class="table table-dark table-hover">
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
      <div class="col col-4">
          <h2>Tellitud varustus</h2>
        <table class="table table-hover table-dark">
          <thead>
          <tr>
            <th scope="col">Varustuse tüüp</th>
            <th scope="col">Suurus</th>
            <th scope="col">Hind</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>?</td>
            <td>?</td>
            <td>?</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>



    <div>
      <div>
        <button class="btn btn-outline-primary" type="submit">Kinnita tellimus</button>
      </div>
      <div>
        <button class="btn btn-outline-primary " type="submit">Aktiveeri tellimus</button>
        <button class="btn btn-outline-primary" type="submit">Prindi PDF</button>
      </div>
      <div>
        <button class="btn btn-outline-primary" type="submit">Lõpeta tellimus</button>
      </div>
    </div>
  </div>

</template>

<script>
import OrderService from "@/service/OrderService";
import {useRoute} from "vue-router";
import AlertSad from "@/components/alert/AlertSad.vue";

export default {
  name: 'OrderEditView',
  components: {AlertSad},
  data() {
    return {
      orderId:  Number(useRoute().query.orderId),
      userId: Number(sessionStorage.getItem('userId')),
      errorMessage: '',
      successMessage: '',

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
          .then(response => this.orderInfo = response.data)
          .catch(() => this.errorMessage = 'Tellimuse andmete laadimine ebaõnnestus');
    },

    getOrderItems() {
      console.log('getting orderitems')
      const orderId = this.$route.query.orderId;

      OrderService.getOrderItems(orderId)
          .then(response => {
            console.log('orderitems data in then');
            console.log(response.data);
            this.orderItems = response.data;
          })
          .catch(error => {
            console.log('orderitems get error');
            console.log(error);
            this.errorMessage = 'Tellimuse andmete laadimine ebaõnnestus';
          });
    },

    resetAllMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },


  },
  mounted(){
    this.getOrderInfo();
    this.getOrderItems();

  }
}
</script>
