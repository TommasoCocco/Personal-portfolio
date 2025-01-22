<script setup lang="ts">
import gsap from 'gsap';
import { onMounted, ref } from 'vue';



const beforeEnter = (el) => {
  el.style.opacity = "0";
  el.style.transform = "translateX(-50px)"
}

const enterLine1 = (el) => {
gsap.to(el, {
  x:0,
  opacity: 1,
  delay: 0.5,
  duration: 1,
  ease:'bounce.out'
})
}

const beforeEnterLine2 = (el) => {
  el.style.opacity = "0";
  el.style.transform = "translateX(50px)"
}
const enterLine2 = (el) => {
  gsap.to(el, {
    x:0,
    opacity: 1,
    delay: 0,
    duration: 1,
    ease:'bounce.out'
  })
}
const icons = ref([
  { src: "/html.svg", alt: "HTML" },
  { src: "/css.svg", alt: "CSS" },
  { src: "/js.svg", alt: "JavaScript" },
  { src: "/mongo.svg", alt: "MongoDB" },
  { src: "/react.svg", alt: "React" },
  { src: "/vue.svg", alt: "Vue" },
  { src: "/figma.svg", alt: "Figma" },
]);

const container = ref(null)
const content = ref([])


onMounted(() => {

  gsap.from(content.value, {
        autoAlpha: 0,
        duration: 0.5,
        delay: 1, 
        stagger: 0.25,
        ease: 'back.out'
      },
    );
  });
;

const gridContainer = ref(null);

// Funzione per animare l'entrata della griglia
const animateGridContainer = () => {
  const gridContainer = document.querySelector('.grid-container');
  
  if (gridContainer) {
    // Animazione per l'intero grid-container
    gsap.from(gridContainer, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });
  }

  
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item, index) => {
    
    let rotation = 0;
    let y = 0;
    if (index === 1 || index === 2) {
      rotation = 360;
      y = 0;
    }

    
    gsap.from(item, {
      opacity: 0,         
      y: 50,              
      rotation: rotation, 
      delay: index * 0.3, 
      duration: 1,       
      ease: 'power3.out', 
    });

    
    const children = item.children;
    Array.from(children).forEach((child, childIndex) => {
      gsap.from(child, {
        opacity: 0,           
        y: 50,                
        delay: index * 0.3 + childIndex * 0.2,
        duration: 1,          
        ease: 'power3.out',   
      });
    });
  });
};

</script>

<template>
    <section class="container">
      <!-- Linee decorative -->
      <Transition
      appear
      @before-enter="beforeEnter"
      @enter="enterLine1"
      >
        <div class="container__lineAbout-1"><img src="/lineAbout1.svg" alt="Line Decoration 1"></div>
      </Transition>
      <Transition
      appear
      @before-enter="beforeEnterLine2"
      @enter="enterLine2"
      >
        <div class="container__lineAbout-2"><img src="/lineAbout2.svg" alt="Line Decoration 2"></div>
      </Transition>
      <!-- Griglia -->
      <Transition
        appear
        @enter="animateGridContainer"
      >
        <div class="grid-container" ref="gridContainer">
        <!-- Prima colonna della prima riga -->
        <div class="grid-item grid-item--1">
          <div class="about-title">
            <h4>About<span class="about-title__dot">.</span></h4>
          </div>
          <div class="container__about__text">
            <p>
              Ho scoperto la passione per lo sviluppo web subito dopo aver terminato le superiori. Ho iniziato così un percorso di studi che mi permettesse di trasformare la mia curiosità in una vera competenza.
            </p>
          </div>
        </div>

        <!-- Seconda colonna della prima riga -->
        <div class="grid-item grid-item--2">
          <img src="/Component-O.svg">
        </div>

        <!-- Prima colonna della seconda riga -->
        <div class="grid-item grid-item--3">
          <img src="/Component-O.svg" class="img1">
          <img src="/Component-L.svg" class="img2">
        </div>

        <!-- Seconda colonna della seconda riga -->
        <div class="grid-item grid-item--4">
          <div class="container__skills__title">
            <h4>My skills</h4>
          </div>
          <div class="container__skills__text">
            <p>
              Sto costruendo una solida base di competenze tecniche e pratiche. Le mie principali competenze includono: HTML, CSS, JavaScript, Vue e Figma.
            </p>

            <div class="container__skills__text--icon" ref="container">
              <img
                v-for="(icon, index) in icons"
                :key="icon.alt"
                :src="icon.src"
                :alt="icon.alt"
                class="skill-icon"
                :data-index="index"
                ref="content"
              />
            </div>
          </div>
        </div>
      </div>
  </Transition>
    </section>
  </template>
  
  <style scoped lang="scss">
  .container {
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
    .grid-container {
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

    .container__skills__text--icon{
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
      .grid-item--2 {
        padding: 0rem;
      }
    }
  }

@media (height < 500px){
    .container{
        min-height: 150vh;
      }
  }

@media (height < 500px){
  .container{
    .grid-item{
      padding: 0;
    }
  }
  
}

  //tablet verticale
@media all and (min-width: 481px) and (max-width: 767px){
  .container{
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
  .grid-container {
    grid-template-columns: 1fr; /* Una colonna */
    grid-template-rows: auto auto; /* Due righe */
    }
}


@media screen and (min-width: 768px) and (max-width: 992px) {
  .grid-item--2, /* Seconda colonna della prima riga */
  .grid-item--3 { /* Prima colonna della seconda riga */
    display: none;
  }
  
  .grid-container {
    grid-template-columns: 1fr; /* Una colonna */
    grid-template-rows: auto auto; /* Due righe */
    }
}
  
    /* Linee decorative su desktop */
@media screen and (min-width: 1100px) {
  .container{
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
  .grid-container {
    grid-template-columns: 1fr 1fr !important; /* Una colonna */
    grid-template-rows: auto auto; /* Due righe */
    }
}
    

  @media (min-width: 576px) and (max-height: 500px){
  .container{
    padding: 0;
  }

  
}
  </style>
  