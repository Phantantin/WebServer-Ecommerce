import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi';
import {AiFillDelete} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAColor, getColors, resetState } from '../features/color/colorSlice';
import CustomModal from '../Components/CustomModal';

const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a,b) => a.name.length - b.name.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolordId] = useState("");
    const showModal = (e) => {
      setOpen(true);
      setcolordId(e);
    };
    const hideModal = () => {
      setOpen(false);
    };
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getColors());
    dispatch(resetState());
  },[]);
  const colorState = useSelector((state)=>state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i+1,
      name: colorState[i].title,
      action: (
        <>
          <Link 
            to={`/admin/color/${colorState[i]._id}`}
            className='fs-3'>
            <BiEdit />
          </Link>
          <button 
            onClick={()=> showModal(colorState[i]._id)}
            className='ms-3 fs-3 text-danger bg-transparent border-0'
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
}
const deleteColor = (e)=>{
  dispatch(deleteAColor(e));
  setOpen(false);
  setTimeout(()=>{
    dispatch(getColors());
  },100);
}
  return (
    <div>
        <h3 className="mb-4 title">Color List</h3>
        <div>
        <Table  
          columns={columns} 
          dataSource={data1} 
        />
        </div>
        <CustomModal 
          hideModal={hideModal}
          open={open}
          performAction={()=>{
            deleteColor(colorId);
          }}
          title="Are you sure you want to delete this color?"
        />
    </div>
  )
}

export default Colorlist