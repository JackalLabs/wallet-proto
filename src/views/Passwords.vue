<template>
  <div class="addwallet">
    <div>Password</div>
    <div><input type="text" v-model="password" /></div>
    <div>Add Wallet</div>
    <div><input type="text" v-model="name" /></div>
    <div><textarea v-model="seed" placeholder="Paste or Type Seed"></textarea></div>
    <div><button @click="compileWallet">I'm Done</button></div>
    <div>{{ JSON.stringify(result) }}</div>
    <div><input type="text" v-model="unpassword" /></div>
    <div><button @click="depileWallet">I'm Still Done</button></div>
    <div>{{ JSON.stringify(unresult) }}</div>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import { mapMutations } from 'vuex'
import { parse } from 'tldts'

import { encryptSeed, decryptSeed } from '@/helpers/crypt'

@Options({
  components: {},
  props: {},
  data: () => ({
    password: '',
    unpassword: '',
    name: '',
    seed: '',
    result: {},
    unresult: {}
  }),
  methods: {
    ...mapMutations([
      'addWallet',
      'updateActiveWallet'
    ]),
    async compileWallet () {
      this.result = {
        address: '123',
        name: this.name,
        seed: await encryptSeed(this.password, this.seed)
      }
      alert('done')
    },
    async depileWallet () {
      const tmp = await decryptSeed(this.unpassword, this.result.seed).catch(err => console.log(err))
      this.unresult = {
        address: '123',
        name: this.result.name,
        seed: tmp
      }
      alert('done')
    }
  },
  computed: {}
})
export default class AddWallet extends Vue {}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  padding: 0 50px;
}
.home::-webkit-scrollbar {
    display: none;
}
h2 {
  margin-bottom: 10px;
}
h3 {
  width: fit-content;
  margin: 3rem auto;
}
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px;
  gap: 24px;
}
.topper {
  width: 100%;
  margin-top: 36px;
  display: flex;
  flex-direction: row;
}
.filebar {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.options {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
}
//Buttons
.btn {
  border: 0;
  box-shadow: none;
  background: none;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-size: large;
}
.settings {
  height: 53px;
  width: 60px;
  margin-left: 30px;
  background: #0B152C;
  border-radius: 14px;
  align-items: center;
}
.settings component {
  height: 23.5px;
  width: 21px;
  background: #757B87;
}
.folder-top{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.new-folder-btn{
  color: #C0C5CE;
  background: none;
  border: none;
}
.listmode {
  height: 46px;
  width: 46px;
}
.listmode component {
  height: 10px;
  width: 12px;
  background: #C0C5CE;
}
.tilemode {
  height: 46px;
  width: 46px;
}
.tilemode component {
  height: 10px;
  width: 10px;
  background: #C0C5CE;
}
.sortorder {
  height: 46px;
  width: fit-content;
  color: #C0C5CE;
}
$SVGSize: 20px;

.sortorder > .svg {
  margin-right: 5px;
  width: $SVGSize;
  height: $SVGSize;
}

.btn > svg {
  width: $SVGSize;
  height: $SVGSize;
}

.svg > svg {
  width: 100%;
  height: 100%;
}

.select {
  height: 46px;
  width: fit-content;
  color: #C0C5CE;
}
//End Buttons

.activemode svg path {
  fill: #08B4B2;
}
</style>
