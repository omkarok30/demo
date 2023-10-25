export const columns = {
    columns: [
        {
            dataIndex: 'employee_status',
            key: 'employee_status',
            title: 'Status',
            sorting: {
                isSort: true,
            },
            filtering: {
                isFilter: true,
            },
        },
        {
            dataIndex: 'first_name',
            key: 'first_name',
            title: 'First Name',
            sorting: {
                isSort: true,
            },
            filtering: {
                isFilter: true,
            },
        },
        {
            dataIndex: 'middle_name',
            key: 'middle_name',
            title: 'Middle Name',
            sorting: {
                isSort: true,
            },
            filtering: {
                isFilter: true,
            },
        },
        {
            dataIndex: 'last_name',
            key: 'last_name',
            title: 'Last Name',
            sorting: {
                isSort: true,
            },
            filtering: {
                isFilter: true,
            },
        },
        {
            dataIndex: 'mobile_number',
            key: 'mobile_number',
            title: 'Mobile Number',
            sorting: {
                isSort: true,
            },
            filtering: {
                isFilter: true,
            },
        },
        // {
        //     dataIndex: 'alt_mobile_number',
        //     key: 'alt_mobile_number',
        //     title: 'Alt. Mobile Number',
        //     sorting: {
        //         isSort: true,
        //     },
        //     filtering: {
        //         isFilter: true,
        //     },
        // },
        // {
        //     dataIndex: 'personal_email_id',
        //     key: 'personal_email_id',
        //     title: 'Personal Email Id',
        // },
        {
            dataIndex: 'office_email_id',
            key: 'office_email_id',
            title: 'Office Email Id',
        },
        {
            buttons: ['Edit', 'Delete'],
            dataIndex: 'action',
            key: 'action',
            primaryKey: 'id',
            tableName: 'institutes',
            title: 'Action',
        },
    ]
}