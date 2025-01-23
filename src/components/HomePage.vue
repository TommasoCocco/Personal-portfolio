<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Btn from "./Btn.vue";
import gsap from "gsap";

const sections = ["home", "works", "about", "mail", "footer"];
const activeSection = ref(0);

// Scrolla alla sezione corrispondente con offset
const scrollToSection = (index: number) => {
  const section = document.getElementById(sections[index]);
  if (section) {
    const isSpecial = isSpecialSection(index);

    if (isSpecial) {
      // Calcola l'offset personalizzato
      const offset = window.innerHeight * 0.2; // 20% della viewport height
      const targetPosition =
        section.getBoundingClientRect().top + window.scrollY - offset;

      // Scrolla alla posizione calcolata
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    } else {
      // Scroll normale per le sezioni non speciali
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    activeSection.value = index;
  }
};

// Determina se la sezione corrente è "speciale" (Works o Mail)
const isSpecialSection = (index: number) => {
  return sections[index] === "works" || sections[index] === "mail";
};

// Funzione per aggiornare la sezione attiva durante lo scroll
const updateActiveDot = () => {
  const sectionsElements = sections.map((id) =>
    document.getElementById(id) as HTMLElement
  );

  const footer = document.getElementById("footer");
  const dots = document.querySelectorAll(".dots"); // Selettore dei dots

  // Aggiorna la sezione attiva
  sectionsElements.forEach((section, index) => {
    if (
      section &&
      section.getBoundingClientRect().top <= window.innerHeight / 2 &&
      section.getBoundingClientRect().bottom > window.innerHeight / 2
    ) {
      activeSection.value = index;
    }
  });

  // Controlla se il footer è visibile nel fondo della pagina
  if (footer) {
    const footerAtBottom =
      footer.getBoundingClientRect().bottom <= window.innerHeight &&
      footer.getBoundingClientRect().top >= 0;

    if (footerAtBottom) {
      // Rimuove la classe "special" dai dots ogni volta che il footer tocca il fondo
      dots.forEach((dot) => dot.classList.remove("special"));
    } else {
      // Ripristina la classe "special" ai dots quando il footer non è più al fondo
      dots.forEach((dot) => dot.classList.add("special"));
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", updateActiveDot);

  // Pulizia dell'event listener
  onUnmounted(() => {
    window.removeEventListener("scroll", updateActiveDot);
  });
});




const beforeEnter = (el:any) => {
  el.style.opacity = "0";
}

const enterTitle = (el:any) => {
  gsap.to(el, {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", // Stato finale (visibile)
    opacity: 1,
    delay: 0.5,
    duration: 1, // Durata della transizione
    stagger: 0.5
  });
};

const enterSubtitle = (el:any) => {
  gsap.to(el, {
    opacity: 1,
    delay: 1.5,
    duration: 1,
    stagger: 0.5
  })
}

const beforeEnterBtn = (el:any) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(-10px)";
}

const enterBtn = (el:any) => {
  gsap.to(el, {
    y: 0,
    opacity: 1,
    delay: 1,
    duration: 1,
    ease: 'bounce.out'
  })
}

const beforeEnterImg = (el:any) => {
  el.style.opacity = "0";
  el.style.transform = "translateX(-50px)";
}

const enterImg = (el:any) => {
  gsap.to(el, {
    x:0,
    opacity: 1,
    delay: 0.5,
    duration: 1,
    ease:'bounce.out'
  })
}

const beforeEnterPhoto = (el:any) => {
  el.style.opacity = "0";
  el.style.scale = "0.5";
}

const enterPhoto = (el:any) => {
  gsap.to(el,{
    opacity: 1,
    scale: 1,
    delay: 0.5,
    duration: 1,
  })
}

onMounted(() => {
  window.addEventListener("scroll", updateActiveDot);

  const scrollToWorksButton = document.getElementById("scrollToWorks");
  if (scrollToWorksButton) {
    scrollToWorksButton.addEventListener("click", (event) => {
      event.preventDefault(); // Previene lo scroll predefinito del browser

      const target = document.getElementById("works");
      if (target) {
        const offset = window.innerHeight * 0.2; // Calcola il 20% della viewport height
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth", // Scorrimento fluido
        });
      }
    });
  }

  // Pulizia dell'event listener
  onUnmounted(() => {
    window.removeEventListener("scroll", updateActiveDot);
  });
});
</script>


<template>
  <section class="container">
    <div class="container__line1">
      <Transition
        appear
        @before-enter="beforeEnterImg"
        @enter="enterImg"
  
      >
        <img src="/line-1.svg" alt="" />
      </Transition>
    </div>
    <div class="container__box">
      <div class="container__box__container">
        <div class="container__box__title">
          <Transition
            appear
            @before-enter="beforeEnter"
            @enter="enterTitle"
            >
              <h1>Frontend Developer</h1>
            </Transition>
          </div>
            
        <div class="container__box__subtitle">
          <Transition
          appear
          @before-enter="beforeEnter"
          @enter="enterSubtitle"
          >
            <p>
              I like to craft solid and scalable frontend products with great user
              experiences.
            </p>
          </Transition>
        </div>
      </div>

      <div class="container__photo">
        <Transition
        appear
        @before-enter="beforeEnterPhoto"
        @enter="enterPhoto">
          <img src="/Mask group.svg" alt="Profile photo" />
        </Transition>
      </div>
    </div>
    <div class="container__btn">
      <Transition
        appear
        @before-enter="beforeEnterBtn"
        @enter="enterBtn">

        <a href="#works" id="scrollToWorks">
          <Btn class="btn--primary">
            <p class="btn__text">Check out my work here</p>
            <font-awesome-icon
            :icon="['fas', 'arrow-down']"
            class="container__btn__icon"
            />
          </Btn>
        </a>
      </Transition>
    </div>
    
    <!-- Dots Navigation -->
    <div class="dots">
      <span
        v-for="(section, index) in sections"
        :key="index"
        :class="[
          'dots--dot',
          activeSection === index ? 'active' : '',
          isSpecialSection(activeSection) ? 'special' : 'default'
        ]"
        @click="scrollToSection(index)"
      ></span>
    </div>
  </section>
