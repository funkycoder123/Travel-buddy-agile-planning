import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './style.css';
import './tailwind.css';



const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
