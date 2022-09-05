import React, { useState, useEffect } from 'react';
import './readmeDesign.css';

export default function Readme({}) {
    return(
<div class="readme">
    <div class="title">
        <h1>Read Me - Erel</h1>
    </div>
    <div class="readme_content">
    <h1>Store name?</h1>
    <p>Erel & maya's book store.</p>
    <h1>What additional pages did you add?</h1>
    <p>Favorites page – all costumer's favorites books.</p>
    <p>Book information page – relevant details about the book.</p>   
    <p>Best sellers page – books which fit desired category.</p>    
    <p>Newsletter - registration to our newsletter.</p>
    <h1>What was hard to do?</h1>
    <p>Nothing was hard to do :)</p>
    <h1>Who is your partner?</h1>
    <p>Maya Feingersh 208412296.</p>
    <h1>What did you do?</h1>
    <p>I made the book display screen, store screen, and best sellers screen.
        We also worked together on the following: server, login screen, cart and checkout screen, tests and the admin screen.</p>
    <h1>What did your partner do?</h1>
    <p>Maya did the following screens: register page newsletter and favorites and also some of the test.</p>
        <h1>Specify all the different routes your app supports </h1>
        <p>Our app supports the following routes:</p>
        <p>“/“ - Main store screen</p>    
        <p>“/favorites” - Favorites books.</p>    
        <p>“/cart” - The checkout screen.</p>   
        <p>“/best-sellers” - Get the best sellers currently.</p>     
        <p>“/newsletter” - Register to our newsletter.</p>     
        <p>“/admin” - admin portal to add/remove items and watch activities.</p>     
        <p>“/book/:isbn” - watch book details by isbn (book-Id).</p>    
        <p>“/readme.html” - Individual readme file.</p>  
    </div>
</div>
      )
}