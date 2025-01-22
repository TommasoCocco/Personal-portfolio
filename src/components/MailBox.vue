<script setup lang="ts">
</script>

<template>
  <section class="container">
    <div class="container__mail">
      <h5>Hai un progetto in mente? Raccontamelo!</h5>
      <p>Send me an email:</p>
      <div class="container__mail__label">
        <a href="mailto:tommasococco02@gmail.com" rel="noopener noreferrer" target="_blank" class="container__mail__link">
          <span class="container__mail__gradient">tommasococco02@gmail.com</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50rem;
  background-color: #ebf2ea;

  &__mail {
    background-color: rgba(13, 57, 58, 0.05);
    width: 80%;
    max-width: 140rem;
    height: 27rem;
    border-radius: 3rem;
    box-shadow: 4px 4px 15px #00000040;
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    h5 {
      font-family: "Inter-medium", Helvetica;
      font-size: 2.4rem;
      text-align: center;
      font-weight: 500;
      margin: 0;
    }

    p {
      color: #0d0d0d;
      font-size: 1.8rem;
      margin: 0;
    }

    &__label {
      display: flex;
      justify-content: center;

      a {
        text-decoration: none;
        display: flex;
        gap: 0.2rem;
      }
    }

    &__gradient {
      font-size: 2.3rem;
      font-weight: 400;

      // Gradient styling for the text
      background: linear-gradient(
        90deg, 
        rgb(1, 92, 83) 0%,   
        rgb(125, 177, 58) 50%, 
        rgb(1, 92, 83) 100% 
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
