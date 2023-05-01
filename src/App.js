import axios from "axios";
import { useState } from "react";

function App() {
  const [list, setList] = useState([]);
  return (
    <div className="App">
      {list && list.map((i, n) => <div>
        {i.bookid} {i.bookname} {i.publisher} {i.price}
      </div>)}
      <button onClick={e => {
        axios.get('http://localhost:3333/select').then(e => {
          setList(e.data);
        })
      }}>load</button>
    </div>
  );
}

export default App;
