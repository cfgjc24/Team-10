import React from 'react';
import EmployeeMap from '../components/EmployeeMap';
import IdCard from '../components/IdCard';

const ManagerPage = () => {
  return (
    <div id="page-container">
        <div class="col left-side">
            <IdCard></IdCard>
        </div>
        <div class="col right-side">
            <EmployeeMap></EmployeeMap>
        </div>
    </div>
  )
}


export default ManagerPage;