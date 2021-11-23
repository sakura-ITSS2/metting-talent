import { useHistory } from 'react-router-dom';
import './Home.scss';
import './3Dtext.scss';
import Header from '../Header/Header';

function Home() {
    let history = useHistory();

    if (localStorage.getItem('role') === 'Talent') {
        history?.push('/talent');
    }

    if (localStorage.getItem('role') === 'Manager') {
        history?.push('/manager');
    }

    return (
        <div className="Home">
            <Header />
            <div className="content">
                <div class="ocean">
                    <div class="wave"></div>
                    <div class="wave"></div>
                </div>
                <h1 data-heading="Top Talent">
                    <span contenteditable data-heading="Top Talent">
                        Top Talent
                    </span>
                </h1>
            </div>
        </div>
    );
}

export default Home;
