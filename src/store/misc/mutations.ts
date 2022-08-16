import { MutationTree } from 'vuex'
import { MiscState } from '@/store/misc/Interfaces'
import state from './state'

const mutations: MutationTree<MiscState> = {
  updateNodeUrl: (state: MiscState, payload: string): void => {
    state.nodeUrl = payload
  },
  updateJackalContractName: (state: MiscState, payload: string): void => {
    state.jackalContractName = payload
  },
  updateJackalContractAddress: (state: MiscState, payload: string): void => {
    state.jackalContractAddress = payload
  },
  updateJackalContract: (state: MiscState, payload: any): void => {
    state.jackalContract = payload
  },
  updateCurrentDir: (state: MiscState, payload: any): void => {
    state.currentDir = payload
  },
  updateLoadingStatus: (state: MiscState, payload: any): void => {
    state.loadingStatus = payload
  },
  updateAllMessages: (state: MiscState, payload: any): void => {
    state.allMessages = payload
  }

}

export default mutations
