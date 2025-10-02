<template>

  <div class="container text-center ">
    <div class="row">
      <div class="col">
        <h2>Ühe tellimuse haldus</h2>
      </div>
    </div>


    <table class="table w-10 col col-4">
      <thead>
      <tr>
        <th>Tellimuse number</th>
        <td>{{ order.orderNumber }}</td>
      </tr>
      <tr>
        <th>Algus</th>
        <td> {{ order.start }}</td>
      </tr>
      <tr>
        <th>Lõpp</th>
        <td>{{ order.end }}</td>
      </tr>
      <tr>
        <th>Eesnimi</th>
        <td>{{ order.userFirstName }}</td>
      </tr>
      <tr>
        <th>Perekonnanimi</th>
        <td>{{ order.userLastName }}</td>
      </tr>
      <tr>
        <th>Kliendi email</th>
        <td>{{ order.userEmail }}</td>
      </tr>
      <tr>
        <th>Kliendi telefon</th>
        <td>{{ order.userPhone }}</td>
      </tr>
      <tr>
        <th>Staatus</th>
        <td>{{ order.status}}</td>
      </tr>
      <tr>
        <th>Lisatud varustus</th>
        <td>
        <div v-for="orderItem in orderItems">
          <p>item id: {{orderItem.itemId}}</p>
          <p>category id: {{orderItem.categoryId}}</p>
          <p>equipmentSize id: {{orderItem.equipmentSizeId}}</p>
        </div>
        </td>
      </tr>
      </thead>
    </table>

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

export default {
  name: 'OrderEditView',
  data() {
    return {


      userId: Number(sessionStorage.getItem('userId')),
      errorMessage: '',
      successMessage: '',

      order: {
        orderNumber: '',
        start: '',
        end: '',
        status: '',
        userFirstName: '',
        userLastName: '',
        userPhone: '',
        userEmail: '',
      },
      orderItems: [{
        itemId: '',
        categoryId: '',
        equipmentSizeId:'',

      }],

    }
  },
  methods: {

    getOrderById() {
      const orderId = this.$route.query.orderId;
      console.log(orderId)

      OrderService.getOrderById(orderId)
          .then(response => {
            console.log(response.data);
            this.order = response.data
          })
          .catch(error => {
            console.log(error);
            this.errorMessage = 'Tellimuse andmete laadimine ebaõnnestus';
          });
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
    }
  },
  mounted(){
    this.getOrderById();
    this.getOrderItems();

  }
}
</script>
