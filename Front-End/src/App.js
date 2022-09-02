import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import NoteTitle from './components/NoteTitle/NoteTitle';
import Login from './components/Login/Login';
import NoteNew from './components/NoteNew/NoteNew';

import { Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<NoteTitle />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/note" element={<NoteNew />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
