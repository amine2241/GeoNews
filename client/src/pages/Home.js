import React from 'react'
import Navbar from '../Components/Navbar'
import Map from '../Components/Map'
const Home = () => {
    return (
        <div >
            <div className="sticky top-0 bottom-0 z-10">
                <Navbar></Navbar>
            </div>
            <div className="sticky top-0 z-0">
                <Map></Map>
            </div>
        </div>

    )
}

export default Home