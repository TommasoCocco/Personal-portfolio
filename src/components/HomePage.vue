<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Btn from "./Btn.vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const sections = ["home", "works", "about", "mail", "footer"];
const activeSection = ref(0);

const scrollToSection = (index: number) => {
  const section = document.getElementById(sections[index]);
  if (section) {
    const isSpecial = isSpecialSection(index);

    if (isSpecial) {
      const offset = window.innerHeight * 0.2;
      const targetPosition =
        section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    } else {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    activeSection.value = index;
  }
};

const isSpecialSection = (index: number) => {
  return sections[index] === "works" || sections[index] === "mail";
};

const updateActiveDot = () => {
  const sectionsElements = sections.map((id) =>
    document.getElementById(id) as HTMLElement
  );

  const footer = document.getElementById("footer");
  const dots = document.querySelectorAll(".dots");

  sectionsElements.forEach((section, index) => {
    if (
      section &&
      section.getBoundingClientRect().top <= window.innerHeight / 2 &&
      section.getBoundingClientRect().bottom > window.innerHeight / 2
    ) {
      activeSection.value = index;
    }
  });

  if (footer) {
    const footerAtBottom =
      footer.getBoundingClientRect().bottom <= window.innerHeight &&
      footer.getBoundingClientRect().top >= 0;

    if (footerAtBottom) {
      dots.forEach((dot) => dot.classList.remove("special"));
    } else {
      dots.forEach((dot) => dot.classList.add("special"));
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", updateActiveDot);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateActiveDot);
});

gsap.registerPlugin(ScrollTrigger);

const containerHome = ref(null);

const setupAnimations = () => {
  const timeline = gsap.timeline({
    defaults: { duration: 1, ease: "power3.out" },
  });

  const elements = {
    line1: document.querySelector(".container__line1"),
    title: document.querySelector(".container__box__title"),
    subtitle: document.querySelector(".container__box__subtitle"),
    photo: document.querySelector(".container__photo"),
    btn: document.querySelector(".container__btn"),
    dots: document.querySelectorAll(".dots"),
  };

  console.log("Elements found:", elements);

  // Assicurati che tutti gli elementi siano presenti
  if (!Object.values(elements).every((el) => el)) {
    console.error("Uno o più elementi non trovati nel DOM.");
    return;
  }

  // Imposta gli stili iniziali per simulare il comportamento di @before-enter
  gsap.set(elements.line1, { opacity: 0, x: -50 });
  gsap.set(elements.title, { opacity: 0, clipPath: "polygon(0 0, 0% 0, 0% 100%, 0% 100%)" });
  gsap.set(elements.subtitle, { opacity: 0, clipPath: "polygon(0 0, 0% 0, 0% 100%, 0% 100%)"});
  gsap.set(elements.photo, { opacity: 0, scale: 0.5 });
  gsap.set(elements.btn, { opacity: 0, y: -20 });
  gsap.set(elements.dots,{opacity: 0, x: 50})

  timeline
    .to(
      elements.title,
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", 
        opacity: 1,
        delay: 0.5
      },
    )
    .to(
      elements.subtitle,
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", 
        opacity: 1,
      },
    )
     .to(
      elements.photo, {
      opacity: 1,
      duration: 0.8,
      scale: 1,
    },
    "<"
    )
    .to(
    [elements.line1, elements.btn, elements.dots],
    {
      opacity: 1,
      x: 0,
      y: 0,
      ease: "bounce.out",
    }, "<"
  );

  // ScrollTrigger
  ScrollTrigger.create({
    trigger: containerHome.value,
    start: "top 80%",
    end: "80% -10%",
    animation: timeline,
    toggleActions: "restart none restart none",
  });
};

// Setup
onMounted(() => {
  setupAnimations();
});

