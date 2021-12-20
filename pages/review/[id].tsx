import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios';
import Image from 'next/image'
import parse from 'html-react-parser';
import { Review } from '@models/Review';

import styles from '@styles/review-detail/Review-detail.module.css';

import Navbar from '@components/home/Navbar';

type ReviewDetailProps = {
    data: Review,
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const filter = context.query
    console.log(context.query)
    if (!context.query.id) return { notFound: true };
    const reviewList = await axios.get('https://books.api.ganinw.dev/reviews/get/' + context.query.id, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return {
            err: null,
            result: res.data.data as Review
        }
    }).catch((err) => {
        return {
            err: err,
            result: []
        }
    })
    return {
        props: {
            data: JSON.parse(JSON.stringify(reviewList.result))
        } as ReviewDetailProps
    }
}

const Home: NextPage<ReviewDetailProps> = ({ data }) => {
    return (
        <>
            <Navbar />
            <div className={`w-5/6 md:w-1/2 mx-auto py-10 font-sarabun`}>
                <div className='flex w-full'>
                    <div className={`${styles.imageContainer} flex-none drop-shadow-lg`}>
                        <Image
                            src={data.book_img_url}
                            layout='fill'
                            className={`${styles.image} `}
                            objectFit='contain'
                        />
                    </div>
                    <div className={`mx-3 flex-grow`}>
                        <div className='mt-1'>
                            <a className={`text-drak-gray text-xs md:text-lg font-sarabun`}>
                                {data.book_name}
                            </a>
                        </div>
                        <div className='mt-2'>
                            <a className={`text-gray text-xs md:text-base font-sarabun`}>
                                โดย {data.book_author}
                            </a>
                        </div>
                        <div className='mt-2'>
                            <a className={`text-gray text-xs md:text-base font-sarabun`}>
                                เมื่อ {new Date(data.created_at).toLocaleString()}
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`${styles.title} mt-10 text-drak-gray font-sarabun`}>
                    {parse(data.title)}
                </div>
                <div className={`${styles.description} mt-10 text-drak-gray font-sarabun`}>
                    {parse(data.description)}
                </div>
            </div>
        </>
    )
}

export default Home
