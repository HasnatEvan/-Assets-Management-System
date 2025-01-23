import About from "./About";
import Banner from "./Banner";
import Contact from "./Contact";
import Packages from "./Packages";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Packages></Packages>
            <About></About>
            <Contact></Contact>
        </div>
    );
};

export default Home;