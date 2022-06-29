import React, { useState } from "react";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faSun,
  faSnowflake,
  faCloudShowersHeavy,
  faCloudRain,
  faCloudBolt,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [isLoading, setLoading] = useState(false);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  const date = `${days[d.getDay()]}, ${d.getDate()} ${
    months[d.getMonth()]
  } ${d.getFullYear()}`;

  const url = `${process.env.REACT_APP_URL}weather?q=${location}&units=metric&appid=${process.env.REACT_APP_KEY}`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        setLoading(true);
        await axios
          .get(url)
          .then((res) => {
            setData(res.data);
            console.log(res.data);
            setLoading(false);
          })
          .catch((err) => {
            alert("Enter valid location");
            console.log("Location not found");
            window.location.reload();
          });
        setLocation("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div
      className={
        data.main ? (data.main.temp >= 16 ? "app warm" : "app cool") : "app"
      }
    >
      {isLoading ? (
        <div className="loadingSpinnerContainer">
          <div className="loadingSpinner"></div>
        </div>
      ) : (
        <div>
          <div className="search">
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Enter location"
              onKeyPress={searchLocation}
              type="text"
            />
          </div>
          <div className="container">
            <div className="top">
              <div className="location">
                {data.name && data.sys ? (
                  <p className="location">
                    {data.name}, {data.sys.country}
                  </p>
                ) : null}
              </div>
              <p className="date">{date}</p>
              <div className="temp">
                {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
              </div>
              <div className="description">
                {data.weather ? (
                  <>
                    {
                      (data.weather[0].main === "Clouds" ? (
                        <FontAwesomeIcon icon={faCloud} size="3x" />
                      ) : (
                        (data.weather[0].main === "Clear" ? (
                          <FontAwesomeIcon icon={faSun} size="3x" />
                        ) : (
                          (data.weather[0].main === "Snow" ? (
                            <FontAwesomeIcon icon={faSnowflake} size="3x" />
                          ) : (
                            (data.weather[0].main === "Rain" ? (
                              <FontAwesomeIcon
                                icon={faCloudShowersHeavy}
                                size="3x"
                              />
                            ) : (
                              (data.weather[0].main === "Drizzle" ? (
                                <FontAwesomeIcon icon={faCloudRain} size="3x" />
                              ) : (
                                (data.weather[0].main === "Thunderstorm" ? (
                                  <FontAwesomeIcon
                                    icon={faCloudBolt}
                                    size="3x"
                                  />
                                ) : (
                                  <p> {data.weather[0].main} </p>
                                ))
                              ))
                            ))
                          ))
                        ))
                      ))
                    }
                  </>
                ) : null}
              </div>
            </div>
            {data.name !== undefined && (
              <div className="bottom">
                <div className="feels">
                  {data.main ? (
                    <p className="bold">{Math.round(data.main.feels_like)}°C</p>
                  ) : null}
                  <p>Feels Like</p>
                </div>
                <div className="humidity">
                  {data.main ? (
                    <p className="bold">{data.main.humidity}%</p>
                  ) : null}
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  {data.wind ? (
                    <p className="bold">{Math.round(data.wind.speed)}MPH</p>
                  ) : null}
                  <p>Wind Speed</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
