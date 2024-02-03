import './App.css';
import HomePage from './pages/home/HomePage';
import NavigationBar from './components/NavBar/NavigationBar';
import Footbar from './components/Footer/Footbar';
import RegisterPage from './pages/register/RegisterPage';

function App() {
  return (
    <>
      <NavigationBar />
      {/* <HomePage /> */}
      <RegisterPage/>
      <Footbar />
    </>
    
  );
}

export default App;
