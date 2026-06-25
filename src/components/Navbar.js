import React,{useState} from 'react'
import WeatherData from './WeatherData'

export default function Navbar({setCity}) {

    const SearchCityWeather  = (e) =>{
      setCity(e.target.value);
      
    }
   
  return (
    <>
    
    <div style={{backgroundColor:'#2D2C54', color:'white'}} className='text-white'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid text-white" style={{backgroundColor:'#2D2C54'}}>
    <a className="navbar-brand text-white" href="/">
        <img  src="./icons8-sun-94.png" alt="weather" style={{width : '25px', height:'25px'}}></img>Weather Today</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse text-white" id="navbarSupportedContent">
      <ul className="navbar-nav text-white me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active text-white" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item text-white">
          <a className="nav-link text-white" href="/">Link</a>
        </li>
      </ul>
      <form className="d-flex text-white" onSubmit={(e) => e.preventDefault()}>
        <input className="form-control me-2 opacity-50 text-white" style={{backgroundColor:'#2D2C54'}}  type="search" onChange={SearchCityWeather}  placeholder="Weather in.." aria-label="Search"/>
        {/* <img src= "./icons8-search-50.gif" className=""  type="submit" style={{width : '35px', height:'35px'}} ></img> */}
      </form>
    </div>
  </div>
</nav>
    </div>
    </>
  )
}
