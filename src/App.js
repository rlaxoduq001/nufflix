import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MovieDetail } from './pages/MovieDetail';
import { Movies } from './pages/Movies';
import { Home } from './pages/Home';
import { Navigation } from './component/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search } from './pages/Search';

function App() {
  return (
    <div>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/' element={<Movies />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/movies/:id' element={<MovieDetail />}/>
      </Routes>
    </div>
  );
}

export default App;
