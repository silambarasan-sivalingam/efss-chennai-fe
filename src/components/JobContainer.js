import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'


export default function JobContainer() {

    const { getJobs, 
        
            isLoading, 
            page, 
          
            search, 
            searchStatus, 
            searchType, 
            sort,
            numOfPages,
            clients,
            totalClients
            
     } = useAppContext()
    
    useEffect(() => {
        getJobs()
        // eslint-disable-next-line
    }, [page, search, searchStatus, searchType, sort])
    

    if(isLoading) {
        return <Loading center='center' />
    }

    if(clients.length === 0) {
        return <Wrapper>
            <h2> No Client found</h2>
        </Wrapper>
    }

  return (
    <Wrapper>
        <h5>{totalClients} client{ clients.length > 1 && 's'} found </h5>
        <div className='jobs'>
            {clients.map((client) =>{
                return <Job key={client._id} {...client}></Job>
            })}
        </div>

       {numOfPages > 1 && <PageBtnContainer/>} 
    </Wrapper>
  )
}
