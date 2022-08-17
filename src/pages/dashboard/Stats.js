import React, {useEffect} from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainer, Loading, ChartsContainer } from '../../components'

export default function Stats() {

  const { showStats, isLoading, monthlyApplications } = useAppContext()

  useEffect(() => {
    showStats()
  
  // eslint-disable-next-line
  }, [])

  if(isLoading){
    return <Loading center />
  }

  return (
    <>
        <StatsContainer></StatsContainer>
        {monthlyApplications.length > 0 &&  <ChartsContainer></ChartsContainer> }
   
 
    </>
  )
}
