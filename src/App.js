import './css/App.css';
import { Route, Routes } from 'react-router-dom';
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

// lisada 3-4s keel
// tõlkida failid
// võib eesti keelsele projektile Bootstrapi/tõlget panna

function App() {
  return (
    <div className="App">

      <NavigationBar/>

      <Routes>
        <Route path='' element = { <HomePage/> } />
        <Route path='cart' element = { <Cart/> } />
        <Route path='contact' element = { <ContactUs/> } />
        <Route path='shops' element = { <Shops/> } />
        <Route path='product/:id' element = { <SingleProduct/> } />
        <Route path='admin/add' element = { <AddProduct/> } />
        <Route path='admin' element = { <AdminHome/> } />
        <Route path='admin/edit/:id' element = { <EditProduct/> } />
        <Route path='admin/categories' element = { <MaintainCategories/> } />
        <Route path='admin/products' element = { <MaintainProducts/> } />
        <Route path='admin/shops' element = { <MaintainShops/> } />
        <Route path='login' element = { <Login/> } />
        <Route path='signup' element = { <Signup/> } />
      </Routes>
      
    </div>
  );
}

export default App;
