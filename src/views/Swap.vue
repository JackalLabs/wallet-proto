<template>
  <div class="swap">
      <div class="row justify-center">
        <div class="column header-region">
          <h1 class="header">SWAP</h1>
        </div>
      </div>
    <div class="row justify-center">
      <div class="column">
        <div class="from-group">
          <h2 class="swap-group-label">From</h2>
          <div class="swap-input">
            <input type="text" class="swap-text-in"/>
          </div>
          <button class="swap-dropdown">
          </button>
        </div>
      </div>
    </div>

    <!--
    <div>pay</div>
    <div>
      <input type="text" v-model="pairing.source.amt" />
      <span> | </span>
      <select v-model="pairing.source.name">
        <option v-for="token in tokens" :value="token" :key="token.id" >{{ token }}</option>
      </select>
    </div>
    <div @click="flipSwap">Flip</div>
    <div>receive</div>
    <div>
      <input type="text" v-model="pairing.to.amt" />
      <span> | </span>
      <select v-model="pairing.to.name">
        <option v-for="token in tokens" :value="token" :key="token.id" >{{ token }}</option>
      </select>
    </div>
    -->
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import { mapMutations } from 'vuex'

@Options({
  components: {},
  props: {},
  data: () => ({
    pairing: { source: { name: 'ATOM', amt: 0 }, to: { name: 'JKL', amt: 0 } },
    sourceName: 'ATOM',
    toName: 'JKL',
    tokens: [
      'JKL',
      'ATOM',
      'USDC'
    ]
  }),
  methods: {
    ...mapMutations([]),
    flipSwap () {
      this.pairing = Object.assign({}, { source: this.pairing.to, to: this.pairing.source })

      // const to = this.pairing.to
      // this.pairing.to = this.pairing.source
      // this.pairing.source = to
    }
  },
  computed: {

  }
})
export default class AddWallet extends Vue {}
</script>

<style scoped lang="scss">
.swap {
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.row {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 27px;
}
.justify-center {
  justify-content: center;
}
.column {
  display: flex;
  flex-direction: column;
  width: 315px;
}
.header-region {
  text-align: center;
  background-color: red;
}
.header {
  color: #E3E2E6;
  font-size: 47px;
  line-height: 47px;
  margin: 0px;
}
.swap-group-label {
  color: #E3E2E6;
  font-size: 17.355px;
  line-height: 17.355px;
  font-weight: 400;
  margin: 0px;
  margin-bottom: 5px;
}
.swap-input input[type='text']{
  background-color: #1C1C1C;
  color: #E3E2E6;
  border-style: solid;
  border-radius: 4.3px;
  border-color: #E3E2E6;
  border-width: 1.5px;
  position: relative;
  width: 103.5px;
  height: 60.75px;
  font-size: 17.35px;
  font-family: "Segoe UI";
  padding-left: 15.75px;
  padding-right: 15.75px;
  padding-top: 0px;
  padding-bottom: 0px;
  right: 1px;
}
*:focus {
  outline: none;
}
.swap-dropdown {
  background-color: #1C1C1C;
  color: #E3E2E6;
  position: relative;
  bottom: 3px;
  border-width: 1.5px;
  width: 138px;
  height: 64px;
  border-radius: 4.3px;
  border-color: #E3E2E6;
  border-style: solid;
  left: -1px;
}
.from-group {
  margin: auto;
  background-color: green;
  width: 271.5px;
}
</style>
