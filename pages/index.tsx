import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import styles from '@styles/home/Home.module.css'

import SearchBar from '@components/app/SearchBar';

import {
  Formik,
  Form,
  Field,
} from 'formik';

import Navbar from '@components/home/Navbar';
import Item from '@components/home/Item';

import React from 'react';

type HomeProps = {
  bookList: Array<any>,
}

type FormVal = {
  name: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      bookList: []
    } as HomeProps
  }
}

const Home: NextPage<HomeProps> = ({ bookList }) => {
  const initialValues: FormVal = { name: '' };
  return (
    <>
      <div className='w-screen'>
        <Navbar />
        <div className='w-1/2 mx-auto mt-10'>
          <Item />
        </div>
        {/* <div className={styles.container}>
          <SearchBar />
        </div> */}
      </div>
    </>
  )
}

export default Home
