<script setup lang="ts">
import CardCarousell from "./CardCarousell.vue"
import CardBauli from "./CardBauli.vue"
import Btn from "./Btn.vue"

</script>

<template>
    <section class="container__works">
        <div class="container__works__title"><h2>My Recent Work</h2></div>
        <div class="container__works__subtitle"><h3>Qui alcuni dei miei progetti piú recenti</h3></div>
        <div class="container__works__card">
            <CardCarousell></CardCarousell>
            <CardBauli></CardBauli>
        </div>
        <div class="container__works__btn"><Btn class="btn--secondary"> <a href="https://github.com/TommasoCocco/" target="_blank">See some more</a></Btn></div>
        
    </section>
</template>

<style scoped lang="scss">
.container__works{
    display: flex;
    flex-direction: column;
    align-items:center ;
    background-color: #ebf2ea;
    
    &__title h2{
        font-size: 3rem;
        font-weight: 700;
        letter-spacing: -1.20px;
        margin: 0;
        margin-top: 6rem;
    }

    &__subtitle h3{
        font-size: 1.2rem;
        margin: 0;
        font-weight: 400;
        height: 1.8rem;
        letter-spacing: 0.36px;
        line-height: 28px;
    }

    &__card{
        margin-top: 5rem;
        display: flex;
        flex-wrap: wrap;
        gap: 3rem;
        padding: 0 2rem;
        align-items: center;
        justify-content: center;
    }

    &__btn{
        margin: 5rem 0;

        & a{
            text-decoration: none;
            color: #212121;
        }
    }
}


</style>