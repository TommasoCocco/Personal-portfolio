<script setup lang="ts">
import Btn from "./Btn.vue"
import { onMounted, onBeforeUnmount, ref } from 'vue';
import gsap from "gsap";

// Funzione per aggiornare il colore del logo
const updateLogoColor = () => {
  const logo = document.querySelector('.logo') as HTMLElement;
  const worksSection = document.querySelector('#works') as HTMLElement;
  const aboutSection = document.querySelector('#about') as HTMLElement;
  const mailSection = document.querySelector('#mail') as HTMLElement;
  const footerSection = document.querySelector('#footer') as HTMLElement

  if (logo) {
    logo.classList.remove('logoColor');
  }

  if (worksSection && worksSection.getBoundingClientRect().top <= 50) {
    if (logo) logo.classList.add('logoColor');
  }

  if (aboutSection && aboutSection.getBoundingClientRect().top <= 50) {
    if (logo) logo.classList.remove('logoColor');
  }

  if (mailSection && mailSection.getBoundingClientRect().top <= 50) {
    if (logo) logo.classList.add('logoColor');
  }
  if (footerSection && footerSection.getBoundingClientRect().top <= 50){
    if (logo) logo.classList.remove('logoColor');
  }
};

const handleScroll = () => {
  updateLogoColor();
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

/* Funzione menu a tendina */
const isMenuVisible = ref(false);
const menuPanel = ref<HTMLElement | null>(null);

// Funzione per alternare la visibilità del menu
const toggleMenu = (event: MouseEvent) => {
  event.stopPropagation(); // Impedisce la propagazione dell'evento di clic, così non si chiude il menu subito dopo l'apertura
  isMenuVisible.value = !isMenuVisible.value;
};

// Funzione per chiudere il menu se cliccato fuori
const closeMenuIfClickedOutside = (event: MouseEvent) => {
  // Verifica se il clic è stato effettuato fuori dal menu
  if (menuPanel.value && !menuPanel.value.contains(event.target as Node)) {
    isMenuVisible.value = false;
  }
};

const closeMenuBtn = (_event: MouseEvent) =>{
  isMenuVisible.value = false;
}

// Aggiungi il listener per il clic globale al montaggio del componente
onMounted(() => {
  window.addEventListener('click', closeMenuIfClickedOutside);
});

// Rimuovi il listener al dismontaggio del componente
onBeforeUnmount(() => {
  window.removeEventListener('click', closeMenuIfClickedOutside);
});


const beforeEnter = (el) => {
  el.style.transform = 'translateY(-60px)'
  el.style.opacity = '0';
}

const enter = (el) => {
  gsap.to(el, { 
    duration: 1, 
    delay: 0.5,
    opacity: 1, 
    y: 0, 
    ease: "bounce.out"
  });
}

const beforeEnterLogo = (el) => {
  el.style.opacity = '0';
}

const enterLogo = (el) => {
  gsap.to(el, {
    opacity: 1,
    delay: 0.5,
    duration: 0.3,
    stagger: 0.5
  })
}

const bounceEffect = (event) => {
  const el = event.currentTarget;
  gsap.to(el, {
    y: -5,
    duration: 0.2,
    ease: "bounce.out",
    yoyo: true,
    repeat: 2
  }).then(() => {
    gsap.to(el, {
      y: 0,
      duration: 0.3,
      ease: "bounce.out",
    });
  });
};

</script>


<template>
  <section class="container">
    <div class="container__logo">
      <transition 
        appear
        @before-enter="beforeEnterLogo"
        @enter="enterLogo">
      <div class="container__logo__text-wrapper"><a href="#home"><p class="logo" @click="bounceEffect">Tommaso Cocco</p></a></div>
      </transition>
    </div>
    <div class="container__navbar">
      <a href="#footer">
        <Transition 
        appear
        @before-enter="beforeEnter"
        @enter="enter">

        <div class="container__navbar__mail" @click="bounceEffect">
          <p class="text_mail">WORK WITH ME</p>
          <font-awesome-icon :icon="['fas', 'envelope']" class="container__navbar__mail__icon"/>
        </div>
      </Transition>
      </a>
      <Btn class="btn--menu" @click="toggleMenu">
        <font-awesome-icon :icon="['fas', 'bars']" class="container__navbar__menu__icon"/>
      </Btn>

      <transition name="menu-panel">
        <div 
          v-if="isMenuVisible" 
          class="menu-panel" 
          id="btn-panel"
          ref="menuPanel"
        >  
          <div class="containerIcon">
            <font-awesome-icon :icon="['fas', 'arrow-left']" class="containerIcon__icon" @click="closeMenuBtn"/>
          </div>
          
          <div class="containerLinks">
            <div class="links">
              <RouterLink to="#home" @click="toggleMenu">Home</RouterLink>
              <RouterLink to="#works" @click="toggleMenu">Works</RouterLink>
              <RouterLink to="#about" @click="toggleMenu">About</RouterLink>
              <RouterLink to="#mail" @click="toggleMenu">Mail</RouterLink>
              <RouterLink to="#footer" @click="toggleMenu">Contacts</RouterLink>
            </div>
          </div>
        </div>
      </transition>
    </div>
  
  </section>
</template>


<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 1;

  &__logo {
    &__text-wrapper p{
      font-family: "Inter-Semibold", Helvetica;
      padding: 1.5rem;
      color: #EBF2EA;
      transition: color 0.3s ease;
    }
  }
  
  &__navbar {
    display: flex;
    justify-content: center;
    z-index: 1000;
    padding: 1.5rem;

    &__mail{
      display: flex;
      background-color: #dbf228;
      height: 5rem;
      width: 6rem;
      align-items: center;
      justify-content: center;
      border-bottom-left-radius: 1rem;
      border-top-left-radius: 1rem;
      color: #EBF2EA;

      & p{
        display: none;
        color: #0d0d0d;
      }

      &__icon {
        height: 20px;
        width: 20px;
        color: #0d0d0d;
      }
    }
  }

  .logoColor{
    color: #0d0d0d;
  }

  .text{
    display: none;
    color: #0d0d0d;
  }
}

