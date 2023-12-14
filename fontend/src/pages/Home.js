import React, { useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { Link, useNavigate } from 'react-router-dom';
import Meta from './../components/Meta';
import BlogCard from './../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from './../components/SpecialProduct';
import Container from '../components/Container';
import camera from '../images/camera.jpg';
import mainbanner1 from '../images/main-banner-1.jpg';
import catbanner01 from '../images/catbanner-01.jpg';
import catbanner02 from '../images/catbanner-02.jpg';
import catbanner03 from '../images/catbanner-03.jpg';
import catbanner04 from '../images/catbanner-04.jpg';
import tv from '../images/tv.jpg';
import headphone from '../images/headphone.jpg';
import famousjpg from '../images/famous.jpg';
import famouswebp from '../images/famous.webp';
import PhoneSmartWatch from '../images/Phone-Smart-Watch.jpg';
import famous1 from '../images/famous-1.jpeg';
import brand01 from '../images/brand-01.png';
import brand02 from '../images/brand-02.png';
import brand03 from '../images/brand-03.png';
import brand04 from '../images/brand-04.png';
import brand05 from '../images/brand-05.png';
import brand06 from '../images/brand-06.png';
import brand07 from '../images/brand-07.png';
import brand08 from '../images/brand-08.png';
import {services} from '../utils/Data';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from './../features/blogs/blogSlice';
import { getAllProducts } from '../features/products/productSlice';
import prodcompare from '../images/prodcompare.svg';
import view from '../images/view.svg';
import addcart from '../images/add-cart.svg';
import { addToWishlist } from '../features/products/productSlice';
import wish from '../images/wish.svg';
import ReactStars from "react-rating-stars-component";


const Home = () => {
  const blogState = useSelector((state)=> state?.blog?.blog);
  const productState = useSelector((state)=>state?.product?.product);
  // console.log(productState);
  const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        getBlogs();
        getallProducts();
    },[]);
    const getBlogs = ()=>{
        dispatch(getAllBlogs());
    }
    const getallProducts = ()=>{
      dispatch(getAllProducts());
    }
    const addToWish = (id)=>{
      dispatch(addToWishlist(id));
  }
  return (
  <>
  <Meta title={"Home"}/>

  <Container class1="home-wrapper-1 py-5">
    <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img src={mainbanner1} className='img-fluid rounded-3' alt="main banner" />
                <div className="main-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>From $999.00 or $41.62/mo.</p>
                  <Link to="/" className='button'>BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                <div className="small-banner position-relative">
                  <img src={catbanner01} className='img-fluid rounded-3' alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>Best Sake</h4>
                    <h5>iPad S13+ Pro</h5>
                    <p>From $999.00 <br /> or $41.62/mo.</p>
                  </div>
                </div>

                <div className="small-banner position-relative">
                  <img src={catbanner02} className='img-fluid rounded-3' alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>But Ipad Air</h5>
                    <p>From $999.00 <br /> or $41.62/mo.</p>
                  </div>
                </div>

                <div className="small-banner position-relative">
                  <img src={catbanner03} className='img-fluid rounded-3' alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>Best Sake</h4>
                    <h5>iPad S13+ Pro</h5>
                    <p>From $999.00 <br /> or $41.62/mo.</p>
                  </div>
                </div>

                <div className="small-banner position-relative">
                  <img src={catbanner04} className='img-fluid rounded-3' alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>Best Sake</h4>
                    <h5>iPad S13+ Pro</h5>
                    <p>From $999.00 <br /> or $41.62/mo.</p>
                  </div>
                </div>

              </div>
            </div>
    </div>
  </Container>

  <Container class1="home-wrapper-2 py-5">
    <div className="row">
            <div className="col-12">
              <div className="servies d-flex align-items-center justify-content-between">
                {
                  services?.map((i,j) =>{
                    return (
                    <div className='d-flex align-items-center gap-15' key={j}>
                      <img src={i.image} alt="servies" />
                      <div>
                        <h6>{i.title}</h6>
                        <p className='mb-0'>{i.tagline}</p>
                      </div>
                    </div>
                    )
                  })
                }
              </div>
            </div>
    </div>
  </Container>

  {/* <Container class1="home-wrapper-2 py-5">
    <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt="camera" />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt="camera" />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src={tv} alt="camera" />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>SMART Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src={headphone} alt="camera" />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt="camera" />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt="camera" />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src={tv} alt="camera" />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>SMART Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src={headphone} alt="camera" />
              </div>

              
            </div>
          </div>
    </div>
  </Container> */}

  <Container class1="featured-wrapper py-5 home-wrapper-2">
    <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Product</h3>
          </div>
          {
            productState && productState?.map((item, index)=>{
              if(item.tags === "featured"){
                return (
                  <div key={index} className="col-3">
                <div  className="product-card position-relative">
                {/* <Link to="/product/" className="product-card position-relative"> */}
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
                        <p className="price">$ {item?.price}</p>
                    </div>
                    <div className="action-bar position-absolute">
                        <div className='d-flex flex-column gap-15'>
                            {/* <button className='border-0 bg-transparent'>
                                <img src={prodcompare} alt="prodcompare" />
                            </button> */}
                            <button className='border-0 bg-transparent'>
                                <img onClick={()=>navigate("/product/"+item?._id)} src={view} alt="view" />
                            </button>
                            {/* <button className='border-0 bg-transparent'>
                                <img src={addcart} alt="addCart" />
                            </button> */}
                        </div>
                    </div>
                </div>
                </div>
                )
              }
            })
          }
    </div>
  </Container>

  <Container class1="featured-wrapper py-5 home-wrapper-2">
    <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
    </div>
  </Container>

  <Container class1="famous-wrapper py-5 home-wrapper-2">
    <div className="row">
            <div className="col-3">
              <div className="famous-card position-relative">
                <img className='img-fluid' src={famousjpg} alt="famous" />
                <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From #399 or $16.62/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img className='img-fluid' src={famouswebp} alt="famous" />
                <div className="famous-content position-absolute">
                <h5 className='text-dark'>Studio Display</h5>
                <h6 className='text-dark'>600 nits of brightness.</h6>
                <p className='text-dark'>27-inch 5K Retina display</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img className='img-fluid' src={PhoneSmartWatch} alt="famous" />
                <div className="famous-content position-absolute">
                <h5 className='text-dark'>Samrt Phone</h5>
                <h6 className='text-dark'>Samrtphone 13 pro</h6>
                <p className='text-dark'>27-inch 5K Retina display</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img className='img-fluid' src={famous1} alt="famous" />
                <div className="famous-content position-absolute">
                <h5 className='text-dark'>Samrt Phone</h5>
                <h6 className='text-dark'>Samrtphone 13 pro</h6>
                <p className='text-dark'>27-inch 5K Retina display</p>
                </div>
              </div>
            </div>
    </div>
  </Container>

  <Container class1="special-wrapper py-5 home-wrapper-2">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {
            productState && productState?.map((item, index)=>{
              if(item.tags === "special"){
                return <SpecialProduct 
                  key={index} 
                  id = {item?._id}
                  title={item?.title}
                  brand = {item?.brand}
                  image = {item?.images[0]?.url}
                  totalrating ={item?.totalrating.toString()}
                  price= {item?.price}
                  sold = {item?.sold}
                  quantity = {item?.quantity}
                  />
              }
            })
          }
        </div>
      </div>
  </Container>

  <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
        {
            productState && productState?.map((item, index)=>{
              if(item.tags === "popular"){
                return (
                  <div key={index} className="col-3">
                <div  className="product-card position-relative">
                {/* <Link to="/product/" className="product-card position-relative"> */}
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
                        <p className="price">$ {item?.price}</p>
                    </div>
                    <div className="action-bar position-absolute">
                        <div className='d-flex flex-column gap-15'>
                            {/* <button className='border-0 bg-transparent'>
                                <img src={prodcompare} alt="prodcompare" />
                            </button> */}
                            <button className='border-0 bg-transparent'>
                                <img onClick={()=>navigate("/product/"+item?._id)} src={view} alt="view" />
                            </button>
                            {/* <button className='border-0 bg-transparent'>
                                <img src={addcart} alt="addCart" />
                            </button> */}
                        </div>
                    </div>
                </div>
                </div>
                )
              }
            })
          }
        </div>
  </Container>

  <Container class1="marque-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className='d-flex'>
                <div className='mx-4 w-25'>
                  <img src={brand01} alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src={brand02} alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src={brand03} alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src={brand04} alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src={brand05} alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src={brand06} alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src={brand07} alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src={brand08} alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
  </Container>

  <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
        {Array.isArray(blogState) && blogState.length > 0 ? (
                    blogState?.map((item, index) => {
                        if(index < 3){
                          const image = item?.images && item.images[0]?.url;
                        return (
                        <div key={index} className="col-6 mb-3">
                            <BlogCard 
                            id={item?._id}
                            title={item?.title}
                            description={item?.description}
                            image={image}
                            date={moment(item?.createdAt).format(
                                "MMMM Do YYYY, h:mm a"
                            )}
                            />
                        </div>
                        );
                        }
                    })
                    ) : (
                    <div>No data</div>
                    )}
        </div>
  </Container>
  </>
  )
}

export default Home;