onMounted(() => {
  window.addEventListener("scroll", updateActiveDot);

  const scrollToWorksButton = document.getElementById("scrollToWorks");
  if (scrollToWorksButton) {
    scrollToWorksButton.addEventListener("click", (event) => {
      event.preventDefault();

      const target = document.getElementById("works");
      if (target) {
        const offset = window.innerHeight * 0.2;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  }

  onUnmounted(() => {
    window.removeEventListener("scroll", updateActiveDot);
  });
});
</script>


<template>
  <section class="container" ref="containerHome">
    <div class="container__line1">
        <img src="/line-1.svg" alt="" />
    </div>
    <div class="container__box">
      <div class="container__box__container">
        <div class="container__box__title">
              <h1 >Frontend Developer</h1>
          </div>
            
        <div class="container__box__subtitle">
            <p>
              I like to craft solid and scalable frontend products with great user
              experiences.
            </p>
        </div>
      </div>

      <div class="container__photo">
          <img src="/fotoprova.svg"  alt="Profile photo" />
      </div>
    </div>
    <div class="container__btn">
        <a href="#works" id="scrollToWorks" >
          <Btn class="btn--primary">
            <p class="btn__text">Check out my work here</p>
            <font-awesome-icon
            :icon="['fas', 'arrow-down']"
            class="container__btn__icon"
            />
          </Btn>
        </a>
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

  &__box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -3%;
    gap: 10rem;

    &__title {
      display: flex;
      padding: 0 1.5rem;
      font-size: 3.2em;
      color: #dbf228;
      align-items: center;
      height: 150px;
      width: 35rem;

    }

    &__subtitle {
      padding: 0rem 1.5rem;
      max-width: 41.5rem;

      & p {
        margin: 0;
      }
    }
  }

  &__photo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36rem;
    width: 36rem;

    & img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      box-shadow: 0px 4px 15px #0000003d;
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
    bottom: -3rem;
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

        &__box{
          gap: 2rem;
          &__title{
            padding: 0 0 0 1.5rem;
          }
        }
    }
    .grid-item{
        padding: 0;
    }
}

@media (height < 700px){
  .container__btn{
    display: none;
  }
}

@media (height < 800px){
  .container__btn{
    bottom: -4rem;
  }
}

@media (width < 768px) and (height <600px){
    .container{
        height: 100dvh;
    }

    .container__box{
      flex-direction: row;
    }
    .container__photo{
      display: none;
    }
} 


@media (min-width: 576px) and (max-width:767px){
.container{
  &__box{
    flex-direction: row;

  }
}

}

@media all and (min-width: 481px) and (max-width: 768px){

    h1{
        font-size: 2em;
    }

    .container{

        &__box{
            flex-direction: column;
        }


    }
}


@media all and (min-width: 480px) and (max-width: 768px) and (height < 720px){
    h1{
        font-size: 1.5em;
    }

    .container{
        min-height: 100vh;
        
        &__photo{
            & img{
            height: 30rem;
            width: 30rem;
        }

        &__btn{
            display: none !important;
        }
    }
}
}

@media (width < 768px) and (height < 720px){
  .dots {
      display: none !important;
    }

    .container__btn{
      display: none;
    }
}

@media (width < 768px){
  .dots{
    display: none !important;
  }
}

@media all and (min-width: 768px) and (max-width: 991px){
    .container{
        gap: 4rem;

        &__box{
            flex-direction: row;
            gap: 0;
        }

        &__photo{
          & img{
            width: 90%;
            height: 90%;
          }
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
                height: 30rem;
                width: 30rem;
            }
        }
        &__btn{
            bottom: -6rem !important;
        }
    }
}


@media (height > 1100px) {
  .container{
    height: 60dvh;
    &__box{
      flex-direction: row;
    }

    &__btn{
      bottom: 0;
    }

    .dots{
      top: 40%;
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
        &__box{
            flex-direction: row;
        }
    }
}

@media (min-width: 1100px){
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
        gap: 10rem;

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
            height: 40rem;
            width: 40rem;
        }
    }

    .container__btn{
        height: 20dvh;
        position: absolute;
        bottom:2rem;
    }


 
}

@media (min-width: 1100px) and (height < 500px){
  .container__photo{
    height: 30rem;
    & img{
        height: 30rem;
        width: 30rem;
    }
  }

 
}

@media (min-width: 1100px) and (height < 700px){
  .container__box{
    align-items: center;
  }
  .container__box__container{
    top: 0 !important;
  }
}
</style>
