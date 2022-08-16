import { RootState } from '@/store/StoreInterfaces'
import { MiscGetters, MiscState } from '@/store/misc/Interfaces'
import { GetterTree } from 'vuex'

const getters: GetterTree<MiscState, RootState> & MiscGetters = {
  getNodeUrl (state: MiscState): string {
    return state.nodeUrl || ''
  },
  getJackalContractName (state: MiscState): string {
    return state.jackalContractName || ''
  },
  getJackalContractAddress (state: MiscState): string {
    return state.jackalContractAddress || ''
  },
  getJackalContract (state: MiscState): any {
    return state.jackalContract || null
  },
  getCurrentDir (state: MiscState): any {
    return state.currentDir || {}
  },
  getLoadingStatus (state: MiscState): any {
    return state.loadingStatus || false
  },
  getAllMessages (state: MiscState): any {
    return state.allMessages || []
  }
}

export default getters
