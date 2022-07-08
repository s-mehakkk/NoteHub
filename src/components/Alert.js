import React, { useContext } from 'react'
import alertContext from '../context/alert/alertContext';

const Alert = () => {
    const acontext = useContext(alertContext);
    const {alert} = acontext;
    let word = alert.type;
    if(word === 'danger'){
        word = 'error';
    }
    return (
        <div style={{height: '50px'}} >
            { alert.type && <div >
                <div className={`alert alert-${alert.type} alert-dismissible fade show d-flex align-items-center`} style={{ maxHeight: '45px', padding: '2' }} role="alert">
                    <strong className='pb-2'>{word.toUpperCase()}: {alert.message}</strong>
                </div>
            </div>}
        </div>
    )
}

export default Alert
