import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

import './index.css';
import AppWrapper from './AppWrapper.tsx';

const root = document.getElementById('root');

if (root) {
    const reactRoot = createRoot(root);

    reactRoot.render(
        <Provider store={store}>
            <AppWrapper />
        </Provider>,
    );
} else {
    console.error("Element with ID 'root' not found in the document.");
}
