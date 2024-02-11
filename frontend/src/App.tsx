import './App.css';
import HomePage from './pages/home/HomePage';
import NavigationBar from './components/NavBar/NavigationBar';
import Footbar from './components/Footer/Footbar';
import RegisterPage from './pages/register/RegisterPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './lib/context/UserContext';
import ProfilePage from './pages/profile/ProfilePage';
import MailVerifyPage from './pages/register/MailVerifyPage';
import SettingPage from './pages/profile/setting/SettingPage';
import AccVerifyTempPage from './pages/register/AccVerifyTempPage';
import SuccessVerifyPage from './pages/register/SuccessVerifyPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <NavigationBar />
          <Routes >
            <Route path = "/" element={<HomePage />} />
            <Route path="register" element={<RegisterPage/>} />
            <Route path="profile" >
              <Route index element = {<ProfilePage />} />
              <Route path = "setting" element = {<SettingPage />}></Route>
            </Route>
            <Route path="verify" element={<MailVerifyPage/>} />
            <Route path="verify/success" element={<SuccessVerifyPage/>} />
            <Route path="verify/:id" element={<AccVerifyTempPage/>} />
          </Routes>
          <Footbar />
        </UserProvider>
      </BrowserRouter>
    </>
    
  );
}

export default App;