</template>

<style scoped lang="scss">

.container {
  height: 100dvh;
  background: linear-gradient(#042940, #015c53);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;

  &__box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__title {
      display: flex;
      padding: 0 1.5rem;
      font-size: 3.2em;
      color: #dbf228;
      align-items: flex-end;
      height: 130px;

    }

    &__subtitle {
      padding: 0rem 1.5rem;
      max-width: 41.5rem;
    }
  }

  &__photo {
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      height: 80%;
      max-width: 100%;
    }
  }

  &__line1 {
    display: none;
  }


  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
    bottom: -6rem;
  }

  .btn__text{
    color:#0d0d0d ;
  }

  .dots {
    display: flex;
    position: fixed;
    align-items: center;
    flex-direction: column;
    gap: 1.4rem;
    top: 65%;
    left: 96%;
    z-index: 5;

    &--dot {
      transform: rotate(45deg);
      width: 0.8rem;
      height: 0.8rem;
      background-color: #ebf2ea;
      cursor: pointer;
      transition: background-color 0.1s;

      &:nth-child(1) {
        transition-delay:  0.1s;
      }

      &:nth-child(2) {
        transition-delay:  0.15s;
      }

      &:nth-child(3) {
        transition-delay:  0.2s;
      }

      &:nth-child(4) {
        transition-delay:  0.25s;
      }

      &:nth-child(5) {
        transition-delay:  0.3s;
      }
      &.active {
        background-color: transparent;
        border: 0.2rem solid #dbf228;
        border-radius: 4rem;
        height: 1.3rem;
        width: 1.3rem;
      }

      &.special {
        background-color: #042940;

        &.active {
          border-color: #015C53;
          background-color: transparent;
        }
      }
    }
  }
}

@media (width < 400px){
    .container{
        height: 100dvh;

        &__photo{
            height: 25rem;
            & img{
                width: 25rem;
                height: 25rem;
            }
        }
        &__btn{
            bottom: 0rem;
        }
    }
    .grid-item{
        padding: 0;
    }
}

@media (width < 768px) and (height <600px){
    .container{
        height: 100dvh;

        &__photo{
            & img{
                display: none;
            }
        }
    }
    .container__btn{
        bottom: 0rem;
    }
}


@media (min-width: 576px) and (max-width:767px){
.container{
  &__box{
    flex-direction: row;

  }
  &__btn{
    display: none;
  }
}

}

@media all and (min-width: 481px) and (max-width: 768px){

    h1{
        font-size: 2em;
        line-height: 65px;
    }

    .container{
        min-height: 80dvh;

        &__box{
            flex-direction: column;
        }

        &__btn{
            top: 0;
        }

        &__photo{

            & img{
                height: 407px;
                width: 400px;
            }
        }
    }
}


@media all and (min-width: 480px) and (max-width: 767px) and (height < 720px){
    h1{
        font-size: 1.5em;
    }

    .container{
        min-height: 100vh;
        
        &__photo{
            & img{
            height: 307px;
            width: 300px;
        }
    }
}
}

@media (width < 800px){
  .dots {
      display: none !important;
    }
}

@media (max-height: 800px) {
  .container {
    &__btn {
      display: none;
    }
   
  }
}

@media all and (min-width: 768px) and (max-width: 991px){
    .container{
        gap: 4rem;

        &__box{
            gap: 2rem;
        }
    }
    
}

@media all and (min-width: 768px) and (max-width: 991px) and (height < 750px){
    .container{
        
        &__box{
            flex-direction: row;
        }
        &__photo{
            & img{
                height: 300px;
            }
        }
        &__btn{
            bottom: -6rem !important;
        }
    }
}
@media all and (min-width: 768px) and (max-width: 991px) {
    .container{
        &__btn{
            bottom: 0;
        }
    }
}



@media all and (min-width: 992px) and (max-width: 1100px) and (height < 750px){
    .container{
        &__box{
            flex-direction: row;
        }
    }
    
}

@media all and (min-width: 992px) and (max-width: 1100px){

    .container{
        &__btn{
            bottom: 0;
        }
    }

}

@media (width > 1100px){
    .container{
        background: linear-gradient(90deg, #042940 60%, #015C53 100%);
        position: relative;
        justify-content: center;
        align-items: center;

        &__line1{
        display: flex;
        position: absolute;
        top: 22rem;
        left: 0;
    }
    
    .container__box{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 80%;
        height: 100dvh;
        gap: 5rem;

        &__container{
            position: relative;
            top: -10rem;
        }
        
        &__title{
            padding: 0rem ;
            & h1{
              width: 35rem;
              font-size: 7rem;
          }

        }
        &__subtitle{
            padding: 0rem ;
        }
        
    }
    }

    .container__photo{
        height: 40rem;

        & img{
            height: 507px;
            width: 500px;
        }
    }

    .container__btn{
        height: 20dvh;
        position: absolute;
        bottom:2rem;
    }


 
}
</style>
