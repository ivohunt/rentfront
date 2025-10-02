<template>

  <div class="faq w-75 mx-auto">
    <h2>Korduma kippuvad küsimused</h2>
    <div v-for="(item, index) in faqs"
         :key="index"
         class="faq-item">

      <div class="question" @click="toggle(index)" >
        {{ item.question }}
      </div>

      <div v-if="isOpen(index)" class="answer"> {{ item.answer }}
      </div>
    </div>

  </div>

</template>

<script>
import {ref} from 'vue'

export default {
  name: 'FAQView',

  setup() {

    const faqs = ref([
      {
        question: 'Meie varustuse valik',
        answer: 'Enamik meie mäesuusa- ja lumelauavarustusest pärineb Headi sarjast, kuid esindatud on ka kõik teised maailmakuulsad brändid. ' +
            'Rendime sama varustust, mida pakuvad Soome suurimad keskused. Meie mäesuusad ja lumelauad on professionaalselt hooldatud, kasutades kahte hoolduspinki. Üle 80 protsendi varustusest on ostetud 2021. aastal ja hiljem. ' +
            'Igal aastal vahetame välja viiendiku kogu rendivarustusest ja võtame valikusse uusi mudeleid.' +
            'Lumelauad TRANS, HEAD, NITRO ' +
            'Saapad HEAD BOA,TRANS BOA ' +
            'Mäesuusad ROSSIGNOL, ELAN, VÖLKL, HEAD, BLIZZARD'
      },
      {
        question: 'Broneerimine',
        answer:'Broneerimisel palume panna kirja kuupäeva vahemiku ja valida endale sobiv varustus. Suuruste valikud tulevad nähtavale kuupäeva sisestamisel. ' +
            'Selleks, et rendivarustus sobiks täiuslikult võtke arvesse laenutaja pikkust (kasv cm) ja meie otsime sobivad varustuse pikkuse. ' +
            ' Varustust on võimalik kätte saada ka varem. Laenutuse hinda see ei mõjuta.'
      },
      {
        question: 'Saabaste suurused',
        answer: 'Mäesuusa- ja lumelauasaabaste suurused on cm mõõdus, ehk sisetalla pikkus on märgitud cm. ' +
            'Saapad peavad olema täpselt parajad sõitjale, mitte liiga suured ega väikesed. Aja kokkuhoiu mõttes oleks hea teada, mis on teie sisetalla pikkus cm (jalalaba mõõt kannast suure varba otsani). ' +
            'Saapaid proovides ja otsust langetades, et millised saapad on just teile sobivad, tuleks pingutada kõik saabaste klambrid või nöörid, saabas ei tohi siis jalas pigistada ega ka loksuda, vastasel juhul hakkavad hõõruma. ' +
            'Soovitame kasutada spetsiaalseid suusasokke, nende puudmisel kõrgema sääre osaga spordisokki.'
      }
    ])

    const openIndex = ref(null)

    const toggle =
        (index) => {
          openIndex.value = openIndex.value === index ? null : index
        }

    const isOpen = (index) => {
      return openIndex.value === index
    }

    return {
      faqs,
      toggle,
      isOpen
    }
  }
}
</script>

