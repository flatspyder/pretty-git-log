import './theme.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
document.documentElement.setAttribute('data-theme', defaultTheme);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App defaultTheme={defaultTheme} />
  </React.StrictMode>
);
