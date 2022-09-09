<template>
  <div class="home">
    <div class="row justify-center">
      <div class="column header-region">
        <h1 class="header">${{ balance }}</h1>
        <div class="row test-coloration">
          <div class="left-head">
            <h2 class="change-positive">+${{ changeUSD }}</h2>
            <button class="btn-large">Deposit</button>
          </div>
          <div class="right-head">
            <h2 class="change-positive">{{ changePercent }}%</h2>
            <button class="btn-large">Send</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-center">
      <div class="column">
        <BalanceItem v-for="value, key in balanceItems" :key="key" :details="value"/>
      </div>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import BalanceItem from '@/components/BalanceItem.vue'

@Options({
  components: {
    BalanceItem
  },
  props: {},
  data: () => ({
    balance: 19018.474,
    changeUSD: 5000,
    changePercent: 0.42,
    balanceItems: {
      itemOne: {
        networkName: 'Ethereum',
        ticker: 'ETH',
        total: 0.01,
        USD: 15.86,
        change: 0.42
      },
      itemTwo: {
        networkName: 'Ethereum',
        ticker: 'ETH',
        total: 0.01,
        USD: 15.86,
        change: 0.42
      }
    }
  }),
  methods: {},
  computed: {}
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.home {
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
}
.header {
  color: #E3E2E6;
  font-size: 47px;
  line-height: 47px;
  margin: 0px;
}
.left-head {
  width: 157.5px;
  height: 91.5px;
  margin-right: 10px;
  text-align: right;
}
.right-head {
  width: 157.5px;
  height: 91.5px;
  margin-left: 10px;
  text-align: left;
}
.test-coloration {
  display: flex;
}
.change-positive {
  font-size: 24px;
  line-height: 24px;
  margin: 0px;
  font-family: "Segoe UI";
  font-weight: 262.5px;
  color: #82E09B;
}
.btn-large {
  background-color: #B0C6FF;
  border-color: transparent;
  border-radius: 138.75px;
  padding: 0px;
  width: 146.25px;
  height: 55.47px;
  font-family: "Segoe UI";
  font-weight: medium;
  font-size: 19.4px;
  margin-top: 15px;
}
</style>
