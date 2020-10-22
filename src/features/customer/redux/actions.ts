// three actions to fetch, announce success or failure
// the same action name will be used in sagas. 
// Actions are located closer to state hook.
export const PACKAGE_CUSTOMERS = 'PACKAGECUSTOMERS'

export const packageCustomers = (payload: any) => ({
    type: PACKAGE_CUSTOMERS,
    payload
})


export const packageCustomersSuccess = (payload: any) => ({
    type: PACKAGE_CUSTOMERS + '_SUCCESS',
    payload
})

export const PACKAGE_CUSTOMERSFail = (payload: any) => ({
    type: PACKAGE_CUSTOMERS + '_FAIL',
    payload
})
