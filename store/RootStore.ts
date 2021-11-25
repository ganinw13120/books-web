import {AppStore} from "./AppStore";

export default class RootStore {
  public appStore = new AppStore(this);
}