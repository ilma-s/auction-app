import { Route, Routes } from 'react-router-dom';
import { LazyLoadedComponents } from './LazyLoadedComponents';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<LazyLoadedComponents.HomePage />} />
        <Route path="/api/health" element={<LazyLoadedComponents.HealthCheck />} />
        <Route path="/home/about-us" element={<LazyLoadedComponents.AboutUs />} />
        <Route path="/home/terms-and-conditions" element={<LazyLoadedComponents.TermsAndConditions />} />
        <Route path="/home/privacy-and-policy" element={<LazyLoadedComponents.PrivacyPolicy />} />
      </Routes>
    </div>
  );
};

export default App;
