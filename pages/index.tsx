import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from '@styles/home/Home.module.css'

import SearchBar from '@components/app/SearchBar';

import {
  Formik,
  Form,
  Field,
} from 'formik';

import Navbar from '@components/home/Navbar';
import Item from '@components/home/Item';

import axios from 'axios';

import React, { ReactElement } from 'react';
import { Review } from '@models/Review';

type HomeProps = {
  reviewList: Array<Review>,
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const filter = context.query
  let queryParam = '';
  if (filter.name ){
    queryParam += `name=${filter.name}`;
  }
  if (queryParam != '') queryParam = '?' + queryParam;
  const reviewList = await axios.get('https://books.api.ganinw.dev/reviews/get/all' + queryParam, {
    headers: {
      "Content-Type": "application/json",
    }
  }).then((res) => {
    return {
      err: null,
      result: res.data.data as Array<Review>
    }
  }).catch((err) => {
    return {
      err: err,
      result: []
    }
  })
  return {
    props: {
      reviewList: JSON.parse(JSON.stringify(reviewList.result))
    } as HomeProps
  }
}

const Home: NextPage<HomeProps> = ({ reviewList }) => {
  const router = useRouter()
  return (
    <>
      <div className='w-screen'>
        <Navbar />
        <div className={`w-5/6 md:w-1/2 mx-auto mt-10 ${styles.searchbarWrapper}`}>
          <SearchBar maxDisplay={5} onSelect={(name)=>{
            router.push('/filter?name=' + name);
            console.log(name)
          }}/>
        </div>
        <div className={`w-5/6 md:w-1/2 mx-auto mt-10 font-sarabun text-xl`}>
          รีวิวล่าสุด
        </div>
        <div className={`w-5/6 md:w-1/2 mx-auto mt-5 ${styles.itemWrapper}`}>
          {(() => {
            const items: ReactElement[] = [];
            reviewList.forEach((e, key) => {
              items.push(
                <Item data={e} key={key} />
              );
            })
            return items;
          })()}
        </div>
      </div>
    </>
  )
}

export default Home
