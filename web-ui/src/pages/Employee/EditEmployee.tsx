import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, Space, Table } from 'antd';
import TableContainer from "@/components/Table";
import { useEmployee } from '@/store/employee/useEmployee';
import * as modelEmployee from '@/models/Employee/Employee';

const pagination = {
    currentPage: 1,
    pageSize: 10,
};

const EditEmployee = () => {

    const { employeeList, getEmployeeDetails,searchEmployee } = useEmployee(
        (state: any) => ({
            employeeList: state.employeeDetails,
            getEmployeeDetails: state.getEmployeeDetails,
            searchEmployee:state.serachEmployeeDetails
        }),
    );


    useEffect(() => {
        getEmployeeDetails()
    }, [getEmployeeDetails])


    const handleSearchClick=(searchKeyword:string)=>{
        searchEmployee(searchKeyword);
    }

    return (
        <div className='layout-main-content'>
            <Card
                bordered={false}
                title="Employee records"
            >
                <Row className="">
                    <Col>
                        <h4>Employee Name</h4>
                        <Input.Search onSearch={handleSearchClick}/>
                    </Col>
                </Row>
                <Space direction="horizontal" />
                <TableContainer
                    data={employeeList}
                    columns={modelEmployee.columns}
                    pagination={pagination}
                    handleActionClick={() => { }}
                    allowSearch={false}
                />
            </Card>
        </div>
    )
}

export default EditEmployee