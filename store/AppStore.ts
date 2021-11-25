import { makeObservable, observable, action, makeAutoObservable } from 'mobx';
import RootStore from './RootStore';

type Store = {
}

export class AppStore {
  rootStore: RootStore; // contains the root of store (outest mobx)

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this)
  }

  @observable
  store : Store = {
  }
  
}