import { MutationTree } from 'vuex'
import { WalletState } from '@/store/wallet/Interfaces'
import WalletObject from '@/interfaces/IWalletObject'

const mutations: MutationTree<WalletState> = {
  addWallet: (state: WalletState, payload: WalletObject): void => {
    state.wallets[payload.name] = payload
    localStorage.setItem('allWallets', JSON.stringify(state.wallets))
  },
  updateActiveWallet: (state: WalletState, payload: string): void => {
    state.activeWallet = payload
    localStorage.setItem('activeWallet', payload)
  },
  loadAllWallets: (state: WalletState): void => {
    state.wallets = JSON.parse(localStorage.getItem('allWallets') || '') || {}
  }
}

export default mutations
