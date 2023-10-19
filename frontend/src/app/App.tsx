import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/homePage/LazyLoad';
import AboutUs from '../pages/aboutUs/LazyLoad';
import TermsAndConditions from '../pages/termsAndConditions/LazyLoad';
import PrivacyPolicy from '../pages/privacyPolicy/LazyLoad';
import HealthCheck from '../pages/healthCheck/LazyLoad';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/about-us" element={<AboutUs />} />
        <Route path="/home/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/home/privacy-and-policy" element={<PrivacyPolicy />} />
        <Route path="/api/health" element={<HealthCheck />} />
      </Routes>
    </div>
  );
};

export default App;
