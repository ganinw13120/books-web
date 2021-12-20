import { Review } from '@models/Review';
import styles from '@styles/home/Item.module.css';
import Image from 'next/image'
import { useRouter } from 'next/router';
import parse from 'html-react-parser';

type ItemProps = {
    data: Review
}

const Item: React.FC<ItemProps> = ({ data }) => {
    const router = useRouter()
    return (
        <>
            <div className={`hover:underline cursor-pointer my-5 border border-light-gray rounded-lg p-5 md:p-10 flex text-black shadow ${styles.itemContainer}`}
                onClick={() => {
                    router.push('/review/' + data.id);
                }}
            >
                <div className={`${styles.imageContainer} flex-none drop-shadow-lg`}>
                    <Image src={data.book_img_url}
                        layout='fill'
                        className={`${styles.image} `}
                        objectFit='contain'
                    />
                </div>
                <div className={`mx-3 flex-grow h-auto`}>
                    <div>
                        <a className={`text-base md:text-lg font-sarabun `}>
                            {data.title}
                        </a>
                    </div>
                    <div className='mt-1'>
                        <a className={`text-gray text-xs md:text-sm`}>
                            {data.book_name} ({data.book_author})
                        </a>
                    </div>
                    <div className='mt-2'>
                        <div className={`font-light text-xs ${styles.description}`}>
                            {parse(data.description)}
                        </div>
                    </div>
                    <div className='mt-2 text-gray float-right underline font-sarabun hover:text-black'>
                        อ่าน {'>'}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item
