import '../styles/globals.css';
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app';
import React, { Component } from 'react';

import RootStore from '@store/RootStore'
import { Provider } from 'mobx-react';

const _RootStore = new RootStore();
const store = {
  rootStore: _RootStore,
  appStore : _RootStore.appStore,
};

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Provider {...store}>
      <Component {...pageProps} />
    </Provider>
  </>
}

export default MyApp
