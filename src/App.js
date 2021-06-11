import React from 'react';
import './App.css';
import Row from './Row';
import requests from './request'
import Banner from './Banner';
import Navbar from './Navbar';

function App() {
  return (
    <div className="app">
    {/* Navbar */}
    <Navbar />
    {/* Banner */}

    <Banner/>

    {/* row to display posters */}
    {/* here title fetchUrl and isLargePosters are the properties of row component */}
      <Row title='NETFLIX ORIGINALS' fetchUrl={requests.fetchNetflixOriginals} isLargePosters={true}/>
      <Row title='NETFLIX TRENDING' fetchUrl={requests.fetchTrending}/>
      <Row title='TOP RATED' fetchUrl={requests.fetchTopRated}/>
      <Row title='ACTION MOVIES' fetchUrl={requests.fetchActionMovies}/>
      <Row title='COMEDY MOVIES' fetchUrl={requests.fetchComedyMovies}/>
      <Row title='HORROR MOVIES' fetchUrl={requests.fetchHorrorMovies}/>
      <Row title='ROMANCE MOVIES' fetchUrl={requests.fetchRomanceMovies}/>
      <Row title='DOCUMENTARIES' fetchUrl={requests.fetchDocumentaries}/>
      
    </div>
  );
}

export default App;
