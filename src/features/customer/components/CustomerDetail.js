import React from 'react'

function CustomerDetail(props) {
    return (
        <div>
            <div>Customer related attributes or images</div>
            {JSON.stringify(props)}
        </div>
    )
}

export default CustomerDetail
