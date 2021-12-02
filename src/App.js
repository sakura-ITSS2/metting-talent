import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import ManagerHome from './components/ManagerHome';
import SignUp from './components/Signup/Signup';
import Talent from './pages/Talent';
import ManagerRoute from './routes/ManagerRoute';
import TalentRoute from './routes/TalentRoute';
import ListTalents from "./components/ListTalents/ListTalents";
import {DetailTalent} from "./components/DetailTalent/DetailTalent";
import ListPost from "./components/manager/ListPost";

function App() {

    return (
        <div className="App">
            <ToastContainer/>
            <Router>
                <Switch>
                    {/* public routes */}
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={SignUp}/>

                    {/* Manager routes */}
                    <ManagerRoute
                        path="/manager"
                        exact
                        component={ManagerHome}
                    />
                    <ManagerRoute
                        path="/listTalent/:id"
                        exact
                        component={ListTalents}
                    />
                    <ManagerRoute
                        path="/detail-talent/:id"
                        exact
                        component={DetailTalent}
                    />
                    <ManagerRoute
                        path="/manager/post"
                        exact
                        component={ListPost}
                    />

                    {/* Talent routes */}
                    <TalentRoute
                        path="/talent"
                        component={Talent}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
