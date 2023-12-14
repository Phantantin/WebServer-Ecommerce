import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";


export const getAllProducts = createAsyncThunk(
    "product/get", 
    async(data,thunkAPI)=>{
    try {
        return await productService.getProducts(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAProducts = createAsyncThunk(
    "product/getAProduct", 
    async(id, thunkAPI)=>{
    try {
        return await productService.getSingleProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addToWishlist = createAsyncThunk(
    "product/wishlist", 
    async(proId,thunkAPI)=>{
    try {
        return await productService.addToWishlist(proId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const addRating = createAsyncThunk(
    "product/rating", 
    async (data,thunkAPI)=>{
    try {
        return await productService.rateProduct(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const productState ={
    product: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const productSlice = createSlice({
    name: "product",
    initialState: productState,
    reducers: {},
    extraReducers: (buider)=>{
        buider.addCase(getAllProducts.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllProducts.fulfilled,(state,action)=>{
            state.isLoading= false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        })
        .addCase(getAllProducts.rejected, (state,action)=>{
            state.isError= true;
            state.isLoading = false;
            state.isSuccess= false;
            state.message = action.error;
        })
        .addCase(addToWishlist.pending,(state)=>{
            state.isLoading= true;
        })
        .addCase(addToWishlist.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.addToWishlist = action.payload;
            state.message ="Product Added To Wishlist!";
            
        })
        .addCase(addToWishlist.rejected, (state, action)=>{
            state.isLoading= false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getAProducts.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAProducts.fulfilled,(state,action)=>{
            state.isLoading= false;
            state.isError = false;
            state.isSuccess = true;
            state.singleproduct = action.payload;
            state.message ="Product Fteched Successfully!";

        })
        .addCase(getAProducts.rejected, (state,action)=>{
            state.isError= true;
            state.isLoading = false;
            state.isSuccess= false;
            state.message = action.error;
        })
        .addCase(addRating.pending,(state)=>{
            state.isLoading= true;
        })
        .addCase(addRating.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.rating = action.payload;
            state.message ="Added Rating Successfuly";
            if(state.isSuccess){
                toast.success("Rating Product Successfuly")
            }
        })
        .addCase(addRating.rejected, (state, action)=>{
            state.isLoading= false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    },
});

export default productSlice.reducer;
