<script setup lang="ts">

</script>

<template>
    
    <div class="container" >
        <a href="https://github.com/TommasoCocco/carousel-vue" target="_blank">
            <div class="container__image">
                <img src="/mockup.svg" alt="">
            </div>
            <div class="container__text">
                <p>Carousell</p>
                <font-awesome-icon :icon="['fas', 'arrow-right']" class="container__text__icon"/>
            </div>
        </a> 
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
}

.container__image {
    width: 30rem;
    height: 22rem;
    background-color: rgba(13, 57, 58, 0.1);
    border-radius: 1.5rem 1.5rem 0 0;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
        position: relative;
        transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); /* Smooth easing for img */
    }

    &:hover img {
        top: 0.3rem;
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
    top: -0.2rem;
}

</style>
