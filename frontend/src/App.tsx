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
import SuccessVerifyPage from './pages/register/SuccessVerifyPage';
import SettingSidebar from './components/Setting/SettingSidebar';
import SettingLayout from './pages/profile/setting/SettingLayout';
import AccountPage from './pages/profile/setting/setting-page/AccountPage';
import ProfileSettingPage from './pages/profile/setting/setting-page/ProfileSettingPage';
import PasswordChangePage from './pages/profile/setting/setting-page/PasswordChangePage';
import NotFoundPage from './pages/etc/NotFoundPage';

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
              <Route path = "setting">
                <Route element = {<SettingLayout />}>
                  <Route path = "profile" element = {<ProfileSettingPage />} />
                  <Route path = "account" element = {<AccountPage />} />
                  <Route path = "password" element = {<PasswordChangePage />} />
                  <Route path = "delete" element = {<></>} />
                </Route>
                

                
                
              </Route>
            </Route>
            <Route path="verify" element={<MailVerifyPage/>} />
            <Route path="verify/success" element={<SuccessVerifyPage/>} />
            <Route path="verify/:id" element={<AccVerifyTempPage/>} />

            
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
          <Footbar />
        </UserProvider>
      </BrowserRouter>
    </>
    
  );
}

export default App;
