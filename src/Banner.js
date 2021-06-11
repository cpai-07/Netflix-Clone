import React, { useEffect, useState } from 'react';
import requests from './request';
import instance from './axios';
import './Banner.css';


const Banner = () => {
    const [movie,setMovie]=useState([]);

    useEffect(()=>{
        async function fetchData(){
            // we're requesting only one url data 
            const request=await instance.get(requests.fetchNetflixOriginals);
            // results : set of arrays [....,...,...,...]...so we want to fetch random movies each time
            setMovie(request.data.results[Math.floor(Math.random()*request.data.results.length-1)])
        }

        fetchData();
    },[])
    // console.log(movie);

    // if the description is more than given n then it will repalce text with ...
    function truncate(str,n){
        return str?.length>n?str.substr(0,n-1)+'...':str;
    }
    

    return (
        // header is for dealing with background images 
        <header className='banner' style={{
           backgroundSize:'cover',
        //    ?: if ever the movie name is undefined '?' will handle the error
           backgroundImage:`url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')` ,
           backgroundPosition:'center center'
        }}>
            <div className='banner-contents'>
                {/* title */}
                {/* Sometimes api gives name or original_name or title for movies so we're using ||(or) */}
                {/* ?: if ever the movie name is undefined '?' will handle the error */}
                <h1 className='banner-title'>{movie?.name||movie?.original_name||movie?.title}</h1>
                {/* div buttons */}
                <div className='banner-buttons'>
                    <button className='banner-button'>
                        Play
                    </button>
                    <button className='banner-button'>
                        Mylist
                    </button>
                </div>
                {/* description */}
                <h1 className='banner-description'>
                {/* if thre are more than 150 words then repalce furthr lines with .... */}
                    {truncate(movie?.overview,150)}
                </h1>
                {/* adding empty div because to add fade at the bottom */}
                <div className='banner-fadebottom' />
            </div>

        </header>
     );
}
 
export default Banner;