import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ManagerHome from './components/ManagerHome';
import TalentHome from "./components/TalentHome";
import ManagerRoute from "./routes/ManagerRoute";
import TalentRoute from "./routes/TalentRoute";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* public routes */}
          <Route path="/" exact component = {Home}></Route>
          <Route path="/login" component = {Login}></Route>
          <Route path="/signup" component = {Signup}></Route>

          {/* Manager routes */}
          <ManagerRoute path="/manager" exact component = {ManagerHome}></ManagerRoute>

          {/* Talent routes */}
          <TalentRoute path="/talent" exact component = {TalentHome}></TalentRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
