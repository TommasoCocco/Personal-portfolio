<script setup lang="ts">
import gsap from 'gsap';

const beforeEnter = (el) => {
  el.style.opacity = "0";
}

const enterTitle = (el) => {
  gsap.to(el, {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", // Stato finale (visibile)
    opacity: 1,
    delay: 0.5,
    duration: 1, // Durata della transizione
    stagger: 0.5
  });
};
</script>

<template>
    <footer>
        <section class="container">
            <div class="contacts" id="footer">
                <transition
                appear 
                @before-enter="beforeEnter"
                @enter="enterTitle">
                    <p class="contacts_text">CONTACTS</p>

                </transition>
                <img src="/Component 3.svg" alt="" class="line">
            </div>

            <div class="container_info">
                <div class="link">
                    <a href="#about" class="footer-link">About</a>
                    <a href="#works" class="footer-link">My Work</a>
                </div>
                <div class="mail">
                    <a href="mailto:tommasococco02@gmail.com" rel="noopener noreferrer" target="_blank" class="container__mail__link">
                        <span class="container__mail__gradient">tommasococco02@gmail.com</span>
                    </a>
                </div>
                <div class="social">
                    <a href="https://github.com/TommasoCocco" target="_blank" class="github"><img src="/github.svg" alt=""></a>
                    <a href="https://www.instagram.com/_tommasococco/" target="_blank" class="instagram"><img src="/insta.svg" alt=""></a>
                    <a href="https://www.linkedin.com/in/tommaso-cocco-2674252a9/" target="_blank" class="linkedin"><img src="/linkedin.svg" alt=""></a>
                </div>
            </div>
            <hr>
        </section>
    </footer>
</template>

<style scoped lang="scss">
footer {
    height: 40rem;
    background: linear-gradient(90deg, #042940 10%, #015C53 100%);
    display: flex;
    justify-content: center;    
    .footer-link {
        color: #f5f5f5;
        text-decoration: none;
        font-size: 16px;
        margin-bottom: 1rem;
    }
}

.container{
    width: 80%;

    & hr{
        width: 85%;
        margin-bottom: 4rem;
        border-style: solid;
        border-width: 1px;
        border-image: linear-gradient(90deg, #7DB13A , #DBF228 ) 1;
    }
}

.container_info{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    margin-bottom: 4rem;
    padding-left: 2rem;
}

.mail{
    margin-bottom: 3rem;
}

.contacts {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    top: -6.8rem;
    left: -3rem;
    width: 10rem;
}

.contacts_text {
    font-size: 12px;
    color: #0d0d0d;
    margin: 0;
}

.link {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    position: relative;
    top: -3rem;
}

.container__mail__gradient {
    font-size: 1.6rem;
    font-weight: 400;

    // Applica il gradiente al testo
    background: #f5f5f5 ;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.social{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;

    img{
        height: 4rem;
    }
}



@media screen and (min-width: 980px) {

.container{
    display: flex;
    flex-direction: column;
    width: 83%;
    max-width: 145rem;

    & hr{
        margin-bottom: 9rem;
    }
   
}

.container_info{
    padding-left: 6rem;
    margin-bottom: 9rem;
}

.contacts {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    top: -6.8rem;
    left: 0rem;
    width: 10rem;

        &__text{
            font-size: 12px;
            color: #0d0d0d;
            margin: 0;
        }
}

.mail{
    display: flex;
    flex-direction: column;
    margin-bottom: 0rem;
}

.link {
    display: flex;
    flex-direction: column;
    padding-left: 6rem;
    position: relative;
    top: 0rem;
    gap: 1rem;
}

.container_info {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto auto;
    gap: 1rem;
}

.link {
    grid-column: 2 / 2;
    grid-row: 1 / 3;
}

.mail {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
}

.social {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
}

}

</style>
