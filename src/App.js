import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Route, Routes, useParams, useSearchParams } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Load /> */}
      <BrowserRouter>
        <Routes>
          {/* <Route path={'/:id'} element={<Detail />} /> */}
          <Route path="/" element={<A />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function A() { // eslint-disable-next-line
  const [pr, setPr] = useSearchParams();
  return <div className="A">
    {pr.get('id').toString()}
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
    </div>
  );
}

export default App;
