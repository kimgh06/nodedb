import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import cat from './download.jpg';

function App() {
  return (
    <div className="App">
      <Load />
      {/* <BrowserRouter>
        <Routes>
          <Route path={'/:id'} element={<Detail />} />
          <Route path="/" element={<A />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}
// eslint-disable-next-line
function A() {
  const [pr, setPr] = useSearchParams();
  const [text, setText] = useState('');
  return <div className="A">
    {pr.get('id') && pr.get('id').toString()}
    <input onChange={e => setText(e.target.value)} />
    <button onClick={e => setPr(`?id=${text}`)}>click</button>
    <img src={cat} alt='cat' />
  </div>;
}
// eslint-disable-next-line
function Detail() {
  const { id } = useParams();
  return <div className="detail">
    {id}
  </div>;
}
// eslint-disable-next-line
function Load() {
  const [list, setList] = useState([]);
  const [word, serWord] = useState('');
  const [postlist, setPostist] = useState({ bookid: '', bookname: '', publisher: '', price: '' });
  useEffect(e => {
    setPostist({ bookid: '', bookname: '', publisher: '', price: '' });
  }, []);
  return (
    <div className="load">
      {/* {list && list.map((i, n) => <div key={n}>
        {i.bookid} {i.bookname} {i.publisher} {i.price}
      </div>)} */}
      {list && list.map((i, n) => <div key={n}>
        {i.bookid} {i.bookname} {i.publisher} {i.price}
      </div>)}
      <input value={word} onChange={e => serWord(v => e.target.value)} />
      <button onClick={async function (e) {
        await axios.post('http://localhost:3333/find', { id: word }).then(e => {
          setList(e.data);
          // console.log(e.data);
        })
      }}>load</button>
      <div>
        <input onChange={e => setPostist(a => ({ ...a, bookid: e.target.value }))} value={postlist.bookid} placeholder="id" />
        <input onChange={e => setPostist(a => ({ ...a, bookname: e.target.value }))} value={postlist.bookname} placeholder="bookname" />
        <input onChange={e => setPostist(a => ({ ...a, publisher: e.target.value }))} value={postlist.publisher} placeholder="publisher" />
        <input onChange={e => setPostist(a => ({ ...a, price: e.target.value }))} value={postlist.price} placeholder="price" />
        <button onClick={async e => {
          await axios.post('http://localhost:3333/insert', {
            id: postlist.bookid, name: postlist.bookname, publisher: postlist.publisher, price: postlist.price
          }).then(e => {
            console.log(e);
          }).catch(e => {
            console.log(e);
          });
        }}>삽입</button>
      </div>
    </div>
  );
}

export default App;
