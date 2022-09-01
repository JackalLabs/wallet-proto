import { Module } from 'vuex'
import { PasswordState } from '@/store/password/Interfaces'
import { RootState } from '@/store/StoreInterfaces'

import state from '@/store/password/state'
import getters from '@/store/password/getters'
import mutations from '@/store/password/mutations'

const misc: Module<PasswordState, RootState> = {
  state,
  getters,
  mutations
}

export default misc
