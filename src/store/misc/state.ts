import { MiscState } from '@/store/misc/Interfaces'

const state: MiscState = {
  nodeUrl: '',
  jackalContractName: '',
  jackalContractAddress: '',
  jackalContract: null,
  currentDir: {},
  loadingStatus: false,
  allMessages: []
}

export default state
