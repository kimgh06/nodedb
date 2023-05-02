import axios from "axios";
import { useState } from "react";

function App() {
  const [list, setList] = useState([]);
  const [word, serWord] = useState('');
  return (
    <div className="App">
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
          console.log(e.data);
        })
      }}>load</button>
    </div>
  );
}

export default App;
