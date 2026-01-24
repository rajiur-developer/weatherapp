import React, { useEffect, useState, useRef } from 'react';
import { FaSearchengin, FaArrowDownShortWide, FaArrowDownWideShort, FaRegSun } from "react-icons/fa6";
import { IoMdPartlySunny } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { FaCloudRain } from "react-icons/fa";
import { PiWindLight, PiThermometerColdBold } from "react-icons/pi";
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
                setData(data);
                localStorage.setItem("watherStore", JSON.stringify(data));
            })
            .catch(err => console.log(err));
    };

    const getData = (event) => {
        event.preventDefault();
        if(city) fetchData(city);
        setCity('');
    };

    const cloudIconCheng = () => {
        if (!data || !data.main) return null;
        const temp = data.main.temp;

        if (temp < 10) return <PiThermometerColdBold size={60} color="skyblue" />;
        else if (temp >= 10 && temp < 20) return <FaCloudRain size={60} color="gray" />;
        else if (temp >= 20 && temp < 30) return <IoMdPartlySunny size={60} color="orange" />;
        else return <FaRegSun size={60} color="red" />;
    };

    const cloudTextCheng = () => {
        if (!data || !data.main) return null;
        const temp = data.main.temp;

        if (temp < 10) return <h3 className='fw-bold'>Cold</h3>;
        else if (temp >= 10 && temp < 20) return <h3 className='fw-bold'>Rain</h3>;
        else if (temp >= 20 && temp < 30) return <h3 className='fw-bold'>Sunny</h3>;
        else return <h3 className='fw-bold'>Hot</h3>;
    };

    return (
        <div className='main-body'>
            <div className="stars"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>

            <div className="container main-container">
                <div className="row w-50 mx-auto mt-5 rounded-3">
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
                                                {cloudIconCheng()}
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
                                                        <p> <WiHumidity className='fs-2' size={40}/> Humidity: {data.main.humidity}%</p>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="speed icon">
                                                            <PiWindLight className='fs-2' size={40}/> Wind: {data.wind.speed} m/s
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
    );
};

export default App;
