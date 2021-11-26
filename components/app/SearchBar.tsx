import Image from 'next/image'
import Link from 'next/link'
import styles from '@styles/SearchBar.module.css'

import {
    Formik,
    Form,
    Field,
    useFormik,
} from 'formik';
import { ReactElement, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { AppStore } from '@store/AppStore';
import { Book } from '@models/Book';

type SearchBarProps = {
    appStore ?: AppStore
}

type FormVal = {
    name: string
}

// @inject('aapStore')
// @observer
const SearchBar: React.FC<SearchBarProps> = ({ appStore }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [books, setBooksData] = useState<Book[]>([]);
    const initialValues: FormVal = { name: '' };
    useEffect(()=>{
        appStore?.SearchBooks(name, (data=>{
            setBooksData(data);
        }))
    }, [name]);
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >
                <Form>
                    <div className='text-left'>
                        <label htmlFor="name">Search books...</label>
                    </div>
                    <div>
                        <Field
                            className='border-b-2 border-light-gray   h-16 focus:bg-white w-full text-xl mt-3 px-4'
                            id="name"
                            name="name"
                            placeholder="Search..."
                            value={name}
                            onChange={(values: any) => {
                                setName(values.target.value);
                            }}
                        />
                    </div>
                    <div className='absolute w-full'>
                        <LoadingItem />
                        {((): ReactElement[] => {
                            let i = 0;
                            const itemList: ReactElement[] = [];
                            while (i < name.length) {
                                itemList.push(<SearchItem key={i} />);
                                i++;
                            }
                            return itemList;
                        })()}
                        {/* <SearchItem /> */}
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default inject('appStore')(observer(SearchBar))

const LoadingItem: React.FC = () => {
    return (<>
        <div className={`h-16 p-3 bg-white flex`}>
            Loading...
        </div>
    </>)
}

const SearchItem: React.FC = () => {
    return (<>
        <div className={`${styles.autocompleteList} bg-white flex`}>
            <div className={`${styles.imageContainer}`}>
                <Image src='https://storage.naiin.com/system/application/bookstore/resource/product/201907/482105/1000220914_front_XXL.jpg?imgname=INTO-THE-MAGIC-SHOP-%E0%B9%80%E0%B8%A3%E0%B8%B2%E0%B8%97%E0%B8%B8%E0%B8%81%E0%B8%84%E0%B8%99%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%99%E0%B8%A1%E0%B8%B5%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%80%E0%B8%A7%E0%B8%97%E0%B8%A1%E0%B8%99%E0%B8%95%E0%B8%A3%E0%B9%8C%E0%B8%AD%E0%B8%A2%E0%B8%B9%E0%B9%88%E0%B9%83%E0%B8%99%E0%B9%83%E0%B8%88'
                    layout='fill'
                    objectFit='contain'
                />
            </div>
            <div className='inline-block h-full'>
                <div className='mt-2'>
                    <Link href="/">
                        <a className='text-xl px-4 text-black'>Atomic habits</a>
                    </Link>
                </div>
                <div className='mt-3'>
                    <Link href="/">
                        <a className='text-base px-4 text-black font-light'>James Clear</a>
                    </Link>
                </div>
            </div>
        </div>

    </>)
}