import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAEnquiry, getEnquirys, resetState, updateAEnquiry } from '../features/enquiry/enquirySlice';
import {BiEdit} from 'react-icons/bi';
import {AiFillDelete, AiOutlineEye} from 'react-icons/ai';
import { Link } from 'react-router-dom';
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
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];


const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
    const showModal = (e) => {
      setOpen(true);
      setEnquiryId(e);
    };
    const hideModal = () => {
      setOpen(false);
    };
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getEnquirys());
    dispatch(resetState());
  },[]);
  const enquiryState = useSelector((state)=>state.enquiry.enquirys);
  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i+1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      status: (
        <>
          <select 
              defaultValue={enquiryState[i].status ? enquiryState[i].status: "Submitted"} 
              name="" className='form-control form-select' 
              id=""
              onChange={(e)=>setEnquiryStatus(e.target.value, enquiryState[i]._id)}
              >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link 
            to={`/admin/enquiries/${enquiryState[i]._id}`}
            className='ms-3 fs-3 text-danger' >
            <AiOutlineEye />
          </Link>
          <button 
            onClick={()=> showModal(enquiryState[i]._id)}
            className='ms-3 fs-3 text-danger bg-transparent border-0'
          >
            <AiFillDelete />
          </button>
          
        </>
      ),
    });
}
const setEnquiryStatus =(e, i)=>{
  console.log(e, i);
  const data ={id: i, enqData: e};
  dispatch(updateAEnquiry(data));
};
const deleteEnquiry = (e)=>{
  dispatch(deleteAEnquiry(e));
  setOpen(false);
  setTimeout(()=>{
    dispatch(getEnquirys());
  },100);
}
  return (
    <div>
        <h3 className="mb-4 title">Enquiries</h3>
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
            deleteEnquiry(enquiryId);
          }}
          title="Are you sure you want to delete this enquiry?"
        />
    </div>
  )
}

export default Enquiries