import Alert from '@material-ui/lab/Alert'
import React from 'react'

function CustomerDetail(props) {
    return (
        <div>
            <Alert severity="info" >{`Customer details here, photo and highlights. ${props.customerKey}`}</Alert>
        </div>
    )
}

export default CustomerDetail
