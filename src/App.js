import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import AccountPage from './pages/AccountPage';
import ListingFormPage from './pages/ListingFormPage';
import ItemDetailPage from './pages/ItemDetailPage';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/browse/resell" element={<BrowsePage type="resell" />} />
        <Route path="/browse/clubs" element={<BrowsePage type="clubs" />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/listing" element={<ListingFormPage />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
