import { BrowserRouter } from 'react-router-dom';
import App from './app/App.tsx';
import Header from './components/Header/Header.tsx';
import Footer from './components/footer/Footer.tsx';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const AppWrapper = () => {
    return (
        <BrowserRouter>
            <div className="flex flex-col h-screen">
                <Header />
                <main className="flex-grow">
                    <ScrollToTop />
                    <App />
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default AppWrapper;
