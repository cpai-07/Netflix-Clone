import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import Instance from './axios'
import movieTrailer from 'movie-trailer';
import './Row.css';



// we can fetch the property of the Row component through "props"(property)
const Row = (props) => {
    // img url
    const baseURL='https://image.tmdb.org/t/p/original/';
    const [movies,setMovies]=useState([]);
    const [trailerUrl,setTrailerUrl]=useState("");

    useEffect(()=>{
        // if we leave the brackets [],run once when row loads
        async function fetchData(){
            // instance.get() will concatenate the base url and the request endpoints and provides the request
            // eg: 'https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US'
            const request=await Instance.get(props.fetchUrl);
            console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
        
    },
    // this useEfect() will triggeres if the url gets cahnged every time
    [props.fetchUrl]
    );
    
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        }
    };

    const handleClick=(movie)=>{
        // if the trailerUrl is already there then close it by clicking on a image
        if(trailerUrl){
            setTrailerUrl("");
        }
        else{
            // movieTrailer is a module which gives a movie url
            movieTrailer(movie?.name||movie?.original_name||movie?.title||"").then((url)=>{
                // eg: https://www.youtube.com/watch?v=XtMThy8QKqU
                // URL holds the url and by the search method we can get the string value after the '?' of the youtube video
                // by Wrapping inside the URLSearchParams,,,we can easily get the value of the id
                const urlParams=new URLSearchParams(new URL(url).search);
                //getting the value
                setTrailerUrl(urlParams.get("v"));
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    
    return ( 
        <div className='row'>
            {/* title */}
            <h2>{props.title}</h2>
            {/* Container to display all the movie images  */}
           
            <div className='row-posters'>
                {movies.map((movie)=>(
                <img
                key={movie.id}
                onClick={()=>handleClick(movie)}
                // image property is under the 'row-poster' clss but if suppose isLargePaster is true then append "row-posterlarge"
                 className={`row-poster ${props.isLargePosters && 'row-posterlarge'}`} 
                //  if isLargePosters is true append poster_path to base url else backdrop_path to base url
                 src={`${baseURL}${props.isLargePosters?movie.poster_path:movie.backdrop_path}`} alt={movie.name}/>
                ))}
            </div>
            {/* if trailerUrl then play the video */}
            {trailerUrl&&<YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
     );
}
 
export default Row;

 