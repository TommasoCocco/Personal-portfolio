<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';


gsap.registerPlugin(ScrollTrigger);


const containerAboutAbout = ref<HTMLElement | null>(null);
const gridcontainerAbout = ref<HTMLElement | null>(null);
const icons = ref([
  { src: "/html.svg", alt: "HTML" },
  { src: "/css.svg", alt: "CSS" },
  { src: "/js.svg", alt: "JavaScript" },
  { src: "/mongo.svg", alt: "MongoDB" },
  { src: "/react.svg", alt: "React" },
  { src: "/vue.svg", alt: "Vue" },
  { src: "/figma.svg", alt: "Figma" },
]);

const setupAnimations = () => {
  const timeline = gsap.timeline({
    defaults: { duration: 0.6, ease: 'power3.out' },
  });

  timeline
    .from(".containerAbout__lineAbout-1", { 
      opacity: 0, 
      x: -50, 
      ease: 'bounce.out', 
      duration: 2, 
      delay: 0.5
    })
    .from(".containerAbout__lineAbout-2", { 
      opacity: 0, 
      x: 50, 
      ease: 'bounce.out', 
      duration: 2, 
      delay: 0.5}, "<");


  timeline
   
    .from([".grid-item--1",".grid-item--4"  ],{ 
      opacity: 0, 
      y: 50, 
      stagger: 0.8, 
      duration: 1 
    }, "<")
    
    .from([".grid-item--2",".grid-item--3"  ],{
      opacity:0,
      stagger: 0.5, 
      duration: 1, 
      delay: 0.5
    }, "<")

  timeline
    .to(".grid-item--2", { 
      opacity: 1,
      rotation: 360,
    }, "<")
    .to(".grid-item--3", { 
      opacity: 1,
      rotation: 360,
    }, "<");


  timeline.from(".skill-icon", {
    autoAlpha: 0,
    stagger: 0.1,
  });

  
  ScrollTrigger.create({
    trigger: containerAboutAbout.value,
    start: "-30% 80%",
    end: "70% center",
    animation: timeline,
    toggleActions: "restart none none none",
  });
};


onMounted(() => {
  setupAnimations();
});
</script>

<template>
  <section ref="containerAboutAbout" class="containerAbout" id="containerAboutAbout">

    <div class="containerAbout__lineAbout-1">
      <img src="/lineAbout1.svg" alt="Line Decoration 1" />
    </div>
    <div class="containerAbout__lineAbout-2">
      <img src="/lineAbout2.svg" alt="Line Decoration 2" />
    </div>

    <div ref="gridcontainerAbout" class="grid-containerAbout">
      <!-- Prima colonna della prima riga -->
      <div class="grid-item grid-item--1">
        <div class="about-title">
          <h4>
            About<span class="about-title__dot">.</span>
          </h4>
        </div>
        <div class="containerAbout__about__text">
          <p>
            Ho scoperto la passione per lo sviluppo web subito dopo aver
            terminato le superiori. Ho iniziato così un percorso di studi che mi
            permettesse di trasformare la mia curiosità in una vera competenza.
          </p>
        </div>
      </div>

      <!-- Seconda colonna della prima riga -->
      <div class="grid-item grid-item--2">
        <img src="/Component-O.svg" />
      </div>

      <!-- Prima colonna della seconda riga -->
      <div class="grid-item grid-item--3">
        <img src="/Component-O.svg" class="img1" />
        <img src="/Component-L.svg" class="img2" />
      </div>

      <!-- Seconda colonna della seconda riga -->
      <div class="grid-item grid-item--4">
        <div class="containerAbout__skills__title">
          <h4>My skills</h4>
        </div>
        <div class="containerAbout__skills__text">
          <p>
            Sto costruendo una solida base di competenze tecniche e pratiche. Le
            mie principali competenze includono: HTML, CSS, JavaScript, Vue e
            Figma.
          </p>
          <div class="containerAbout__skills__text--icon">
            <img
              v-for="(icon) in icons"
              :key="icon.alt"
              :src="icon.src"
              :alt="icon.alt"
              class="skill-icon"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


  
<style scoped lang="scss">
  .containerAbout {
    height: 100dvh;
    background: linear-gradient( #042940 20%, #015C53 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    position: relative;
    max-height: 100dvh;
  
    &__lineAbout-1,
    &__lineAbout-2 {
      display: none;
    }
  
    /* Griglia */
    .grid-containerAbout {
      display: grid;
      grid-template-columns: 1fr; /* Due colonne */
      grid-template-rows: auto auto; /* Due righe */
      max-width: 1200px;
    }
  
    .grid-item {
      padding: 1.5rem;
      color: #ebf2ea;
      max-width: 50rem;
    }

    .containerAbout__skills__text--icon{
        display: flex;
        gap: 1.4rem;
    }

    .grid-item--2{
        position: relative;
    }
    .grid-item--3{
        position: relative;
    }

    .grid-item--2 img{
        position: absolute;
        top: 10rem;
        left: 15rem;
        display: none;

    }
    .grid-item--3 .img1{
        position: absolute;
        top: 10rem;
        left: 20rem;
        display: none;
    }

.grid-item--3 .img2{
  position: absolute;
  top: 15rem;
  left: 30rem;
  display: none;
}
  
@media (width < 400px){
    .grid-item {
      padding: 0rem;
    }

    .containerAbout{
      width: 95%;
    }
  }
}

@media (height < 500px){
    .containerAbout{
        min-height: 150vh;
      }
  }

@media (height < 500px){
  .containerAbout{
    .grid-item{
      padding: 0;
    }
  }
}

@media all and (min-width: 481px) and (max-width: 767px){
  .containerAbout{
    min-height: 100rem;
    &__lineAbout-1{
      display: block;
        position: absolute;
        bottom: 5rem;
        left: -3rem;
    }
    &__lineAbout-2 {
      display: block;
        position: absolute;
        top: 0rem;
        right: 0;
    }
  }
  .grid-containerAbout {
    grid-template-columns: 1fr; /* Una colonna */
    grid-template-rows: auto auto; /* Due righe */
    }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .grid-item--2, /* Seconda colonna della prima riga */
  .grid-item--3 { /* Prima colonna della seconda riga */
    display: none;
  }
  
  .grid-containerAbout {
    grid-template-columns: 1fr; /* Una colonna */
    grid-template-rows: auto auto; /* Due righe */
    }
}
  
@media screen and (min-width: 1100px) {
  .containerAbout{
    background: linear-gradient(90deg, #042940 20%, #015C53 100%);
  

  &__lineAbout-1 {
    display: block;
    position: absolute;
    top: 21rem;
    left: 0;
  }
  
  &__lineAbout-2 {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
  }
      
  .grid-item--2 img, .grid-item--3 .img1, .grid-item--3 .img2 {
    display: block;
  }
  }
  .grid-containerAbout {
    grid-template-columns: 1fr 1fr !important; /* Una colonna */
    grid-template-rows: auto auto; /* Due righe */
    }
} 

@media (min-width: 576px) and (max-height: 500px){
  .containerAbout{
    padding: 0;
  }
}

</style>
  