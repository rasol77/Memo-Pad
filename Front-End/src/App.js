import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';

import { Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/signup" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
