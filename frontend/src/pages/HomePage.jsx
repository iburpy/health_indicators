import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Header from '../components/Header';
import Functions from '../components/Functions';
import Members from '../components/Members';
import Footer from '../components/Footer';

function HomePage() {

    useEffect(() => { document.title = "MetaSalud - Home" }, []);
    return (
        <>
            <Navbar />
            <Header/>
                <Functions/>
                <Members/>
                <Contact />
            <Footer />
        </>
    );
}

export default HomePage;