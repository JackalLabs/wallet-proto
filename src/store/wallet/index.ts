import { Module } from 'vuex'
import { WalletState } from '@/store/wallet/Interfaces'
import { RootState } from '@/store/StoreInterfaces'

import state from '@/store/wallet/state'
import getters from '@/store/wallet/getters'
import mutations from '@/store/wallet/mutations'

const misc: Module<WalletState, RootState> = {
  state,
  getters,
  mutations
}

export default misc