.menu-panel {
  position: absolute;
  width: 100%;
  height: 100dvh;
  top: 0;
  right: 0;
  border-radius: 0;
  background-color: #dbf228;
  transition: opacity 0.5s ease-in-out;
}

.menu-panel-enter-from, .menu-panel-leave-to{
  opacity: 0;
}
.menu-panel-enter-to, .menu-panel-leave-from{
  opacity: 1;
}

.menu-panel-enter-active{
  transition: opacity 0.5s;
}

.containerLinks{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 100dvh;
}

.links{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  flex-direction: column;
  transition: 500ms;

  & a{
    margin: 0;
    font-family: "Inter-Semibold", Helvetica;
    text-decoration: none;
    color: #0d0d0d;
    opacity: 0.7;
    font-size: 3rem;

    &:hover{
      opacity: 1;
    }
  }

}

.menu-panel div p{
  color: #0d0d0d;
  font-size: 1.8rem;
}

.containerIcon{
  width: 100%;
  display: flex;
  position: absolute;
  align-items: center;

  &__icon{
    height: 4rem;
    width: 4rem;
    padding: 4rem;
    opacity: 0.7;

    &:hover{
      opacity: 1;
    }
  }

}

/* Tablet in modalità verticale */
@media all and (min-width: 800px){

  .container{
    &__navbar{
      &__mail{
        width: 21rem;
        gap: 1rem;
        border-radius: 1rem;


        & p{
          display: block;
        }
      }
    }
    
    .btn--menu{
  display: none;
}

  }
}


@media screen and (min-width: 1100px) {
  .container{
    &__logo{
      padding: 1.5rem 3rem;
    }

    &__navbar{
      padding: 1.5rem 3rem;

      &__mail{
        width: 21rem;
        gap: 1rem;
        border-radius: 1rem;

        & p{
          display: block;
        }
      }
    } 
    .text{display: block;} 
  }


.btn--menu{
  display: none;
}
.menu-panel {
  height: 35rem;
  width: 27rem;
  top: 3.5rem;
  right: 3rem;
  box-shadow: 0px 6px 10px #00000026;
  border-radius: 1rem;
}
.containerIcon{
  position: static;

  &__icon{
    height: 2.5rem;
    width: 2.5rem;
    padding: 2.5rem;
  }
}
.containerLinks{
  height: 25rem;
  width: 27rem;
  border-radius: 1rem;

  & a{
    font-size: 1.8rem;
  }

  .links{
    gap: 2.5rem;
  }
}

}

</style>
