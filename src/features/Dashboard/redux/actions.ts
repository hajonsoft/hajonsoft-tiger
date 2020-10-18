// three actions to fetch, announce success or failure
// the same action name will be used in sagas. 
// Actions are located closer to state hook.

export const packages = (payload: any) => ({
    type: 'PACKAGES',
    payload
})


export const packagesSuccess = (payload: any) => ({
    type: 'PACKAGES_SUCCESS',
    payload
})

export const packagesFail = (payload: any) => ({
    type: 'PACKAGES_FAIL',
    payload
})
