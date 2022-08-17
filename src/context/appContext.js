import React, { useReducer, useContext } from "react";
import reducer from "./reducer";

import { DISPLAY_ALERT, 
         CLEAR_ALERT, 
         
         REGISTER_USER_BEGIN, 
         REGISTER_USER_SUCCESS, 
         REGISTER_USER_ERROR,

         LOGIN_USER_BEGIN,
         LOGIN_USER_SUCCESS,
         LOGIN_USER_ERROR,
        
         SETUP_USER_BEGIN,
         SETUP_USER_SUCCESS,
         SETUP_USER_ERROR,
         TOGGLE_SIDEBAR,

         LOGOUT_USER,

         UPDATE_USER_BEGIN,
         UPDATE_USER_SUCCESS,
         UPDATE_USER_ERROR,

         HANDLE_CHANGE,
         CLEAR_VALUES,
         CREATE_JOB_BEGIN,
         CREATE_JOB_SUCCESS,
         CREATE_JOB_ERROR,
         GET_JOBS_BEGIN,
         GET_JOBS_SUCCESS,
         SET_EDIT_JOB,

         DELETE_JOB_BEGIN,

         EDIT_JOB_ERROR,
         EDIT_JOB_SUCCESS,
         EDIT_JOB_BEGIN,

         SHOW_STATS_BEGIN,
         SHOW_STATS_SUCCESS,
         CLEAR_FILTERS,

         CHANGE_PAGE,

         } from "./actions"

import axios from "axios";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {

    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    position:'',
    company:'',
    jobLocation:  userLocation || '',
    jobTypeOptions: ['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'],
    jobType: 'January',
    statusOptions:['active', 'inactive', 'pending'],
    status: 'pending',

    //getJobs
    jobs: [],
    clients: [],
    totalClients: 0,
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    
    clientName: '',
    contactNo: '',
    clientAddress: userLocation || '',
    fasNum: '',
    description: '',
    

    stats: {},
    monthlyApplications: [],

    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort:'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a']



}


const AppContext = React.createContext()

