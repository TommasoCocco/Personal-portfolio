<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import gsap from 'gsap';

const showPopup = ref(false);
const popup = ref(null);

function bloccaScorrimento() {
  document.body.style.overflow = 'hidden';
}

function sbloccaScorrimento() {
  document.body.style.overflow = '';
}

const openPopup = async () => {
    showPopup.value = true;
    await nextTick();

    console.log(popup.value);

    await gsap.fromTo(
        popup.value, 
        { opacity: 0}, 
        { 
            opacity: 1, 
            duration: 0.3, 
        }
    );
    bloccaScorrimento()
};


const closePopup = () => {
  gsap.to(popup.value, {
    autoAlpha: 0,
    duration: 0.3,
    ease: 'power2.inOut',
    onComplete: () => {
      showPopup.value = false
    }
  })
  sbloccaScorrimento()
}


</script>

<template>
    
    <div class="container" @click="openPopup">
        <div class="container__image">
            <img src="/img-bauli.svg" alt="">
        </div>
        <div class="container__text">
            <p>Bauli</p>
            <font-awesome-icon :icon="['fas', 'arrow-right']" class="container__text__icon"/>
        </div>
        <!-- POPUP DESCRIPTION WORK -->
        <div v-if="showPopup" class="section-preview" @click.stop>
            <div class="section-preview__box-container">
                <div class="section-preview__container-btn" @click="closePopup">
                    <h2 class="section-preview__container-btn-title">UI - UX design | web development</h2>
                    <font-awesome-icon :icon="['fas', 'xmark']" class="btn-close"/>
                </div>

                <div class="section-preview__popup" ref="popup">
                    <div class="section-preview__popup__wrapper">
                        <h3>Bauli project</h3>
                        <p>
                            Per un progetto accademico del corso di Sviluppo Web e Sistemistica, io e il mio team abbiamo collaborato con Bauli per realizzare una piattaforma digitale dedicata alla semplificazione del processo di onboarding aziendale del personale.
                            Mi sono occupato della progettazione UX/UI, curando sia l’esperienza utente che l’interfaccia grafica, e dello sviluppo front-end della piattaforma utilizzando Vue.js come framework principale.
                        </p>
                        <h4>Homepage - page</h4>
                        <img src="/Home-HR.jpg" alt="" class="section-preview__popup__wrapper__img-1">
                        <h4>Dashboard - page</h4>
                        <img src="/Dashboard-HR-utenteIT.jpg" alt="">
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    


</template>

<style scoped lang="scss">

p{
    color: #0d0d0d;
    max-width: 500px;
}
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 1.5rem;
    overflow: hidden;
    position: relative;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); /* Smooth easing */
    
    &:hover{
        box-shadow: 0px 4px 15px #00000026;
        .container__image{
            img{
                transform: scale(1.1);
            }
        }
    }


    .section-preview{
        width: 100%;
        height: 100%;
        display: flex;
        top: 0;
        left: 0;
        z-index: 1;
        flex-direction: column;
        align-items: center;
        justify-content: end;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.8); /* semi trasparente */
        transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
        
        &__box-container{
            gap: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: end;
            width: 75%;
            max-height: 90%;
            padding-bottom: 4rem;
        }

        &__container-btn{
            width: 100%;
            display: flex;
            justify-content: space-between;

            &-title{
                color: rgb(235, 235, 235);
            }

            & .btn-close{
                color: rgb(152, 152, 152);
                font-size: 3rem;
                cursor: pointer;
                transition: color 0.3s ease;

                &:hover{
                    color: #fff; /* Change color on hover */
                }
            }
        }

        &__popup{
            background-color: #ebf2ea;
            width: 100%;
            min-height: 400px;
            max-height: 85%;
            border-radius: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;

            &__wrapper{
                padding: 3rem;
                overflow: scroll;
                scrollbar-width: none;
                max-height: 89%;

                & h3{
                    font-size: 3rem;
                    margin: 0 0 5rem 0;
                    color: #3f3f3f;
                }

                & h4{
                    font-size: 1.5rem;
                    color: #3f3f3f;
                    letter-spacing: 0;
                    line-height: 30px;
                    font-family: 'Inter', sans-serif;
                }

                & img{
                    width: 100%;
                    border-radius: 1rem;
                }

                p{
                    color: #0d0d0d;
                    max-width: 500px;
                    margin: 0 0 3rem 0;
                }

                &__img-1{
                    margin-bottom: 2rem ;
                }
            }
        }
    }
}

.container__image {
    width: 30rem;
    height: 22rem;
    background-color: rgba(13, 57, 58, 0.1);
    border-radius: 1.5rem 1.5rem 0 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: center;


    & img {
        position: relative;
        transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); /* Smooth easing for img */
        max-width: 100%;
        max-height: 100%;
    }

}

.container__text {
    max-width: 30rem;
    width: 100%;
    height: 5.7rem;
    border-radius: 0 0 1.5rem 1.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    background-color: #fff;

    & p {
        color: #0d0d0d;
        font-size: 1.8rem;
        padding-left: 3.5rem;
    }

    &__icon{
        color: #0d0d0d;
        height: 1.5rem;
    }
}

@media screen and (max-width: 768px) {
    .section-preview{

        &__box-container{
            width: 90% !important;
        }

        &__popup{
            &__wrapper{
                padding: 2rem !important;

                & h4{
                    font-weight: 600 !important;
                }
            }
        }
    }
}


</style>
