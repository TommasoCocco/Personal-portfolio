<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import gsap from 'gsap';
import Btn from './Btn.vue';

const showPopup = ref(false);
const popup = ref(null);

function bloccaScorrimento() {
  document.body.style.overflow = 'hidden';
}

function sbloccaScorrimento() {
  document.body.style.overflow = '';
}


const openPopupCarousell = async () => {
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

const closePopupCarousell = () => {
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
    
    <div class="container" @click="openPopupCarousell">
        <div class="container__image">
            <img src="/img-carousell.svg" alt="">
        </div>
        <div class="container__text">
            <p>Carousell</p>
            <font-awesome-icon :icon="['fas', 'arrow-right']" class="container__text__icon"/>
        </div>

        <!-- POPUP DESCRIPTION WORK -->
        <div v-if="showPopup" class="section-preview" @click.stop>
            <div class="section-preview__box-container">
                <div class="section-preview__container-btn" @click="closePopupCarousell">
                    <h2 class="section-preview__container-btn-title">UI - UX design | web development</h2>
                    <font-awesome-icon :icon="['fas', 'xmark']" class="btn-close"/>
                </div>

                <div class="section-preview__popup" ref="popup">
                    <div class="section-preview__popup__wrapper">
                        <div class="section-preview__popup__wrapper__left">
                            <h3>Carousell project</h3>
                            <p>
                                Questo progetto è nato come un’esercitazione per prendere confidenza con Vue.js e allo stesso tempo migliorare le mie competenze in HTML, CSS e JavaScript. L’idea era quella di mettere in pratica quello che stavo studiando, sperimentare con il framework e capire meglio come costruire un'componente partendo da zero. È stato un buon modo per imparare facendo, divertirmi un po’ con il codice e vedere i progressi passo dopo passo.                            
                            </p>
                            <a href="https://github.com/TommasoCocco/" target="_blank" class="btn-container">
                                <Btn class="btn--card"> 
                                        <p>SOME MORE</p>
                                        <img src="/github-mark.svg" alt="">
                                </Btn>
                            </a>  
                            
                        </div>
                        <div class="section-preview__popup__wrapper__right">
                            <img src="/carousell-popup-img.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<style scoped lang="scss">

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30rem;
    border-radius: 1.5rem;
    overflow: hidden;
    position: relative;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); /* Smooth easing */

    &:hover{
        .container__image{
            img{
                transform: scale(1.1);
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
    justify-content: center;
    overflow: hidden;

    & img {
        position: relative;
        transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); /* Smooth easing for img */
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

.container:hover {
    box-shadow: 0px 4px 15px #00000026;
}


.section-preview{
        width: 100%;
        height: 100%;
        display: flex;
        top: 0;
        left: 0;
        z-index: 2000;
        justify-content: center;
        align-items: end;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.8); /* semi trasparente */
        transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
        
        &__box-container{
            gap: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: end;
            width: 75%;
            padding-bottom: 4rem;
            max-height: 80%;
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
            gap: 1rem;
            justify-content: end;
            overflow: hidden;

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
                    height: 100%;
                    border-radius: 1rem;
                }

                p{
                    color: #0d0d0d;
                    margin: 0 0 3rem 0;
                    margin: 0;
                }

                &__img-1{
                    margin-bottom: 2rem ;
                }   

                &__left{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                }

                &__right{
                    width: 100%;
                    display: flex;
                    flex-direction: column;

                    & img{
                        width: 100%;
                        object-fit: contain;
                        padding: 3rem 0 0 0;
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

.btn-container{
    display: flex;
    width: 100%;
    align-items: center;
    margin-top: 3rem;

    & img {
        width: 2rem;
        height: 2rem;
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

        .btn-container{
            justify-content: center;
            width: 100%;

            & .btn--card{
                width: 100%;
            }
        }
    }
    
}

@media screen and (max-height: 768px) {
 .section-preview{
    &__popup{
            overflow: scroll;

            &__wrapper{
                min-height: 0;
                overflow: scroll;
            }
        }
    }
}

@media screen and (min-width: 1200px) {
.section-preview{
    justify-content: center;
    
    &__box-container{
        justify-content: center;
    }
    
    &__popup{
        &__wrapper{
            flex-direction: row;
            min-height: 450px;
            max-width: 1400px;

            & p{
                max-width: 500px;
            }

            

            &__left{
                width: 40%;
            }

            &__right{
                width: 60%;
            }
        }
    }
}
}

</style>
