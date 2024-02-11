import './App.css';
import HomePage from './pages/home/HomePage';
import NavigationBar from './components/NavBar/NavigationBar';
import Footbar from './components/Footer/Footbar';
import RegisterPage from './pages/register/RegisterPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './lib/context/UserContext';
import ProfilePage from './pages/profile/ProfilePage';
import MailVerifyPage from './pages/register/MailVerifyPage';
import AccVerifyTempPage from './pages/register/AccVerifyTempPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/profile" element = {<ProfilePage/>} />
            <Route path="/verify" element={<MailVerifyPage/>} />
            <Route path="/verify/:id" element={<AccVerifyTempPage/>} />
          </Routes>
          <Footbar />
        </UserProvider>
      </BrowserRouter>
    </>
    
  );
}

export default App;
