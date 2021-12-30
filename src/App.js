import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import Talent from './pages/Talent';
import ManagerRoute from './routes/ManagerRoute';
import TalentRoute from './routes/TalentRoute';
import ListTalents from "./components/ListTalents/ListTalents";
import {DetailTalent} from "./components/DetailTalent/DetailTalent";
import ListPost from "./components/manager/ListPost";
import Profile from "./components/manager/profile";
import Management from "./components/manager/management";

function App() {
    // window.onunload = function() {
    //     localStorage.clear();
    //  }


    var hours = 2;   // Reset when storage is more than 2 hours
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime && now - setupTime > hours*60*60*1000) {
        localStorage.clear();
    }

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
                        component={Profile}
                    />

                    <ManagerRoute
                        path="/manager/listPost"
                        exact
                        component={ListPost}
                    />
                    <ManagerRoute
                        path="/manager/listTalent/:id"
                        exact
                        component={ListTalents}
                    />
                    <ManagerRoute
                        path="/manager/listTalent/detail-talent/:id"
                        exact
                        component={DetailTalent}
                    />

                    <ManagerRoute
                        path="/manager/management"
                        exact
                        component={Management}
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
