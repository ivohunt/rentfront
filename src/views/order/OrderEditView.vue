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
        <th>Tellimuse nr</th>
        <td> {{ order.orderId }}</td>
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
        <th>Kliendinimi</th>
        <td>{{ order.customerName }}</td>
      </tr>
      <tr>
        <th>Kliendi email</th>
        <td>{{ order.customerEmail }}</td>
      </tr>
      <tr>
        <th>Kliendi telefon</th>
        <td>{{ order.customerPhone }}</td>
      </tr>
      <tr>
        <th>Lisatud varustus</th>
        <td>{{ order.addedEquipment }}</td>
      </tr>
      </thead>
    </table>

    <div>
      <div>
        <button class="btn btn-primary" type="submit">Kinnita tellimus</button>
      </div>
      <div>
        <button class="btn btn-primary gap:6px" type="submit">Prindi PDF</button>
      </div>
      <div>
        <button class="btn btn-primary " type="submit">Aktiveeri tellimus</button>
      </div>
      <div>
        <button class="btn btn-primary" type="submit">Lõpeta tellimus</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'OrderEditView',
  data() {
    return {

      userId: Number(sessionStorage.getItem('userId')),
      errorMessage: '',
      successMessage: '',

      order: {
        orderId: '',
        orderNumber: '',
        start: '',
        end: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        addedEquipment: '',
      },
    }
  },
  methods: {},
  mounted() {
  }
}
</script>



