import './App.css';
import HomePage from './pages/home/HomePage';
import NavigationBar from './components/NavBar/NavigationBar';
import Footbar from './components/Footer/Footbar';

function App() {
  return (
    <>
      <NavigationBar />
      <HomePage />
      <Footbar />
    </>
    
  );
}

export default App;
