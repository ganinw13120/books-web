import styles from '@styles/home/Navbar.module.css';

const Navbar: React.FC = () => {
    return (
        <>
            <div className='md:px-16'>
                <div className={`${styles.navbar} flex py-6 text-black align-middle`}>
                    <div className={`${styles.title} mx-4`}>
                        Gan Mongklakorn
                        {/* <a className={`${styles.category} hidden md:inline text-gray mx-4`}>
                            {'>'} Home
                        </a> */}
                    </div>
                    <div className='flex-grow'></div>
                    <a className={`${styles.item} md:px-4 md:mx-4`}>
                        Books
                    </a>
                    <a href='https://ganinw.dev' className={`${styles.item} px-4 mx-4`}>
                        About me
                    </a>
                </div>
            </div>
        </>
    )
}

export default Navbar
