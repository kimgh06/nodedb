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
    await axios.post('http://localhost:3333/find', { id: id })
      .then(e => {
        let datas = e.data[0];
        for (let i in datas) {
          if (datas.date !== null) {
            datas.date = datas.date.slice(0, 10);
          }
        }
        setList(datas);
      }).catch(e => {
        // if (e.response.status === 404) {
        setList({ id: 'NOT FOUND', title: 'NOT FOUND', maintext: '# NOT FOUND' });
        // }
      });
  }
  useEffect(e => {
    loading();
    //eslint-disable-next-line
  }, []);
  return <div className="detail">
    <h1>{list?.title} {list?.date}</h1>
    <button onClick={async e => {
      if (window.confirm("삭제할 건가?")) {
        await axios.post('http://localhost:3333/delete', { id: list?.id })
          .then(e => {
            console.log(e);
          }).catch(e => {
            console.log(e);
          });
        window.location.href = '/';
      }
    }}>게시물 삭제하기</button>
    <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(list?.maintext) }}></div>
  </div>;
}

// eslint-disable-next-line
function Load() {
  const [list, setList] = useState([]);
  const [word, serWord] = useState('');
  const [postlist, setPostist] = useState({ id: '', title: '', maintext: '' });
  const [toupdate, setToupdate] = useState({ id: '', title: '', maintext: '' });

  const initsetting = async e => {
    await axios.post('http://localhost:3333/loadall', { id: word }).then(e => {
      let datas = e.data;
      for (let i in datas) {
        if (datas[i].date !== null) {
          datas[i].date = datas[i].date.slice(0, 10);
        }
      }
      setList(datas);
    });
    await axios.post('http://localhost:3333/selectmax').then(e => {
      setPostist(a => ({ ...a, id: e.data[0].id }))
    });
  }

  useEffect(e => {
    setPostist({ id: '', title: '', maintext: '' });
    setToupdate({ id: ``, title: '', maintext: '' });
    setInterval(() => {
      initsetting();
    }, 500);
    //eslint-disable-next-line
  }, []);

  const escapeText = text => {
    let returntext;
    returntext = text.replace(/'/g, "\\'");
    returntext = returntext.replace(/"/g, '\\"');
    returntext = returntext.replace(/`/g, '\\`');
    return returntext;
  }

  return (
    <div className="load">
      <table border='1'>
        <tbody>
          <tr>
            <td>id</td>
            <td>title</td>
            <td>date</td>
          </tr>
          {list && list.map((i, n) => <tr key={n}>
            <td><Link to={`/${i.id}`}>{i.id}</Link></td>
            <td>{i.title}</td>
            <td>{i?.date}</td>
          </tr>)}
        </tbody>
      </table>
      <input value={word} onChange={e => serWord(v => e.target.value)} />
      <button onClick={async function (e) {
        await axios.post('http://localhost:3333/find', { id: word }).then(e => {
          setList(e.data);
        })
      }}>load</button>
      <div>
        <input onChange={e => setPostist(a => ({ ...a, id: e.target.value }))} value={postlist.id} placeholder="id" type={'number'} readOnly={true} />
        <input onChange={e => setPostist(a => ({ ...a, title: e.target.value }))} value={postlist.title} placeholder="title" type={'text'} />
        <br />
        <textarea onChange={e => setPostist(a => ({ ...a, maintext: e.target.value }))} value={postlist.maintext} placeholder="maintext" type={'text'} />
        <button onClick={async e => {
          await axios.post('http://localhost:3333/insert', {
            id: postlist.id, name: postlist.title, maintext: escapeText(postlist.maintext), date: new Date().toLocaleDateString().replace(/. /g, '-')
          }).then(e => {
            if (e.status === 201) {
              console.log('성공적으로 생성했습니다!');
            }
          }).catch(e => {
            console.log(e);
          });
        }}>삽입</button>
      </div>
      <div>
        <input onChange={e => setToupdate(a => ({ ...a, id: e.target.value }))} value={toupdate.id} placeholder="id" type={'number'} />
        <button onClick={async function (e) {
          await axios.post('http://localhost:3333/find', { id: toupdate.id }).then(e => {
            setToupdate(a => ({ ...a, title: e.data[0]?.title, maintext: e.data[0]?.maintext }));
          })
        }}>수정목록 가져오기</button>
        <br />
        <input onChange={e => setToupdate(a => ({ ...a, title: e.target.value }))} value={toupdate.title} placeholder="title" type={'text'} /><br />
        <textarea onChange={e => setToupdate(a => ({ ...a, maintext: e.target.value }))} value={toupdate.maintext} placeholder="maintext" type={'text'} />
        <button onClick={async e => {
          await axios.post('http://localhost:3333/update', {
            id: toupdate.id, name: toupdate.title, maintext: escapeText(toupdate.maintext)
          }).then(e => {
            console.log(e.status);
          }).catch(e => {
            console.log(e);
          });
        }}>수정</button>
      </div>
    </div>
  );
}

export default App;
