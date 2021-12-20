import Image from 'next/image'
import Link from 'next/link'
import { CircularProgress } from '@mui/material';
import styles from '@styles/Searchbar.module.css'

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
import TextField from '@mui/material/TextField';

type SearchBarProps = {
    appStore?: AppStore
    maxDisplay: number
    onSelect : (name : string) => void
}

type FormVal = {
    name: string
}

// @inject('aapStore')
// @observer
const SearchBar: React.FC<SearchBarProps> = ({ appStore, maxDisplay, onSelect }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [books, setBooksData] = useState<Book[]>([]);
    useEffect(() => {
        setIsLoading(true);
        appStore?.SearchBooks(name, (data => {
            setIsLoading(false);
            setBooksData(data);
        }))
    }, [name]);
    return (
        <>
            <div className=''>
                <div>
                    <TextField id="outlined-basic" label="ค้นหาหนังสือ" variant="outlined" className={`w-full h-16 bg-white`}
                        value={name}
                        onChange={(values: any) => {
                            setName(values.target.value);
                        }}
                    />
                </div>
                <div className=' w-full'>
                    {isLoading && <LoadingItem />}
                    {books.length > 0 && <>
                        <div className='font-light mt-3'>
                            ผลการค้นหา :
                        </div>
                    </>}
                    {((): ReactElement[] => {
                        const itemList: ReactElement[] = [];
                        books.slice(0, maxDisplay).forEach((e, k) => [
                            itemList.push(<SearchItem name={e.Name} author={e.Author} img={e.ImageURL} key={k} onSelect={onSelect}/>)
                        ])
                        return itemList;
                    })()}
                </div>
            </div>
        </>
    )
}

export default inject('appStore')(observer(SearchBar))

const LoadingItem: React.FC = () => {
    return (<>
        <div className={`h-16 p-3 bg-white flex relative z-20`}>
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
    name: string
    author: string
    img: string
    onSelect : (name : string) => void
}

const SearchItem: React.FC<SearchItemProps> = ({ name, author, img, onSelect }) => {
    return (<>
        <div className={`${styles.autocompleteList} cursor-pointer flex border-b z-20`} onClick={()=>{onSelect(name)}}>
            <div className={`${styles.imageContainer} flex-none`}>
                <Image src={img}
                    layout='fill'
                    objectFit='contain'
                    className='z-10'
                />
            </div>
            <div className='flex-none h-full clip w-3/5 md:w-full'>
                <div className='mt-2 clip w-full'>
                    <Link href="/">
                        <p className='text-sm md:text-xl px-4 text-black truncate w-full'>{name}</p>
                    </Link>
                </div>
                <div className='mt-3 clip'>
                    <Link href="/">
                        <a className='text-xs md:text-base px-4 text-black font-light'>{author}</a>
                    </Link>
                </div>
            </div>
        </div>

    </>)
}