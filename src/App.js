
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { BrowserRouter as Router, Routes,Route,Link } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import MpesaPayment from './components/MpesaPayment';

import Footer from './components/Footer';

import Bookbus from './components/Bookbus';
import Busreservation from './components/Busreservation';
import SeatSelector from './components/SeatSelector';


function App() {
  return (
    <div className='image-backround'>
      <Router >
      <div className="App">
        <div className='title'>
          <h2></h2>
          </div>
      {/* routing the components */}
      <div  className='nav-link'> 

        {/* collapse the navbar */}

            
       {/* <nav>
          <Link to='/signup' className='btn btn-outline-dark ms-2'>Signup</Link>
          <Link to='/signin' className='btn btn-outline-dark ms-2'>Signin</Link>
         <Link to='/busreservation' className='btn btn-outline-dark ms-2'>Bus reservation</Link>
          <Link to='/' className='btn btn-outline-dark ms-2'>Book bus</Link>
       </nav> */}
      </div>
       
       {/* <Navbar/>  */}
      {/* carousel */}

     
     
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/busreservation' element={<Busreservation/>}/>
        <Route path='/' element={<Bookbus/>}/>
        <Route path="/select-seats" element={<SeatSelector />} />
        <Route path='/makepayment' element={<MpesaPayment/>}/>
      </Routes>
    </div>

    {/* footer */}
    <Footer/>
    </Router>
    </div>
  );
}

export default App;
