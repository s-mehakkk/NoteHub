import React from 'react'

const Alert = () => {
    return (
        <div style={{ height: '50px' }}>
            {props.alert && <div style={{ maxHeight: '40px' }}>
                <div className={`alert alert-${props.alert.type} alert-dismissible fade show container`} style={{ maxHeight: '45px', padding: '2' }} role="alert">
                    <strong className='pb-2'>{props.alert.type}: {props.alert.message}</strong>
                </div>
            </div>}
        </div>
    )
}

export default Alert
