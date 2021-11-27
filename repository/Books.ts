import { Book, BookResponse } from '@models/Book';
import axios from 'axios';

export interface IBookRepository {
  FetchBooks(name: string): Promise<BookResponse[]>
}
export default class BooksRepository implements IBookRepository {
  public async FetchBooks(name: string): Promise<BookResponse[]> {
    return new Promise((resolve, reject) => {
      axios.get<{data : BookResponse[]}>(`http://127.0.0.1:8008/books/get?name=${name}`, {
        // withCredentials: true,
        // crossorigin: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }).then((res) => {
        const { data } = (res);
        resolve(data.data)
      }).catch(res => {
        reject(res.message)
      })
    })
  }
}
