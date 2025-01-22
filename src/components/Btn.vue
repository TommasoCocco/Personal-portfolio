<script setup lang="ts">
import { icon } from '@fortawesome/fontawesome-svg-core';
import { computed } from 'vue';


const props = defineProps<{
    text?: string
    icon?: string
    modifiers?: string | string[]
}>()

const hasModifiersClasses = computed(() => {
    let normalizedModifiers = typeof props.modifiers === 'string' ?
        props.modifiers?.split(' ') : props.modifiers
    return normalizedModifiers?.map((item) => `btn--${item}`)
})
</script>

<template>
 <button type="button" class="btn" :class="hasModifiersClasses">
    <slot>{{ text }}</slot>
    <slot name="icon"><i v-if="icon" class="fa-solid" :class="`fa-${icon}`"></i></slot>
    
</button>


</template>

<style scoped lang="scss">
.btn{
    border-radius: 40px;
    border: 0px;

    a{
        text-decoration: none;
    }
    
    &--primary{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background-color: #DBF228;   
        width: 30rem;
        height: 6rem;
        
        & p{
            color: #0d0d0d !important;
            font-family: "Inter-Medium", Helvetica;
            font-weight: 500;
        }
        a{
            color: #0d0d0d !important;
        }
    }

    &--secondary{
        background-color: #DBF228;   
        width: 13rem;
        height: 4rem;

        & p{
            font-size: 1.2rem;
            font-weight: 600;
            line-height: 10.8px;
        }
    }

    &--menu{
        display: flex;
        background-color: #DBF228;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
        height: 5rem;
        width: 6rem;
        border-radius: 0rem 1rem 1rem 0rem;

        & p{
            display: none;
            color: #0d0d0d;
        }
    }

}

</style>