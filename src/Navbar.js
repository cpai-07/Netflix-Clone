import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [show,handleShow]=useState(false);
    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            if(window.scrollY>100){
                handleShow(true);
            }
            else{
                handleShow(false);
            }
        });
        // for some reason if the useEffect triggers again this removes the eventListener
        return ()=>{
           window.removeEventListener('scroll'); 
        }
    },[]);
    
    return ( 
        // Always have the "nav" class but if the show state is true then append "nav-black" class
        <div className={`nav ${show && 'nav-black'}`}>
            <img className='nav-logo' src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' alt='Netflix Logo'/>
            <img className='nav-avatar' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='Netflix Avatar'/>
        </div>
    );
}
 
export default Navbar;