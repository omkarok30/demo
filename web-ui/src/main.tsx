import ReactDOM from 'react-dom/client';
// import { BrowserRouter /* , HashRouter */ } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

import 'virtual:uno.css';

// Register icon sprite
import 'virtual:svg-icons-register';
// global css
import '@/assets/css/index.less';
// App
import App from '@/App';

// mount
ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
