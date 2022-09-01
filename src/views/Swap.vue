<template>
  <div class="swap">
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
</style>
