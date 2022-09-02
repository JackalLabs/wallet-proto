<template>
  <div class="balance">
    <div class="icon">
<!--      icon-->
    </div>
    <div class="details">
      <div class="upper"><span>{{ details.networkName }}</span><span>--</span></div>
      <div class="lower"><span>{{ details.total }}</span> <span>{{ details.ticker }}</span></div>
    </div>
  </div>
</template>

<script lang="ts">
import { totalmem } from 'os';
import { Options, Vue } from 'vue-class-component'

@Options({
  props: ["details"],
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
    height: 64px;
    width: 64px;
  }
  .details {
    width: calc(100% - 64px);
  }

  .upper {
    display: flex;
    justify-content: space-between;
  }
</style>
