import React, { useState, useEffect } from 'react'



export default function WeatherData(props) {

    const [WeatherData, setWeatherData] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const [openHour, setOpenHour] = useState(null);

    useEffect(() => {
        if (WeatherData?.forecast?.forecastday?.[0]?.hour) {

            const currentHour = new Date().getHours();

            const nextHour =
                WeatherData.forecast.forecastday[0].hour.find((hour) => {
                    const forecastHour = parseInt(
                        hour.time.split(" ")[1].split(":")[0]
                    );

                    return forecastHour > currentHour;
                }
            );
   
 console.log("next hour data : ", nextHour)
        }
        
    }, [WeatherData]);

    let GetData = async () => {

        //let URL = `https://api.weatherapi.com/v1/current.json?key=4e3b32f57e7347a18aa54207262306&q=${City}`;
        let URL = `https://api.weatherapi.com/v1/forecast.json?key=4e3b32f57e7347a18aa54207262306&q=${props.City}&days=1`;
        let Data = await fetch(URL);
        let ParsedData = await Data.json();
        setWeatherData(ParsedData);

    }
    const currentHour = parseInt(
        WeatherData?.current?.last_updated?.split(" ")[1].split(":")[0]
    );
    console.log("Current HourData : ", currentHour)

    const filteredHours =
        WeatherData?.forecast?.forecastday?.[0]?.hour?.filter((hour) => {
            const forecastHour = parseInt(
                hour.time.split(" ")[1].split(":")[0]
            );

   // console.log("filter HourData : ", forecastHour)
            return forecastHour > currentHour;
        });



    const scrollLeft = () => {
        setStartIndex(startIndex - 4)
        document.getElementById("hourlySlider").scrollBy({
            left: -500,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        setStartIndex(startIndex + 4)
        document.getElementById("hourlySlider").scrollBy({
            left: 500,
            behavior: "smooth",
        });
    };


 useEffect(() => {
    if (props.City) {
        GetData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [props.City]);

    return (
        <>
            <div className="container my-2 d-flex align-items-center">

                <button className="btn btn-dark rounded-circle mx-2" disabled={startIndex<=0} onClick={scrollLeft}>❮ </button>
                <div id="hourlySlider" className="d-flex gap-2 overflow-auto opacity-75"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none"
                    }}>


                    {filteredHours?.slice(startIndex, startIndex + 4).map((hour) => (
                        <div
                            key={hour.time_epoch}
                            className="d-flex flex-column align-items-center flex-shrink-0">
                            {/* Hour Card */}
                            <div
                                className="card text-center text-white"
                                style={{
                                    width: "100px",
                                    minHeight: "160px",
                                    backgroundColor:'#2D2C54'
                                }}>
                                <div className="card-body">
                                    <img
                                        src={hour.condition.icon}
                                        alt={hour.condition.text}
                                        width="30"
                                        height="30"/>

                                    <p className="mb-1">
                                        {hour.time.split(" ")[1]}
                                    </p>

                                    <p className="mb-0">
                                        {hour.temp_c}°C
                                    </p>
                                </div>

                                <div className="pb-2">
                                    <img
                                        src="./icons8-chevron-down-24.png"
                                        alt=""
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            setOpenHour(
                                                openHour === hour.time_epoch
                                                    ? null
                                                    : hour.time_epoch
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            {/* Details Card */}
                            {openHour === hour.time_epoch && (
                                <div
                                    className="card mt-2 p-2 text-center text-white"
                                    style={{
                                        width: "220px",
                                        fontSize: "14px",backgroundColor:'#2D2C54',
                                        fontWeight:'bolder'
                                    }}
                                >
                                    <p>🌡 Temp: {hour.temp_c}°C</p>
                                    <p>💧 Humidity: {hour.humidity}%</p>
                                    <p>🌬 Wind: {hour.wind_kph} km/h</p>
                                    <p>☁ Condition: {hour.condition.text}</p>
                                    <p>🌧 Chance of Rain: {hour.chance_of_rain}%</p>
                                </div>
                            )}
                        </div>
                    ))} 

                  

                </div>
                  <button className="btn btn-dark rounded-circle mx-2" disabled={startIndex + 5 >= filteredHours?.length} onClick={scrollRight}>
                        ❯
                    </button>
                </div>
                </>
    )

}