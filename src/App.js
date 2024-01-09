import './css/App.css';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/global/HomePage';
import Cart from './pages/global/Cart';
import ContactUs from './pages/global/ContactUs';
import Shops from './pages/global/Shops';
import SingleProduct from './pages/global/SingleProduct';
import AddProduct from './pages/admin/AddProduct';
import AdminHome from './pages/admin/AdminHome';
import EditProduct from './pages/admin/EditProduct';
import MaintainCategories from './pages/admin/MaintainCategories';
import MaintainProducts from './pages/admin/MaintainProducts';
import MaintainShops from './pages/admin/MaintainShops';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import NavigationBar from './components/NavigationBar';
import { useContext } from 'react';
import { AuthContext } from './store/AuthContext';
import NotFound from './pages/global/NotFound';
import Profile from './pages/auth/Profile';
import Loader from './components/Loader';
import InfoModal from './components/InfoModal';

function App() {

  const { isLogoutModal, isLoggedIn, loggedInUser } = useContext(AuthContext);
  const [hasWaited, setHasWaited] = useState(false);
  const isLoading = (loggedInUser === null && sessionStorage.getItem("token")) || hasWaited === false;

  useEffect(() => {
    setTimeout(() => { // kui tahta loaderit veidike näidata
      setHasWaited(true);
    }, 1600);
  }, []);
  

  return (
    <div className="App">

      { isLoading ? <Loader loaderWidth="90vw" loaderHeight="300px"/> : 
      <>

        { isLogoutModal && <InfoModal />}

        <NavigationBar/>
        <Routes>
          <Route path='' element = { <HomePage/> } />
          <Route path='cart' element = { <Cart/> } />
          <Route path='contact' element = { <ContactUs/> } />
          <Route path='shops' element = { <Shops/> } />
          <Route path='product/:id' element = { <SingleProduct/> } />
          {
          isLoggedIn ? 
          <>
            <Route path='admin/add' element = { <AddProduct/> } />
            <Route path='admin' element = { <AdminHome/> } />
            <Route path='admin/edit/:id' element = { <EditProduct/> } />
            <Route path='admin/categories' element = { <MaintainCategories/> } />
            <Route path='admin/products' element = { <MaintainProducts/> } />
            <Route path='admin/shops' element = { <MaintainShops/> } />
            <Route path='admin/profile' element = { <Profile/> } />
          </> : 
          <Route path="admin/*" element={<Navigate to="/login"/>} />
          }
          <Route path='login' element = { <Login/> } />
          <Route path='signup' element = { <Signup/> } />
          <Route path='*' element = { <NotFound/> } />
        </Routes>
        <br />
        {process.env.REACT_APP_ENVIRONMENT} 
      </>
      }
    </div>
  );
}

export default App;
