import styles from '@styles/home/Item.module.css';
import Image from 'next/image'
const Navbar: React.FC = () => {
    return (
        <>
            <div className={`border border-light-gray rounded-lg p-10 flex ${styles.itemContainer}`}>
                <div className={`${styles.imageContainer} flex-none`}>
                    <Image src='https://storage.naiin.com/system/application/bookstore/resource/product/202106/529599/1000242074_front_XL.jpg?t=search&imgname=AS-A-MAN-THINKETH-%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B8%81%E0%B8%B3%E0%B8%AB%E0%B8%99%E0%B8%94%E0%B8%8A%E0%B8%B5%E0%B8%A7%E0%B8%B4%E0%B8%95%E0%B9%84%E0%B8%94%E0%B9%89-(%E0%B8%9B%E0%B8%81%E0%B9%81%E0%B8%82%E0%B9%87%E0%B8%87)'
                        layout='fill'
                        objectFit='contain'
                    />
                </div>
                <div className={`m-3`}>
                    <div>
                        <a>
                        หนังสือชุดนี้หนังสือชุดนี้
                        </a>
                    </div>
                    <div>
                        <a>
                            Description Description Description Description Description Description
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
