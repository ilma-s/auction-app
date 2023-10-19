import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/homePage/lazyLoad/HomePage';
import AboutUs from '../pages/aboutUs/lazyLoad/AboutUs';
import TermsAndConditions from '../pages/termsAndConditions/lazyLoad/TermsAndConditions';
import PrivacyPolicy from '../pages/privacyPolicy/lazyLoad/PrivacyPolicy';
import HealthCheck from '../pages/healthCheck/lazyLoad/HealthCheck';


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
