import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root');

if (root) {
    const reactRoot = createRoot(root);

    reactRoot.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
} else {
    console.error("Element with ID 'root' not found in the document.");
}
