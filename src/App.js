import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import ManagerHome from './components/ManagerHome';
import SignUp from './components/Signup/Signup';
import Talent from './pages/Talent';
import ManagerRoute from './routes/ManagerRoute';
import TalentRoute from './routes/TalentRoute';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    {/* public routes */}
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/signup" component={SignUp}></Route>

                    {/* Manager routes */}
                    <ManagerRoute
                        path="/manager"
                        exact
                        component={ManagerHome}
                    ></ManagerRoute>

                    {/* Talent routes */}
                    <TalentRoute
                        path="/talent"
                        component={Talent}
                    ></TalentRoute>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
