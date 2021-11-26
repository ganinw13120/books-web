import { makeObservable, observable, action, makeAutoObservable } from 'mobx';
import RootStore from './RootStore';

import {Book} from '@models/Book';
import BookRepository, { IBookRepository } from '@repository/Books';

type Store = {
}

export class AppStore {
  rootStore: RootStore; // contains the root of store (outest mobx)
  bookRepository : IBookRepository;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.bookRepository = new BookRepository();
    makeAutoObservable(this)
  }

  @observable
  store : Store = {
  }
  

  @action
  public async SearchBooks (name : string, cb : (data : Book[]) => void) : Promise<void> {
    const data = await this.bookRepository.FetchBooks(name);
    cb?.(data);
  }
}