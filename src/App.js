import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useParams } from "react-router-dom";
import Showdown from "showdown";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/:id'} element={<Detail />} />
          <Route path="/" element={<Load />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
// eslint-disable-next-line
function Detail() {
  const converter = new Showdown.Converter();
  const { id } = useParams();
  const [list, setList] = useState([]);
  const loading = async e => {
    await axios.post('http://localhost:3333/find', { id: id }).then(e => {
      setList(e.data[0]);
    }).catch(e => {
      if (e.response.status === 404) {
        setList({ id: 'NOT FOUND', title: '', maintext: '' });
      }
    });
  }
  useEffect(e => {
    loading();
    //eslint-disable-next-line
  }, []);
  return <div className="detail">
    <h1>{list?.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(list?.maintext) }}></div>
  </div>;
}
// eslint-disable-next-line
function Load() {
  const [list, setList] = useState([]);
  const [word, serWord] = useState('');
  const [postlist, setPostist] = useState({ id: '', title: '', maintext: '' });
  const [toupdate, setToupdate] = useState({ id: '', title: '', maintext: '' });
  const [todel, setTodel] = useState('');
  useEffect(e => {
    setPostist({ id: '', title: '', maintext: '' });
    setToupdate({ id: '', title: '', maintext: '' });
  }, []);

  const escapeText = text => {
    let returntext;
    returntext = text.replace(/'/g, "\\'");
    returntext = returntext.replace(/"/g, '\\"');
    console.log(returntext);
    return returntext;
  }

  return (
    <div className="load">
      <table border='1'>
        <tbody>
          <tr>
            <td>id</td>
            <td>title</td>
          </tr>
          {list && list.map((i, n) => <tr key={n}>
            <td><Link to={`/${i.id}`}>{i.id}</Link></td>
            <td>{i.title}</td>
          </tr>)}
        </tbody>
      </table>
      <div>
        <button onClick={async function (e) {
          await axios.post('http://localhost:3333/loadall', { id: word }).then(e => {
            console.log(e.data);
            setList(e.data);
          })
        }}>LoadAll</button>
      </div>
      <input value={word} onChange={e => serWord(v => e.target.value)} />
      <button onClick={async function (e) {
        await axios.post('http://localhost:3333/find', { id: word }).then(e => {
          setList(e.data);
        })
      }}>load</button>
      <div>
        <input onChange={e => setPostist(a => ({ ...a, id: e.target.value }))} value={postlist.id} placeholder="id" type={'number'} />
        <input onChange={e => setPostist(a => ({ ...a, title: e.target.value }))} value={postlist.title} placeholder="title" type={'text'} />
        <br />
        <textarea onChange={e => setPostist(a => ({ ...a, maintext: e.target.value }))} value={postlist.maintext} placeholder="maintext" type={'text'} />
        <button onClick={async e => {
          await axios.post('http://localhost:3333/insert', {
            id: postlist.id, name: postlist.title, maintext: escapeText(postlist.maintext)
          }).then(e => {
            console.log(e);
          }).catch(e => {
            console.log(e);
          });
        }}>삽입</button>
      </div>
      <div>
        <input onChange={e => setTodel(a => e.target.value)} value={todel} />
        <button onClick={async e => {
          await axios.post('http://localhost:3333/delete', { id: todel })
            .then(e => {
              console.log(e);
            }).catch(e => {
              console.log(e);
            });
        }}>삭제</button>
      </div>
      <div>
        <input onChange={e => setToupdate(a => ({ ...a, bookid: e.target.value }))} value={toupdate.bookid} placeholder="id" type={'number'} />
        <input onChange={e => setToupdate(a => ({ ...a, bookname: e.target.value }))} value={toupdate.bookname} placeholder="bookname" type={'text'} />
        <input onChange={e => setToupdate(a => ({ ...a, publisher: e.target.value }))} value={toupdate.publisher} placeholder="publisher" type={'text'} />
        <input onChange={e => setToupdate(a => ({ ...a, price: e.target.value }))} value={toupdate.price} placeholder="price" type={'number'} />
        <button onClick={async e => {
          await axios.post('http://localhost:3333/update', {
            id: toupdate.bookid, name: toupdate.bookname, publisher: toupdate.publisher, price: toupdate.price
          }).then(e => {
            console.log(e);
          }).catch(e => {
            console.log(e);
          });
        }}>수정</button>
      </div>
    </div>
  );
}

export default App;