const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer( reducer, initialState)

    // axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`

    const authFetch = axios.create({
        baseURL: 'https://efss-chennai-be.azurewebsites.net/api/v1',
        // headers: {
        //     Authorization: `Bearer ${state.token}`
        // }
    })


    //request
    authFetch.interceptors.request.use(
        (config) => {
          config.headers.common['Authorization'] = `Bearer ${state.token}`
          return config
        },
        (error) => {
          return Promise.reject(error)
        }
      )
      // response
    
      authFetch.interceptors.response.use(
        (response) => {
          return response
        },
        (error) => {
          // console.log(error.response)
          if (error.response.status === 401) {
            logoutUser()
          }
          return Promise.reject(error)
        }
      )




    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(()=>{
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }


    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }


    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try{
            const response = await axios.post('https://efss-chennai-be.azurewebsites.net/api/v1/auth/register', currentUser )
            console.log(response)
            const {user, token, location} = response.data
            dispatch({
                type: REGISTER_USER_SUCCESS, payload: { user, token, location}
            })
            addUserToLocalStorage({ user, token, location})
        } catch (error) {
            console.log(error.response);
            dispatch({type: REGISTER_USER_ERROR, payload: { msg: error.response.data.msg }})
        }
        clearAlert()
    }



    const loginUser = async ( currentUser ) => {
       dispatch({ type: LOGIN_USER_BEGIN })
        try{
            const response = await axios.post('https://efss-chennai-be.azurewebsites.net/api/v1/auth/login', currentUser )
            const {user, token, location} = response.data
            dispatch({
                type: LOGIN_USER_SUCCESS, payload: { user, token, location}
            })
            addUserToLocalStorage({ user, token, location})
        } catch (error) {
            dispatch({type: LOGIN_USER_ERROR, payload: { msg: error.response.data.msg }})
        }
        clearAlert()

    }


    const setupUser = async ( {currentUser, endPoint, alertText} ) => {
        dispatch({ type: SETUP_USER_BEGIN })
         try{
             const response = await axios.post(`https://efss-chennai-be.azurewebsites.net/api/v1/auth/${endPoint}`, currentUser )
             const {user, token, location} = response.data
             dispatch({
                 type: SETUP_USER_SUCCESS, payload: { user, token, location, alertText }
             })
             addUserToLocalStorage({ user, token, location})
         } catch (error) {
             dispatch({type: SETUP_USER_ERROR, payload: { msg: error.response.data.msg }})
         }
         clearAlert()
      }
    

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR})
    }
    

    const logoutUser = () => {
        dispatch({ type:LOGOUT_USER })
        removeUserFromLocalStorage()
    }


    const updateUser = async (currentUser) => {
        
        dispatch({type: UPDATE_USER_BEGIN})


        try {
            const {data} = await authFetch.patch('/auth/updateUser', currentUser)

            const { user, location, token } = data

            dispatch({type: UPDATE_USER_SUCCESS, payload: { user, location, token}})
            addUserToLocalStorage({user, location, token})
        } catch(error){
            if(error.response.status !== 401){
                dispatch({ type: UPDATE_USER_ERROR, payload: {msg: error.response.data.msg}})
            }
        }
        clearAlert()
    }


    const handleChange = ({ name, value}) => {
        dispatch({type: HANDLE_CHANGE, payload:{name, value}})
    }
    

    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES})
    }

    const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN })
        try {
          const { clientName, contactNo, clientAddress, fasNum, description, jobType, status } = state
          await authFetch.post('/clients', {
            clientName,
            contactNo,
            address: clientAddress,
            alertMonth : jobType,
            status,
            fasNo: fasNum,
            description,
          })
          dispatch({ type: CREATE_JOB_SUCCESS })
          dispatch({ type: CLEAR_VALUES })
        } catch (error) {
          
            if (error.response.status === 401) return
          dispatch({
            type: CREATE_JOB_ERROR,
            payload: { msg: error.response.data.msg },
          })
        }
        clearAlert()
      }

      const getJobs = async () => {
        const { page, search, searchStatus, searchType, sort } = state

        let url = `/clients?page=${page}&status=${searchStatus}&alertMonth=${searchType}&sort=${sort}`

        if(search) {
            url = url + `&search=${search}`
        }

        dispatch({ type: GET_JOBS_BEGIN})
        try{
            const {data} = await authFetch(url);
            const { clients, totalClients, numOfPages} = data

            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: {
                    clients, 
                    totalClients,
                    numOfPages,
                    
                }
            })
        } catch (error) {
                console.log(error.response.data.msg)
        }
        clearAlert()
      }


      const setEditJob = (id) => {
            dispatch({ type: SET_EDIT_JOB, payload: {id}})
      }



      const editJob = async () => {
        dispatch({type: EDIT_JOB_BEGIN})

        try {
            const {clientName,contactNo,clientAddress,fasNum,description,jobType,status} = state
            await authFetch.patch(`/clients/${state.editJobId}`, {
                clientName, contactNo, address : clientAddress , alertMonth :jobType, status, fasNo : fasNum, description
            })
           dispatch({type: EDIT_JOB_SUCCESS})
           dispatch({ type: CLEAR_VALUES})
        } catch (error) {
            if(error.response.status === 401) return
            dispatch({ 
                type: EDIT_JOB_ERROR, 
                payload:{msg: error.response.data.msg}
            })
        }
        clearAlert()
      }



      const deleteJob = async (jobId) => {
            dispatch({ type: DELETE_JOB_BEGIN})

            try {
                await authFetch.delete(`/clients/${jobId}`)
                getJobs()  //this will ensure updated the latest data
            } catch (error) {
                console.log(error.response.data.msg)
            }
      }


      const showStats = async () => {
        dispatch({type: SHOW_STATS_BEGIN})

        try {
            const { data } = await authFetch.get('/clients/stats')
            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats: data.defaultStats,
                    monthlyApplications: data.monthlyApplications,
                }
            })
        } catch (error) {
       
        }
      }

      const clearFilters = () => {
           dispatch({ type: CLEAR_FILTERS })
      }

      const changePage = ( page ) => {
        dispatch({ type: CHANGE_PAGE, payload: { page} })
      }

    return <AppContext.Provider value={{...state, 
                                            displayAlert,
                                            registerUser,
                                            loginUser,
                                            setupUser,
                                            toggleSidebar,
                                            logoutUser,
                                            updateUser,
                                            handleChange,
                                            clearValues,
                                            createJob,
                                            getJobs,
                                            setEditJob,
                                            deleteJob,
                                            editJob,
                                            showStats,
                                            clearFilters,
                                            changePage,
                                             }}>
        {children}
    </AppContext.Provider>
} 


const useAppContext = () => {
    return useContext(AppContext)
}


export { AppProvider, initialState, useAppContext }