import About from "./About";
import Banner from "./Banner";
import Contact from "./Contact";
import Packages from "./Packages";
import { Helmet} from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Manage Mate || Home</title>
            </Helmet>
            <Banner></Banner>
            <Packages></Packages>
            <About></About>
            <Contact></Contact>
        </div>
    );
};

export default Home;