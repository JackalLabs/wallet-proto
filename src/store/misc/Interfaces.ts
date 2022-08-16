export interface MiscState {
  nodeUrl: string,
  jackalContractName: string,
  jackalContractAddress: string,
  jackalContract: any,
  currentDir: any,
  loadingStatus: boolean,
  allMessages: any
}

export interface MiscGetters {
  getNodeUrl(state: MiscState): string;
  getJackalContractName(state: MiscState): string;
  getJackalContractAddress(state: MiscState): string;
  getJackalContract(state: MiscState): any;
  getCurrentDir(state: MiscState): any;
  getLoadingStatus(state: MiscState): boolean;
  getAllMessages(state: MiscState): any;
}
