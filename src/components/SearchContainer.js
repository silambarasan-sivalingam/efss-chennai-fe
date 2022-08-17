import React from 'react'
import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'


export default function SearchContainer() {

  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
    statusOptions,

  } = useAppContext()

  const handleSearch = (e) => {
      if(isLoading) return 

      handleChange({name: e.target.name, value: e.target.value })
    
  }


  const handleSubmit = (e) => {
      e.preventDefault()
      clearFilters()
  }

  return (
    <Wrapper>
     <form className='form'>
      <h4> search clients</h4>
      <div className='form-center'>

        <FormRow
          type='text'
          name='search'
          value={search}
          handleChange={handleSearch}
        >
        </FormRow>

        <FormRowSelect 
        labelText='status' 
        name='searchStatus' 
        value={searchStatus}
        handleChange={handleSearch}
        list={['all', ...statusOptions]}
        ></FormRowSelect>

        <FormRowSelect 
        labelText='Alert Month' 
        name='searchType' 
        value={searchType}
        handleChange={handleSearch}
        list={['all', ...jobTypeOptions]}
        ></FormRowSelect>

        <FormRowSelect 
        labelText='sort' 
        name='sort' 
        value={sort}
        handleChange={handleSearch}
        list={['all', ...sortOptions]}
        ></FormRowSelect>

      <button 
            className='btn btn-block btn-danger' 
            disabled={isLoading}
            onClick={handleSubmit}
            > clear filters </button>

      </div>
     </form>
      </Wrapper>
  )
}
