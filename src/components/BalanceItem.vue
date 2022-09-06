<template>
  <div class="balance">
    <div class="details">
      <div class="main-region">
        <img class="icon"/>
        <div class="text-region">
          <div class="upper">
            <span>{{ details.networkName }}</span>
            <span>${{ details.USD }}</span>
          </div>
          <div class="lower">
            <span>{{ details.total }} {{ details.ticker }}</span>
            <span v-if="details.change > 0" class="positive-green">+{{ details.change }}</span>
            <span v-if="details.change < 0" class="negative-red">{{ details.change }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { totalmem } from 'os'
import { Options, Vue } from 'vue-class-component'

@Options({
  props: ['details']
})
export default class BalanceItem extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .balance {
    width: 100vw;
    display: flex;
    flex-direction: row;
  }
  .icon {
    height: 36px;
    width: 36px;
    order: 0;
    border-radius: 100%;
  }
  .details {
    width: 315px;
    height: 62px;
    border-radius: 9px;
    border-radius: 16px;
    box-shadow: 0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3);
    background: linear-gradient(0deg, rgba(176, 198, 255, 0.15), rgba(176, 198, 255, 0.15)), #1B1B1E;
    margin-top: 5px;
    margin-bottom: 5px;
    color: #DCE2F9;
    display: flex;
  }
  .upper {
    display: flex;
    justify-content: space-between;
    font-family: 'Poppins';
    font-size: 21.9px;
    line-height: 18px;
  }
  .lower {
    display: flex;
    justify-content: space-between;
    font-family: 'Segoe UI';
    font-size: 16.5px;
    line-height: 16.5px;
  }
  .text-region {
    order: 2;
    width: 243px;
    height: 36px;
    position: relative;
    left: 11px;
  }
  .main-region {
    width: 289.5px;
    height: 36px;
    margin: auto;
    display: flex;
  }
  .positive-green {
    color: #82E09B;
  }
  .negative-red {
    color: #FFB4AB;
  }
</style>
