import { Book } from '@models/Book';
import axios from 'axios';

export interface IBookRepository {
    FetchBooks(name : string) : Promise<Book[]> 
}
export default class BooksRepository implements IBookRepository{
    public async FetchBooks(name : string) : Promise<Book[]> {
        return new Promise((resolve, reject) => {
          axios.get<Book[]>(`http://159.223.66.143:8008/books/get?name=${name}`, {
              headers : {
                'Access-Control-Allow-Origin': '*',
              }
          }).then(res => {
            const { data } = res;
            resolve(data)
          }).catch(res=>{
            reject(res.message)
          })
        })
      }
}
