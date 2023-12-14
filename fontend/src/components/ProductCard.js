import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from 'react-router-dom';
import wish from '../images/wish.svg';
import watch from '../images/watch.jpg';
import catbanner02 from '../images/catbanner-02.jpg';
import prodcompare from '../images/prodcompare.svg';
import view from '../images/view.svg';
import addcart from '../images/add-cart.svg';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../features/products/productSlice';


const ProductCard = (props) => {
    const {grid, data} = props;
    // console.log(data);
    const dispatch = useDispatch();
    let location = useLocation();
    const addToWish = (id)=>{
        dispatch(addToWishlist(id));
    }
  return (
<>
    {
        data?.map((item, index)=>{
            return(
                <div key={index} className={`${location.pathname === "/product" ? `gr-${grid}`: "col-3"}`}>
                <div  className="product-card position-relative">
                {/* <Link className="product-card position-relative"> */}
                    <div className="wishlist-icon position-absolute">
                        <button 
                            onClick={()=>{
                                addToWish(item?._id);
                            }}
                             className='border-0 bg-transparent'>
                            <img src={wish} alt="wishlist" />
                        </button>
                    </div>
                    <div className="product-image">
                        {/* <img className='img-fluid mx-auto' width={160} src={item?.images[0].url} alt="product" /> */}
                        {item && item.images && item.images[0] && item.images[0].url ? (
                        <img className='img-fluid' src={item.images[0].url} alt="product" />
                        ) : (
                        <p>Không có ảnh</p>
                        )}
                        <img className='img-fluid' src={catbanner02} alt="product" />
                    </div>
                    <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                            {item?.title}
                        </h5>
                        <ReactStars
                            count={5}
                            size={24}
                            value={item?.totalrating.toString()}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p 
                            className={`description ${grid ===12 ? "d-blok" : "d-none"}`}
                            dangerouslySetInnerHTML={{__html: item?.description }}
                            >
                            
                        </p>
                        <p className="price">$ {item?.price}</p>
                    </div>
                    <div className="action-bar position-absolute">
                        <div className='d-flex flex-column gap-15'>
                            {/* <button className='border-0 bg-transparent'>
                                <img src={prodcompare} alt="prodcompare" />
                            </button> */}
                            <Link to={"/product/"+item?._id} className='border-0 bg-transparent'>
                                <img src={view} alt="view" />
                            </Link>
                            {/* <button className='border-0 bg-transparent'>
                                <img src={addcart} alt="addCart" />
                            </button> */}
                        </div>
                    </div>
                </div>
                </div>
            )
        })
    }

</>
  )
}

export default ProductCard