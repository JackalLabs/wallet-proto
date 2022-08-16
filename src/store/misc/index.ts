import { Module } from 'vuex'
import { MiscState } from '@/store/misc/Interfaces'
import { RootState } from '@/store/StoreInterfaces'

import state from '@/store/misc/state'
import getters from '@/store/misc/getters'
import mutations from '@/store/misc/mutations'

const misc: Module<MiscState, RootState> = {
  state,
  getters,
  mutations
}

export default misc
