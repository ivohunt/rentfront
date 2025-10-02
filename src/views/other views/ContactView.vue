<template xmlns:https="http://www.w3.org/1999/xhtml">
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>
          Suusarent on avatud:
        </h1>
        <ul
            v-for="(item, index) in items" :key="index">
          {{ item }}
        </ul>
      </div>
    </div>

    <div>
      <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2110.9861881266543!2d26.492497!3d58.05578599999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eb111f6bdde4a1%3A0xa3ed7d28bc78af76!2sReeDe%20Suusarent!5e0!3m2!1sen!2sus!4v1758870953349!5m2!1sen!2sus"
          width="800" height="450" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <div>
      <h4>ReeDe Villa OÜ // Pühajärve tee 3, Otepää</h4>

      <div>
        <font-awesome-icon icon="fa-regular fa-envelope"/>
        <div class="email-link">
          <a :href="'mailto: ${email}'">{{ email }}</a>
        </div>
      </div>

      <div>
        <font-awesome-icon icon="fa-regular fa-phone"/>
        <div class="telephone">
          <a :href="'tel: ${telephone}'">{{ telephone }}</a>
        </div>
      </div>

    </div>
  </div>

</template>


<script>

const email = 'suusarent@gmail.com'
const telephone = '+372 55 55 55 55'

export default {
  name: 'ContactView',

  data() {
    return {
      items: ['E-N 10.00 - 19.30', 'R 10.00 - 20.00', 'L 09.30 - 19.30', 'P 09.30 - 18.30']
    }
  },
  computed: {
    email() {
      return email
    },
    telephone() {
      return telephone
    }
  }
}
</script>

<style>
.email-link a:hover {
  text-decoration: underline;
}
</style>




