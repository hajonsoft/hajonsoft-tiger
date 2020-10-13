

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
