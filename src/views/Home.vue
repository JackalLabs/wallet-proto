<template>
  <div class="home">
    <BalanceItem :details="details"/>
    <BalanceItem :details="details"/>
    <BalanceItem :details="details"/>
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
    details: {
      networkName: 'Ethereum',
      ticker: 'ETH',
      total: 0.01,
      USD: 15.86,
      change: 0.42
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
</style>
