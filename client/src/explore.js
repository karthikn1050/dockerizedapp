import React, { useEffect, useState, useContext } from 'react'
import Loader from './loader'
import './explore.css'
import { withRouter } from 'react-router-dom'
import Sidebar from './Sidebar'
import Widgets from './Widgets'


const Explore = (props) => {
  
    const [tab, setTab] = useState('Trends')
    const [trendOpen, setTrendOpen] = useState(false)


   

    useEffect(() => {
  
        // if(props.history.location.search.length>0){
        //     goToTrend(props.history.location.search.substring(1))
            
        // }
    }, [])

    // const followUser = (e, id) => {
    //     e.stopPropagation()
    //     actions.followUser(id)
    // }

    // const goToUser = (id) => {
    //     props.history.push(`/profile/${id}`)      
    // } 

    const goToTrend = (hash) => {
        setTrendOpen(true)
        let hashtag = hash.substring(1)

    }
    

    return(
        <div className='app'>
            <Sidebar />
        <div className="explore-wrapper">
            <h2>Explore</h2>
            <div className={trendOpen ? "explore-header header-border" : "explore-header"}>
                {trendOpen && 
                <div className="explore-header-back">
                    <div onClick={()=>setTrendOpen(false)} className="explore-back-wrapper">
                     
                    </div>
                </div>}
                <div className="explore-search-wrapper">
                    <div className="explore-search-icon">
                    
                    </div>
                    <div className="explore-search-input">
                        <input  placeholder="Search for hashtags or people" type="text" name="search"/>
                    </div>
                </div>
            </div>
            {!trendOpen ?
            <div>
                <div className="explore-nav-menu">
                    <div onClick={()=>setTab('Trends')} className={tab === 'Trends' ? `explore-nav-item activeTab` : `explore-nav-item`}>
                        Trending 
                    </div>
                    <div onClick={()=>setTab('Search')} className={tab === 'Search' ? `explore-nav-item activeTab` : `explore-nav-item`}>
                        Search
                    </div>
                </div>
                {tab === 'Trends' ? 
                     <div className = "widgets">
                   
                     <div className = "widgets__widgetContainer">
                         <h2>
                             Whats'happening
                         </h2>
                
                        #Trending
                       <ol>
                        <li style={{marginTop:"20px",marginLeft:"30px"}}><strong> Dhvani</strong></li>
                        <li style={{marginTop:"20px",marginLeft:"30px"}}><strong> Dhvani AI</strong></li>
                        <li style={{marginTop:"20px",marginLeft:"30px"}}><strong> Full Stack Development</strong></li>
                        <li style={{marginTop:"20px",marginLeft:"30px"}}><strong> Dhvani DL</strong></li>
                        <li style={{marginTop:"20px",marginLeft:"30px"}}><strong> Dhvani</strong></li>
                        <li style={{marginTop:"20px",marginLeft:"30px"}}><strong> Dhvani AI</strong></li>
                        <li style={{marginTop:"20px",marginLeft:"30px"}}><strong> Full Stack Development</strong></li>
                        <li style={{marginTop:"20px",marginLeft:"30px"}}><strong> Dhvani DL</strong></li>
                        </ol>
                     </div>
                 </div> : <Loader/>
                
                }
            </div> : <div>
         
            </div>}
        </div>
        <Widgets />
        </div>
    )
}

export default Explore;