<template>
  <div class="menu">
    <router-link to="home"><SquaresIcon /></router-link>
    <router-link to="swap"><SquaresIcon /></router-link>
    <router-link to="passwords"><SquaresIcon /></router-link>
    <router-link to="activity"><SquaresIcon /></router-link>
    <router-link to="settings"><SquaresIcon /></router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import SquaresIcon from '@/assets/svg/SquaresIcon.vue'

@Options({
  components: {
    SquaresIcon
  }
})
export default class Menu extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.menu {
  display: flex;
  justify-content: space-evenly;
}
a svg:hover {
  cursor: pointer;
  //color: #42b983;
  //https://codepen.io/sosuke/pen/Pjoqqp
  filter: brightness(0) saturate(100%) invert(67%) sepia(7%) saturate(3301%) hue-rotate(100deg) brightness(92%) contrast(88%);
}
</style>
