import React, { useEffect, useState } from 'react'
import MaterialTable from '@material-table/core'
import { forwardRef } from 'react'
import axiosInstance from '../helpers/axiosInstance'
import Modal from '../components/usermodal'

import AddBox from '@mui/icons-material/AddBox'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import Check from '@mui/icons-material/Check'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Clear from '@mui/icons-material/Clear'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import Edit from '@mui/icons-material/Edit'
import FilterList from '@mui/icons-material/FilterList'
import FirstPage from '@mui/icons-material/FirstPage'
import LastPage from '@mui/icons-material/LastPage'
import Remove from '@mui/icons-material/Remove'
import SaveAlt from '@mui/icons-material/SaveAlt'
import Search from '@mui/icons-material/Search'
import ViewColumn from '@mui/icons-material/ViewColumn'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

const Table = () => {
  const [data, setData] = useState([])
  const [changeTrigger, setChangeTrigger] = useState(false)

  const [dialogData, setDialogData] = useState(null)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleClickOpen = (rowData) => {
    setDialogData(rowData)
    setIsOpen(true)
  }

  const handleClose = () => {
    setDialogData(null)
    setIsOpen(false)
  }

  useEffect(() => {
    try {
      axiosInstance.get('/user').then((res) => {
        if (res.status === 200) {
          setData(res.data)
          console.log(res.data)
        }
      })
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <>
      <Modal info={dialogData} open={isOpen} handleClose={handleClose} />
      <MaterialTable
        icons={tableIcons}
        title="Positioning Actions Column Preview"
        options={{
          actionsColumnIndex: -1,
        }}
        columns={[
          { title: 'ID', field: 'id', editable: 'never' },
          {
            title: 'Name',
            field: 'name',
            render: (rowData) => (
              <div onClick={() => handleClickOpen(rowData)}>{rowData.name}</div>
            ),
          },
          { title: 'Age', field: 'age' },
          { title: 'Address', field: 'address' },
        ]}
        data={data}
        // actions={[
        //   {
        //     icon: () => <Edit />,
        //     tooltip: 'Save User',
        //     onClick: (e, rowData) =>
        //       setOpen((prev) => prev === !prev)(
        //         <div>
        //           <Modal info={rowData} open={open} handleClose={handleClose} />
        //         </div>
        //       ),
        //   },
        // ]}
        // editable={{
        //   onRowAdd: (newData) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         axiosInstance
        //           .post('/add', {
        //             name: newData.name,
        //             age: newData.age,
        //             address: newData.address,
        //           })
        //           .then((response) => {
        //             if (response.data.error) {
        //               reject()
        //             } else {
        //               setData([...data, newData])
        //               setChangeTrigger(!changeTrigger)
        //               resolve()
        //             }
        //           })
        //       }, 1000)
        //     }),
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve, reject) => {
        //       // setTimeout(() => {
        //       //     const dataUpdate = [...data];
        //       //     const index = oldData.tableData.id;
        //       //     dataUpdate[index] = newData;
        //       //     axiosInstance.put('/api/user/update',
        //       //         {
        //       //             userid: data[index]._id,
        //       //             username: data[index].username,
        //       //             role: dataUpdate[index].role,
        //       //         }).then((response) => {
        //       //             if (response.data.errors){
        //       //                 reject();
        //       //             } else {
        //       //                 setData([...dataUpdate]);
        //       //                 setChangeTrigger(!changeTrigger);
        //       //                 resolve();
        //       //             }
        //       //     }).catch(alert)
        //       // }, 1000)
        //     }),
        //   onRowDelete: (oldData) =>
        //     new Promise((resolve, reject) => {
        //       // setTimeout(() => {
        //       //     const dataDelete = [...data];
        //       //     const index = oldData.tableData.id;
        //       //     dataDelete.splice(index, 1);
        //       //     axiosInstance.post('/api/user/delete',
        //       //         {
        //       //             userid: data[index]._id,
        //       //         }).then((response) => {
        //       //             if (response.data.errors) {
        //       //                 reject();
        //       //             } else {
        //       //                 setData([...dataDelete]);
        //       //                 setChangeTrigger(!changeTrigger);
        //       //                 resolve();
        //       //             }
        //       //         });
        //       // }, 1000)
        //     }),
        // }}
      />
      {/* <div onClick={handleOpen} variant="contained">
        <Modal info={'Alyson'} open={open} handleClose={handleClose} />
        Click ME
      </div> */}
    </>
  )
}

export default Table
