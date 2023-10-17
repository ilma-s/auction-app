import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppWrapper from './AppWrapper.tsx';

const root = document.getElementById('root');

if (root) {
    const reactRoot = createRoot(root);

    reactRoot.render(
        <React.StrictMode>
            <AppWrapper />
        </React.StrictMode>,
    );
} else {
    console.error("Element with ID 'root' not found in the document.");
}
