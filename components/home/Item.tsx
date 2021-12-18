import { Review } from '@models/Review';
import styles from '@styles/home/Item.module.css';
import Image from 'next/image'

type ItemProps = {
    data : Review
}

const Item: React.FC<ItemProps> = ({data}) => {
    return (
        <>
            <div className={`my-5 border border-light-gray rounded-lg p-5 md:p-10 flex text-black shadow ${styles.itemContainer}`}>
                <div className={`${styles.imageContainer} flex-none`}>
                    <Image src={data.book_img_url}
                        layout='fill'
                        className={`${styles.image}`}
                        objectFit='contain'
                    />
                </div>
                <div className={`mx-3 flex-grow`}>
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
                    <div className='mt-4'>
                        <a className={`font-light  text-xs`}>
                            {data.description}
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item
