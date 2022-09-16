/*jshint sub:true*/
<template>
  <div class="swap">
    <div class="row justify-center">
      <div v-if="modalActive" class="select-modal">
        <h1 class="select-modal-header">SELECT TOKEN</h1>
        <div class="dropdown-option" v-for="value, key in cryptoList" :key="key" @click="changeSelect(key)">
          <div class="option-content">
            <img :src="value.logo" class="option-logo"/>
            <div class="option-text">{{ value.name }}</div>
          </div>
        </div>
      </div>
      <div class="column header-region">
        <h1 class="header">SWAP</h1>
      </div>
    </div>
    <div class="row justify-center">
      <div class="column">
        <div class="from-group">
          <h2 class="swap-group-label">From</h2>
          <div class="input-region">
            <div class="swap-input">
              <input type="text" class="swap-text-in" v-model="fromInfo.amt"/>
            </div>
            <button class="swap-dropdown" @click="showModal">
              <img class="crypto-logo" :src="fromInfo.logo"/>
              <span class="dropdown-text">{{ fromInfo.name }}</span>
              <span class="material-symbols-outlined dropdown-icon">arrow_drop_down</span>
            </button>
          </div>
        </div>
        <button class="rotate-button" @click="rotate">
          <span class="material-symbols-outlined">swap_horiz</span>
        </button>
        <div class="to-group">
          <h2 class="swap-group-label">To</h2>
          <div class="input-region">
            <div class="swap-input">
              <input type="text" class="swap-text-in" v-model="toInfo.amt"/>
            </div>
            <button class="swap-dropdown" @click="showModal">
              <img class="crypto-logo" :src="toInfo.logo"/>
              <span class="dropdown-text">{{ toInfo.name }}</span>
              <span class="material-symbols-outlined dropdown-icon">arrow_drop_down</span>
            </button>
          </div>
        </div>
        <button class="swap-button">
          Swap
        </button>
      </div>
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
    fromInfo: {
      amt: null,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ethereum_logo_translucent.svg/640px-Ethereum_logo_translucent.svg.png',
      name: 'ETH'
    },
    toInfo: {
      amt: null,
      logo: 'test',
      name: 'test'
    },
    cryptoList: {
      ETH: {
        name: 'ETH',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ethereum_logo_translucent.svg/640px-Ethereum_logo_translucent.svg.png'
      }
    },
    modalActive: 0,
    modifyFrom: 0,
    modifyTo: 0
  }),
  methods: {
    rotate () {
      [this.fromInfo, this.toInfo] = [this.toInfo, this.fromInfo]
    },
    showModal () {
      this.modalActive = 1
    },
    hideModal () {
      this.modalActive = 0
      this.modifyFrom = 0
      this.modifyTo = 0
    },
    dropFrom () {
      this.modifyFrom = 1
      this.showModal()
    },
    dropTo () {
      this.modifyTo = 1
      this.showModal()
    },
    changeSelect (whichCoin) {
      this.hideModal()
      if (this.modifyFrom === 1) {
        this.fromInfo.name = this.cryptoList[whichCoin].name
        this.fromInfo.logo = this.cryptoList[whichCoin].logo
      } else {
        this.toInfo.name = this.cryptoList[whichCoin].name
        this.toInfo.logo = this.cryptoList[whichCoin].logo
      }
    }
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
  margin-bottom: 20px;
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
  border-width: 1.5px;
  width: 138px;
  height: 64px;
  border-radius: 4.3px;
  border-color: #E3E2E6;
  border-style: solid;
  padding: 0px;
  left: 1px;
}
.from-group {
  margin: auto;
  width: 271.5px;
}
.to-group {
  margin: auto;
  position: relative;
  top: 7px;
  width: 271.5px;
}
.input-region {
  display: flex;
}
.dropdown-icon {
  position: relative;
  left: 12.5px;
  font-size: 32.5px;
  top: 3px;
}
.crypto-logo {
  width: 32.5px;
  height: 32.5px;
  border-radius: 100%;
  background-color: #E3E2E6;
  position: relative;
  right: 6px;
  top: 3px;
}
.dropdown-text {
  color: #E3E2E6;
  font-family: "Segoe UI";
  font-size: 17.25px;
  position: relative;
  bottom: 7px;
  left: 5px;
}
.rotate-button {
  border-radius: 100%;
  border: none;
  width: 42px;
  height: 42px;
  background-color: #B0C6FF;
  color: #002D6E;
  position: relative;
  margin: auto;
  top: 15px;
}
.swap-button {
  position: relative;
  margin: auto;
  width: 275px;
  height: 54px;
  font-size: 22px;
  color: #002D6E;
  top: 20px;
  border-radius: 138px;
  background-color: #B0C6FF;
  font-weight: bold;
}
.select-modal {
  position: absolute;
  background-color: #272930;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  width: 362px;
  height: 505.98px;
  top: 5px;
  z-index: 100;
}
.select-modal-header {
  color: #E3E2E6;
  text-align: center;
  font-size: 32px;
  line-height: 32px;
}
.dropdown-option {
  background-color: #1B1B1E;
  width: 325px;
  height: 60px;
  border-radius: 9px;
  margin: auto;
  transition: 0.1s;
  display: flex;
  align-items: center;
}
.dropdown-option:hover {
  background-color: #30333E;
  box-shadow: 0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3);
}
.option-logo {
  width: 32px;
  height: 32px;
  background-color: #E3E2E6;
  border-radius: 100%;
}
.option-content {
  margin: auto;
  width: 290px;
  height: 30px;
  font-family: 'Segoe UI';
  color: #E3E2E6;
  font-size: 20px;
  display: flex;
  align-items: center;
}
.option-text {
  position: relative;
  left: 12.5px;
}
</style>
