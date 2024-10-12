import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import TablesPage from './pages/TablesPage';
import ProductsPage from './pages/ProductsPage';
import InvoicesPage from './pages/InvoicesPage';
import AccountsPage from './pages/AccountsPage';
import Header from './components/common/Header';
import AuthPage from './pages/AuthPage'; // Import AuthPage
import { ToastContainer } from 'react-toastify';
import RevenuePage from './pages/RevenuePage'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
      <Routes>
        <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                {/* Add AuthPage route */}
                <Route path="/tables" element={<TablesPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/invoices" element={<InvoicesPage />} />
                <Route path="/accounts" element={<AccountsPage />} />
                <Route path="/revenue" element={<RevenuePage />}/>
              </Routes>
          </AdminLayout>
        }/>
      </Routes>

    </Router>
    
  );
}

export default App;
