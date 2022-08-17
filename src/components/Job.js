import React from 'react'
import moment from 'moment'
import { FaLocationArrow, FaCalendarAlt, FaIdCardAlt, FaPhoneAlt } from 'react-icons/fa'
import { FiAlertTriangle } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'

export default function Job({_id, clientName, contactNo, address, status, fasNo, alertMonth, description, createdAt }) {

    const { setEditJob, deleteJob } = useAppContext()

    let date = moment(createdAt)

    date = date.format('MMM Do, YYYY')

  return (
    <Wrapper>
        <header>
        <div className='main-icon'>{clientName.charAt(0)} </div> 
        <div className='info'>
            <h5> {clientName} </h5>
            <p> {description} </p>
        
        </div>
        </header>
        <div className='content'>
            <div className='content-center'>
                <JobInfo icon={<FaLocationArrow/>} text={address}></JobInfo>
                <JobInfo icon={<FaPhoneAlt/>} text={contactNo}></JobInfo>
                <JobInfo icon={<FaCalendarAlt/>} text={date}></JobInfo>
                <JobInfo icon={<FiAlertTriangle/>} text={alertMonth}></JobInfo>
                <JobInfo icon={<FaIdCardAlt/>} text={`FAS: ${fasNo}`}></JobInfo>
              <div className={`status ${status}`} > {status}</div>
            </div>

            <footer>
                <div className='actions'>
                    <Link to='/add-client' className='btn edit-btn' onClick={()=> setEditJob(_id)}>Edit</Link>
                    <button 
                            type='button' 
                            className='btn delete-btn'
                            onClick={()=> deleteJob(_id)}
                            >Delete</button>
                </div>
            </footer>
        </div>
    
            
    </Wrapper>
  
  )
}
