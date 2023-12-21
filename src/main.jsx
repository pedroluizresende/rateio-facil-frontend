import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Provider from './context/Provider';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>,
);
