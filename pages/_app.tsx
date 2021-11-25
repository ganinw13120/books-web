import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { Component } from 'react';

import RootStore from '@store/RootStore'
import { Provider } from 'mobx-react';

const _RootStore = new RootStore();
const store = {
  rootStore: _RootStore,
  appStore : _RootStore.appStore,
};
export default class MyApp extends Component <AppProps, any> {
  render () : JSX.Element {
    return <>
      <Provider {...store}>
        <this.props.Component {...this.props.pageProps} />
      </Provider>
    </>
  }
}
