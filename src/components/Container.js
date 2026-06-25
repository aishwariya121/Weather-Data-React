import React, { useEffect, useState } from 'react'
import WeatherData from './WeatherData'



export default function Container({ City, setCity }) {

    let ShowCity = "";

    const [Temp, setTemp] = useState({});
    const [State, setState] = useState("Gujarat");
    const [updateTime, setupdateTime] = useState();
    const [currTime, setcurrTime] = useState();

    async function CityTemp() {

        let result = {};

        let cities = ['Navsari', 'Surat', 'Baroda', 'Ahmedabad', 'Mumbai', 'Bangalore'];

        for (let city of cities) {
            let URL = `https://api.weatherapi.com/v1/current.json?key=4e3b32f57e7347a18aa54207262306&q=${city}`;

            let response = await fetch(URL);
            let data = await response.json();

            result[city] = data.current.temp_c;
            setupdateTime(data.current.last_updated)
            setcurrTime((data.location.localtime).slice(11, 16))
        }

        setTemp(result);


    }

    function UpdateCity(e) {

        setCity(e.currentTarget.id);
        ShowCity = e.currentTarget.id;
        if (ShowCity === "Navsari" || ShowCity === "Surat" || ShowCity === "Baroda" || ShowCity === "Ahmedabad") {
            setState("Gujarat")
        }
        else if (ShowCity === "Mumbai") {
            setState("Maharashtra");
        }
        else {
            setState("Karnataka");
        }

    }

    useEffect(() => {
        CityTemp();
    }, []);

    return (
        <>
            <div>
                <div className="card text-bg-dark">
                    <img src={`${process.env.PUBLIC_URL}/bg-Cloud.webp`} className="card-img" alt="" style={{ height: '400px', objectFit: 'cover' }} />
                    <div className="card-img-overlay">
                        <button type="button" id="Navsari" onClick={UpdateCity} className="my-2 btn  opacity-75 text-white mx-2" style={{backgroundColor:'#2D2C54'}} data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                            Navsari<span className="badge">{Temp.Navsari} °C</span>
                        </button>

                        <button type="button" id="Surat" onClick={UpdateCity} className="my-2 btn opacity-75 text-white mx-2" style={{backgroundColor:'#2D2C54'}} data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                            Surat <span className="badge">{Temp.Surat} °C</span>
                        </button>

                        <button type="button" id="Ahmedabad" onClick={UpdateCity}  style={{backgroundColor:'#2D2C54'}}className="my-2 btn opacity-75 text-white mx-2" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                            Ahmedabad <span className="badge">{Temp.Ahmedabad} °C</span>
                        </button>

                        <button type="button" id="Baroda" onClick={UpdateCity} style={{backgroundColor:'#2D2C54'}} className="my-2 btn opacity-75 text-white mx-2" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                            Baroda <span className="badge">{Temp.Baroda} °C</span>
                        </button>

                        <button type="button" id="Mumbai" onClick={UpdateCity} style={{backgroundColor:'#2D2C54'}} className="my-2 btn opacity-75 text-white mx-2" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                            Mumbai <span className="badge">{Temp.Mumbai} °C</span>
                        </button>

                        <button type="button" id="Bangalore" onClick={UpdateCity} style={{backgroundColor:'#2D2C54'}} className="my-2 btn opacity-75 text-white mx-2" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                            Bangalore <span className="badge">{Temp.Bangalore} °C</span>
                        </button>

                        <div className='my-2' style={{ minHeight: 'fit-content' }}>
                            <h5 style={{ fontFamily: 'sans-serif' }}>{State} . India
                            </h5>
                            <h8 style={{ fontFamily: 'sans-serif' }}>
                                Weather Now in  {City}
                            </h8>
                            <div className="mt-2 badge opacity-75" style={{ width: 'fit-content' }}>
                                Now
                            </div>
                            <h7 className=" badge opacity-75 card-subtitle mb-2"> {currTime}</h7>
                        </div>
                        <div className="container"><WeatherData City={City} />
                            
                            <p className="card-text"><small>{updateTime ? `Last updated on ${updateTime}` : ""} </small></p></div>

                    </div>
                </div>
            </div>
        </>
    )

}