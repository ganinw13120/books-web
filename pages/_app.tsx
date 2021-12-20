import '../styles/globals.css';
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app';
import React, { Component } from 'react';

import RootStore from '@store/RootStore'
import { Provider } from 'mobx-react';

import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";

const progress = new ProgressBar({
  size: 3,
  color: "#38a169",
  className: "bar-of-progress",
  delay: 100,
});

const _RootStore = new RootStore();
const store = {
  rootStore: _RootStore,
  appStore : _RootStore.appStore,
};

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Provider {...store}>
      <Component {...pageProps} />
    </Provider>
  </>
}

export default MyApp
