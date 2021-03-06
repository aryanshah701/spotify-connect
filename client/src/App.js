import 'milligram';
import './App.css';

import { Route, BrowserRouter as Router } from 'react-router-dom';

// Component imports
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home}></Route>
      <Route path="/login" component={Login}></Route>
    </Router>
  );
}

export default App;
