import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MovieDetail } from './pages/MovieDetail';
import { Movies } from './pages/Movies';
import { Home } from './pages/Home';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/movies' element={<Movies />}/>
        <Route path='/movies/:id' element={<MovieDetail />}/>
      </Routes>
    </div>
  );
}

export default App;
