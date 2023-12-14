import React, { useEffect, useState } from 'react'
import BreadCrumb from './../components/BreadCrumb';
import Meta from './../components/Meta';
import ReactStars from "react-rating-stars-component";
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import watch from '../images/watch.jpg';
import gr4 from '../images/gr4.svg';
import gr3 from '../images/gr3.svg';
import gr2 from '../images/gr2.svg';
import gr from '../images/gr.svg';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';


const OurStore = () => {
    const [grid, setGrid] =useState(4);
    const productState = useSelector((state)=> state?.product?.product);
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])


    //Filter States
    const [tag, setTag] = useState(null)
    // const [tag, setTag] = useState(null)
    const [category, setCategory] = useState(null)
    const [brand, setBrand] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [sort, setSort] = useState(null)


    useEffect(()=>{
        let newBrands= []
        let category =[]
        let newtags = []
        let newColors = []
        for (let index = 0; index < productState.length; index++) {
            const element = productState[index];
            newBrands.push(element.brand)
            category.push(element.category)
            newtags.push(element.tags)
            newColors.push(element.color)
        }
        
        setBrands(newBrands)
        setCategories(category)
        setTags(newtags)

    },[productState])


    const dispatch = useDispatch();
    useEffect(()=>{
        getProducts();
    },[sort,tag,brand,category,minPrice,maxPrice]);
    const getProducts = ()=>{
        dispatch(getAllProducts({sort,tag,brand,category,minPrice,maxPrice}));
    }




  return (
<>
<Meta title={"Our Store"}/>
    <BreadCrumb title='Our Store'/>
    <Container class1="store-wapper home-wrapper-2 py-5">
            <div className="row">
                <div className="col-3">
                    <div className='filter-card mb-3'>
                        <h3 className="filter-title">
                                Shop By Categories
                        </h3>
                        <div>
                            <ul className='ps-0'>
                            {
                                categories && [...new Set(categories)].map((item,index)=>{
                                    return <li key={index} onClick={()=>setCategory(item)}>{item}</li>
                                })
                            }
                            </ul>
                        </div>
                    </div>
                    <div className='filter-card mb-3'>
                        <h3 className="filter-title">
                                Filter By
                        </h3>
                        <div>
                            {/* <h5 className="sub-title">Availability</h5>
                            <div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input"/>
                                    <label htmlFor="" className="form-check-label">
                                            In Stock {1}
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input"/>
                                    <label htmlFor="" className="form-check-label">
                                            Out of Stock {0}
                                    </label>
                                </div>
                            </div> */}
                            <h5 className="sub-title">Price</h5>
                            <div className='d-flex align-items-center gap-10'>
                                <div className="form-floating">
                                    <input onChange={(e)=>setMinPrice(e.target.value)} type="number" className="form-control" id="floatingInput" placeholder="From" />
                                    <label htmlFor="floatingInput">From</label>
                                </div>
                                <div className="form-floating">
                                    <input onChange={(e)=>setMaxPrice(e.target.value)} type="number" className="form-control" id="floatingInput1" placeholder="To" />
                                    <label htmlFor="floatingInput1">To</label>
                                </div>
                            </div>
                            {/* <h5 className="sub-title">Colors</h5>
                            <div>
                                <Color />
                            </div>
                            <h5 className="sub-title">Size</h5>
                            <div>
                                <div className="form-check">
                                    <input id="color-1" type="checkbox" value=""  className="form-check-input" />
                                    <label className="form-check-label" htmlFor="color-1">
                                             S (2)
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input id="color-2" type="checkbox" value=""  className="form-check-input" />
                                    <label className="form-check-label" htmlFor="color-2">
                                             M (0)
                                    </label>
                                </div>
                            </div> */}
                        </div>
                        <div className='mt-4 mb-3'>
                        <h3 className="sub-title">
                                Products Tangs
                        </h3>
                        <div>
                            <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                {
                                    tags && [...new Set(tags)].map((item,index)=>{
                                        return (<span onClick={()=>setTag(item)} key={index} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3">
                                                    {item}
                                                </span>)
                                    })
                                }
                                
                            </div>
                        </div>
                    </div>

                    <div className=' mb-3'>
                        <h3 className="sub-title">
                                Products Brands
                        </h3>
                        <div>
                            <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                {
                                    brands && [...new Set(brands)].map((item,index)=>{
                                        return (<span onClick={()=>setBrand(item)} key={index} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3">
                                                    {item}
                                                </span>)
                                    })
                                }
                                
                            </div>
                        </div>
                    </div>
                    </div>
                    

                    {/* <div className='filter-card mb-3'>
                        <h3 className="filter-title">
                                Radom Product
                        </h3>
                        <div>
                            <div className="random-products mb-3 d-flex">
                                <div className="w-50">
                                    <img src={watch} className='img-fluid' alt="watch" />
                                </div>
                                <div className="w-50">
                                    <h5>
                                        Kids headphoes bulk 10pack multi colored for student
                                    </h5>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={4}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <b>$ 300</b>
                                </div>
                            </div>
                            <div className="random-products d-flex">
                                <div className="w-50">
                                    <img src={watch} className='img-fluid' alt="watch" />
                                </div>
                                <div className="w-50">
                                    <h5>
                                        Kids headphoes bulk 10pack multi colored for student
                                    </h5>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={4}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <b>$ 300</b>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="col-9">
                    <div className="filter-sort-grid mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-10">
                            <p className="mb-0 d-block" style={{"width": "100px"}}>Sort By:</p>
                            <select onChange={(e)=>setSort(e.target.value)} name="" className='form-control form-select' id="">
                                <option value="title">Alphanbetically, A-Z</option>
                                <option value="-title">Alphanbetically, A-Z</option>
                                <option value="price">Price, low to high</option>
                                <option value="-price">Price, high to low</option>
                                <option value="createdAt">Date, old to new</option>
                                <option value="-createdAt">Date, new to old</option>
                            </select>
                        </div>
                        <div className='d-flex align-items-center gap-1'>
                            <p className="totalproducts mb-0">21 Products</p>
                            <div className="d-flex gap-10 align-items-center grid">
                                <img 
                                    onClick={()=>{
                                        setGrid(3);
                                    }} 
                                    src={gr4}
                                    className='d-block img-fluid' 
                                    alt="grid" />
                                <img 
                                    onClick={()=>{
                                        setGrid(4);
                                    }} 
                                    src={gr3}
                                    className='d-block img-fluid' 
                                    alt="grid" />
                                <img 
                                    onClick={()=>{
                                        setGrid(6);
                                    }} 
                                    src={gr2} 
                                    className='d-block img-fluid' 
                                    alt="grid" />
                                <img 
                                    onClick={()=>{
                                        setGrid(12);
                                    }} 
                                    src={gr} 
                                    className='d-block img-fluid' 
                                    alt="grid" />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="products-list pb-5">
                        <div className="d-flex gap-10 flex-wrap">
                        <ProductCard data={productState ? productState : []} grid={grid}/>
                        </div>
                    </div>
                </div>
            </div>
    </Container>
</>
  )
}

export default OurStore