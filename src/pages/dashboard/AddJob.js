import React from 'react'
import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from "../../context/appContext";
import Wrapper from '../../assets/wrappers/DashboardFormPage';

export default function AddJob() {

  const { showAlert, 
          displayAlert,
          isLoading,
          position,
          company,
          jobLocation,
          jobType,
          jobTypeOptions,
          status,
          statusOptions,
          
          handleChange,
          clearValues,
          createJob,

          isEditing,
          editJob,

          clientName,
          contactNo,
          clientAddress,
          fasNum,
          description,

          
        } = useAppContext()


  const handleSubmit = (e) => {

    e.preventDefault()
    if(!clientName || !contactNo || !fasNum) {
       displayAlert()
      return
     }

    if(isEditing){
      editJob() 
      return
    }

    createJob()
    console.log('create job')
  }
  
  const handleJobInput = (e) => {

    const name = e.target.name
    const value = e.target.value
    handleChange({name, value})
  }
  

  return (
    <Wrapper>
     <form className='form'>
      <h3>{ isEditing ? 'edit client' : 'add client'}</h3>
      {showAlert && <Alert />}
      <div className='form-center'>

        {/* position */}
        <FormRow type='text' name='clientName' labelText='client name' value={clientName} handleChange={handleJobInput} ></FormRow>
        
        {/* company */}
        <FormRow type='text' name='contactNo' labelText='contact no' value={contactNo} handleChange={handleJobInput} ></FormRow>
        
        {/* jobLocation */}
        <FormRow type='text' labelText='Address' name='clientAddress' value={clientAddress} handleChange={handleJobInput} ></FormRow>

        {/* FAS number */}
       <FormRow type='text' name='fasNum' labelText='FAS Number' value={fasNum} handleChange={handleJobInput} ></FormRow>
        
        {/* job type */}
       <FormRowSelect name='jobType' labelText='Alert Month' value={jobType} handleChange={handleJobInput} list={jobTypeOptions}></FormRowSelect>

        {/* job status */}
        <FormRowSelect name='status' value={status} handleChange={handleJobInput} list={statusOptions}></FormRowSelect>

         {/* Description */}
        <FormRow type='text' name='description' labelText='Description' value={description} handleChange={handleJobInput} ></FormRow>
        
        <div className='btn-container'>
          <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>
            submit
          </button>

          <button className='btn btn-block clear-btn' onClick={(e) => {
            e.preventDefault()
            clearValues()
            console.log('clear')
          }}>
              clear
          </button>
        </div>

      </div>
     </form>
     </Wrapper>
  )
}
