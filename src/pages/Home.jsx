import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Banner from "../assets/banner.mp4";

const Home = () => {

    const {fetchDomains} = useContext(AppContext);
    // console.log(fetchDomains);


    useEffect(() => {
        fetchDomains();
    },[]);

    return(
        <div className="flex flex-col justify-center items-center m-14 p-14">

        <h2 className="text-4xl font-bold" style={{ background: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
>Inhouse Internship Portal</h2>    

            <div className=' mx-3 my-12 '>
                <video muted loop autoPlay className=' shadow-[-0.5px_-0.5px_15px_5px_rgba(83,213,229,0.4)] rounded-md' ><source src={Banner} type="video/mp4"/></video>
            </div>

        </div>
    );
};

export default Home;