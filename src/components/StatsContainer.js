import React from 'react'
import StatsItem from './StatsItem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'
import { useAppContext } from '../context/appContext'

export default function StatsContainer() {

    const { stats } = useAppContext()

    const defaultStats = [
        {
            title: 'Active clients',
            count: stats.active || 0,
            icon: <FaSuitcaseRolling />,
            color: '#647acb',
            bcg: '#e0e8f9',
        }, 
        {
            title: 'Pending Clients',
            count: stats.pending || 0,
            icon: <FaCalendarCheck />,
            
            color: '#e9b949',
            bcg: '#fcefc7',
        }, 
        {
            title: 'Inactive Clients',
            count: stats.inactive || 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee'
        }, 


    ]
  return (
    <Wrapper>
        { defaultStats.map((item, index) => {
            return <StatsItem key={index} {...item} />
        })}
    </Wrapper>
  )
}
