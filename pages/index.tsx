import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import styles from '@styles/Home.module.css'

import SearchBar from '@components/app/SearchBar';

import {
  Formik,
  Form,
  Field,
} from 'formik';

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
      <div className='w-screen h-screen relative'>
        <div className={styles.container}>
          <SearchBar />
        </div>
      </div>
    </>
  )
}

export default Home
