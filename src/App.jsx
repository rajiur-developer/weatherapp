import React, { useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';


import { FaSearchengin, FaArrowDownShortWide, FaArrowDownWideShort, FaSunPlantWilt } from "react-icons/fa6";

import { WiHumidity } from "react-icons/wi";
import { GiSun } from "react-icons/gi";
import { FaSnowflake, FaCloudMeatball, FaCloudSun } from "react-icons/fa";
import { PiThermometerColdBold, PiWindLight } from "react-icons/pi";
import './App.css'; // CSS file include

const App = () => {
    const [city, setCity] = useState("");
    const [data, setData] = useState();
    const inputFocus = useRef(null);

    const defaultCity = "Dhaka";

    useEffect(() => {
        inputFocus.current.focus();

        const StoreData = localStorage.getItem('watherStore');
        if (StoreData) {
            setData(JSON.parse(StoreData));
        } else {
            fetchData(defaultCity);
        }
    }, []);

    const fetchData = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=52a4ff027845d5139b9da14fbae80b5f`)
        .then(res => res.json())
        .then(data => {

            // ❌ City not found
            if (data.cod !== 200) {
                toast.error("City not found 😢");
                setData(null);
                return;
            }

            // ✅ Success
            setData(data);
            localStorage.setItem("watherStore", JSON.stringify(data));
        })
        .catch(() => {
            toast.error("Something went wrong");
        });
};


    const getData = (event) => {
        event.preventDefault();
        if (city) fetchData(city);
        setCity('');
    };

    const cloudIconCheng = () => {
        if (!data?.main) return null;

        const temp = data.main.temp;

        if (temp <= 0) return <FaSnowflake size={95} color="#9ccff1" />;
        if (temp <= 10) return <PiThermometerColdBold size={95} color="#49b8e4" />;
        if (temp <= 18) return <FaCloudMeatball size={95} color="#e4eaee" />;
        if (temp <= 25) return <FaCloudSun size={95} color="#fcc11a" />;
        if (temp < 30) return <GiHeraldicSun size={95} color="#fcc11a" />;
        if (temp < 40) return <FaSunPlantWilt size={95} color="#ff9800" />;

        return <GiSun size={95} color="red" />;
    };

    const cloudTextCheng = () => {
        if (!data?.main) return null;

        const temp = data.main.temp;

        if (temp <= 0) return <h3 className="fw-bold">Freezing</h3>;
        if (temp <= 10) return <h3 className="fw-bold">Very Chilly</h3>;
        if (temp <= 18) return <h3 className="fw-bold">Cool</h3>;
        if (temp <= 25) return <h3 className="fw-bold">Mild</h3>;
        if (temp < 30) return <h3 className="fw-bold">Warm</h3>;
        if (temp < 40) return <h3 className="fw-bold">Hot</h3>;

        return <h3 className="fw-bold">Very Hot</h3>;
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

            
            <div className='main-body'>
                <div className="stars"></div>
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>

                <div className="container main-container">
                    <div className="row w-50 col-sm-w-100 mx-auto mt-5 rounded-3">
                        <div className="col-12">
                            <div className="card bg-transparent border-0 ">
                                <div className="card-body ">
                                    <h2 className="text-center text-light text-uppercase fw-bold mt-4">React Weather App</h2>

                                    <div className='input-box d-flex justify-content-center gap-2 mt-4'>
                                        <form onSubmit={getData} className='d-flex justify-content-between w-100'>
                                            <input
                                                type="text"
                                                ref={inputFocus}
                                                className='form-control'
                                                placeholder='Enter city...'
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                            <button type='submit' className='btn btn-primary ms-3 px-3 py-2'><FaSearchengin /></button>
                                        </form>
                                    </div>

                                    {
                                        data && data.main ?
                                            <div>
                                                <div className='fs-1 text-center temparature-info mt-5'>
                                                    <div className='cloud-icon'>
                                                        {cloudIconCheng()}
                                                    </div>
                                                    <div className='text-light mt-2'>
                                                        {cloudTextCheng()}
                                                    </div>
                                                </div>

                                                <div className='tempareture text-center mt-4 text-light'>
                                                    <h2 className='fw-bold'>{Math.round(data.main.temp)}<sup>°</sup>C</h2>
                                                    <div className="city">
                                                        <h3 className='mt-3'>{data.name}</h3>
                                                    </div>
                                                    <div className="tempValue d-flex justify-content-center mt-3">
                                                        <div className="minimam"> <FaArrowDownShortWide /> {Math.round(data.main.temp_min)} || </div>
                                                        <div className="maximam"><FaArrowDownWideShort /> {Math.round(data.main.temp_max)}</div>
                                                    </div>
                                                </div>

                                                <div className='other-info mt-3 text-light text-center'>
                                                    <div className="row">
                                                        <div className="col-lg-6 humidity icon">
                                                            <p> <WiHumidity className='fs-2' size={40} /> Humidity: {data.main.humidity}%</p>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="speed icon">
                                                                <PiWindLight className='fs-2' size={40} /> Wind: {data.wind.speed} m/s
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className='fs-1 text-light text-center mt-4'>No Data Found</div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
