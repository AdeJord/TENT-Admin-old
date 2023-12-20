import { Root, Header } from './styles';
import AllBookings from './pages/AllBookings';
import AllVolunteers from './pages/AllVolunteers';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import CreateBooking from './pages/CreateBooking';
import EditVolunteers from './pages/EditVolunteers';
import { BrowserRouter, Route, Link, Navigate, Outlet, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Root>
        <Header>
          <Link style={{ 
            textDecoration: 'none', 
            fontSize: '5vw',
            color: '#EAF3E7',
             }} to="/">
          Tent Admin Page
          </Link>
        </Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allbookings" element={<AllBookings />} />
          <Route path="/allvolunteers" element={<AllVolunteers />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path='/createbooking' element={<CreateBooking />} />
          <Route path='/editvolunteers' element={<EditVolunteers />} />
        </Routes>
        </Root>
    </BrowserRouter>
  );
}

export default App;
