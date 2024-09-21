import React from 'react';
import EmployeeMap from '../components/EmployeeMap';
import IdCard from '../components/IdCard';

const ManagerPage = () => {
  return (
    <div id="page-container">
        <div className="col left-side">
            <IdCard></IdCard>
        </div>
        <div className="col right-side">
            <EmployeeMap></EmployeeMap>
        </div>
    </div>
  )
}


export default ManagerPage;