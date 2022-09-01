<template>
  <div class="home">
    <BalanceItem />
    <BalanceItem />
    <BalanceItem />
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
  data: () => ({}),
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
