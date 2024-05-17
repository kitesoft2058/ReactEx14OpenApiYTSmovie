import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom'
import PageRouter from './PageRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  // <Main></Main>

  //(실습6)에서 추가. 페이지 전환을 위한 Route들을 등록한 Router.js 컴포넌트를 최상위 요소로 그리기
  <PageRouter></PageRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
