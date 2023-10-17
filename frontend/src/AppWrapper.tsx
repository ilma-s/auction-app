import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import Header from './components/Header/Header.tsx';
import Footer from './components/footer/Footer.tsx';

const AppWrapper = () => {
    return (
        <BrowserRouter>
            <div className="flex flex-col h-screen">
                <Header />
                <main className="flex-grow">
                    <App />
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default AppWrapper;
