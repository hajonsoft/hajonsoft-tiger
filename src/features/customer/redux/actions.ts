// three actions to fetch, announce success or failure
// the same action name will be used in sagas. 
// Actions are located closer to state hook.

export const packageCustomers = (payload: any) => ({
    type: 'PACKAGECUSTOMERS',
    payload
})


export const packageCustomersSuccess = (payload: any) => ({
    type: 'PACKAGECUSTOMERS_SUCCESS',
    payload
})

export const packageCustomersFail = (payload: any) => ({
    type: 'PACKAGECUSTOMERS_FAIL',
    payload
})
