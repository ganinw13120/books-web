import Image from 'next/image'
import Link from 'next/link'
import { CircularProgress } from '@mui/material';
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
        setIsLoading(true);
        // setBooksData([]);
        appStore?.SearchBooks(name, (data=>{
            setIsLoading(false);
            setBooksData(data);
        }))
    }, [name]);
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    // console.log({ values, actions });
                    // alert(JSON.stringify(values, null, 2));
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
                        {isLoading && <LoadingItem />}
                        {((): ReactElement[] => {
                            const itemList: ReactElement[] = [];
                            books.forEach((e, k) => [
                                itemList.push(<SearchItem name={e.Name} author={e.Author} img={e.ImageURL} key={k}/>)
                            ])
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
        <div className={`h-16 p-3 bg-white flex relative`}>
            Loading...
            <CircularProgress
                    size={24}
                    sx={{
                      color: 'inherit',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
        </div>
    </>)
}

type SearchItemProps = {
    name : string
    author : string
    img : string
}

const SearchItem: React.FC<SearchItemProps> = ({name, author, img}) => {
    return (<>
        <div className={`${styles.autocompleteList} bg-white flex`}>
            <div className={`${styles.imageContainer}`}>
                <Image src={img}
                    layout='fill'
                    objectFit='contain'
                />
            </div>
            <div className='inline-block h-full'>
                <div className='mt-2'>
                    <Link href="/">
                        <a className='text-xl px-4 text-black'>{name}</a>
                    </Link>
                </div>
                <div className='mt-3'>
                    <Link href="/">
                        <a className='text-base px-4 text-black font-light'>{author}</a>
                    </Link>
                </div>
            </div>
        </div>

    </>)
}