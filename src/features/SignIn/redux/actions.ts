// three actions to fetch, announce success or failure
// the same action name will be used in sagas. 
// i will keep this actions file glibally like the reducer 

export const login = (payload: any) => ({
    type: 'LOGIN',
    payload
})


export const loginSuccess = (payload: any) => ({
    type: 'LOGIN_SUCCESS',
    payload
})

export const loginFail = (payload: any) => ({
    type: 'LOGIN_FAIL',
    payload
})
