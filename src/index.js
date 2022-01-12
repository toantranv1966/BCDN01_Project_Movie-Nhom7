import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//config redux
import {Provider} from 'react-redux';
import {store} from './redux/configStore';

//Cấu hình antd
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

// Import đa ngôn ngữ
import './i18n';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
