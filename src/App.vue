<template>
  <router-view />
  <Menu />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Menu from '@/components/Menu.vue'
import { mapMutations } from 'vuex'

@Options({
  components: {
    Menu
  },
  methods: {
    ...mapMutations([
      'loadAllWallets'
    ])
  },
  mounted () {
    this.loadAllWallets()
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
