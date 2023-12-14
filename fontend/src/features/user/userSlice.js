import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {authService} from './userService';
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk("auth/register", async(userData,thunkAPI)=>{
    try {
        return await authService.register(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const LoginUser = createAsyncThunk("auth/login", async(userData,thunkAPI)=>{
    try {
        return await authService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserProductWishlist = createAsyncThunk(
    "user/wishlist",
    async(thunkAPI)=>{
        try {
            return await authService.getUserWishlist();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addProdToCart = createAsyncThunk(
    "user/cart/add",
    async(cartData,thunkAPI)=>{
        try {
            return await authService.addToCart(cartData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getUserCart = createAsyncThunk(
    "user/cart/get",
    async(cartData,thunkAPI)=>{
        try {
            return await authService.getCart();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getOrders = createAsyncThunk(
    "user/order/get",
    async(thunkAPI)=>{
        try {
            return await authService.getUserOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteCartProdcuct = createAsyncThunk(
    "user/cart/product/delete",
    async(cartItemId,thunkAPI)=>{
        try {
            return await authService.removeProductFromCart(cartItemId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateCartProdcuct = createAsyncThunk(
    "user/cart/product/update",
    async(cartDetail,thunkAPI)=>{
        try {
            return await authService.updateProductFromCart(cartDetail);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const updateProfile = createAsyncThunk(
    "user/profile/update",
    async(data,thunkAPI)=>{
        try {
            return await authService.updateUser(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const forgotPasswordToken = createAsyncThunk(
    "user/password/token",
    async(data,thunkAPI)=>{
        try {
            return await authService.forgotPassToken(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createAnOrder = createAsyncThunk(
    "user/cart/create-order",
    async(orderDetail,thunkAPI)=>{
        try {
            return await authService.createOrder(orderDetail);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const getCustomerfromLocalStoragge = localStorage.getItem("customer")? 
JSON.parse(localStorage.getItem("customer")): null;

const initialState={
    user: getCustomerfromLocalStoragge,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (buider)=>{
        buider.addCase(registerUser.pending, (state)=>{
            state.isLoading= true;
        }).addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.isError=false;
            state.isSuccess= true;
            state.createdUser = action.payload;
            if(state.isSuccess === true){
                toast.info("User Craeted Successfuly");
            }
        }).addCase(registerUser.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError= true;
            state.isSuccess= false;
            state.message=action.error;
            if(state.isError === true){
                toast.error(action.error);
            }
        })
        .addCase(LoginUser.pending, (state)=>{
            state.isLoading= true;
        }).addCase(LoginUser.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.isError=false;
            state.isSuccess= true;
            state.user = action.payload;
            if(state.isSuccess === true){
                localStorage.setItem("token", action.payload.token);
                toast.info("User login in Successfuly");
            }
        }).addCase(LoginUser.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError= true;
            state.isSuccess= false;
            state.message=action.error;
            if(state.isError === true){
                toast.error(action.error);
            }
        })
        .addCase(getUserProductWishlist.pending, (state)=>{
            state.isLoading= true;
        }).addCase(getUserProductWishlist.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.isError=false;
            state.isSuccess= true;
            state.wishlist = action.payload;
        }).addCase(getUserProductWishlist.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError= true;
            state.isSuccess= false;
            state.message=action.error;
        })
        .addCase(addProdToCart.pending, (state)=>{
            state.isLoading= true;
        }).addCase(addProdToCart.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.isError=false;
            state.isSuccess= true;
            state.cartProduct = action.payload;
            if(state.isSuccess){
                toast.success("Product Added To Cart");
            }
        }).addCase(addProdToCart.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError= true;
            state.isSuccess= false;
            state.message=action.error;
        })
        .addCase(getUserCart.pending, (state)=>{
            state.isLoading= true;
        }).addCase(getUserCart.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.isError=false;
            state.isSuccess= true;
            state.cartProducts = action.payload;
        }).addCase(getUserCart.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError= true;
            state.isSuccess= false;
            state.message=action.error;
        })
        .addCase(deleteCartProdcuct.pending, (state)=>{
            state.isLoading= true;
        }).addCase(deleteCartProdcuct.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.isError=false;
            state.isSuccess= true;
            state.deletedCartProduct = action.payload;
            if(state.isSuccess){
                toast.success("Product Deleted From Cart Successfully!")
            }
        }).addCase(deleteCartProdcuct.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError= true;
            state.isSuccess= false;
            state.message=action.error;
            if(state.isError){
                toast.error("Some thing went wrong!")
            }
        })
        .addCase(updateCartProdcuct.pending, (state)=>{
            state.isLoading= true;
        }).addCase(updateCartProdcuct.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.isError=false;
            state.isSuccess= true;
            state.updatedCartProduct = action.payload;
            if(state.isSuccess){
                toast.success("Product Updated From Cart Successfully!")
            }
        }).addCase(updateCartProdcuct.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError= true;
            state.isSuccess= false;
            state.message=action.error;
        })
        .addCase(createAnOrder.pending, (state)=>{
            state.isLoading= true;
        }).addCase(createAnOrder.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.isError=false;
            state.isSuccess= true;
            state.orderedProduct = action.payload;
            if(state.isSuccess){
                toast.success("Ordered Successfully!")
            }
        }).addCase(createAnOrder.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError= true;
            state.isSuccess= false;
            state.message=action.error;
            if(state.isError){
                toast.error("Something went wrong!")
            }
        })
        .addCase(getOrders.pending, (state)=>{
            state.isLoading= true;
        }).addCase(getOrders.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.isError=false;
            state.isSuccess= true;
            state.getorderedProduct = action.payload;
           
        }).addCase(getOrders.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError= true;
            state.isSuccess= false;
            state.message=action.error;
            
        })
        .addCase(updateProfile.pending, (state)=>{
            state.isLoading= true;
        }).addCase(updateProfile.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.isError=false;
            state.isSuccess= true;
            state.updatedUser = action.payload;
            if(state.isSuccess){
                toast.success("Profile Updated Successfully!")
            }
           
        }).addCase(updateProfile.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError= true;
            state.isSuccess= false;
            state.message=action.error;
            if(state.isError === false){
                toast.error("Something went wrong!")
            }
        })
        .addCase(forgotPasswordToken.pending, (state)=>{
            state.isLoading= true;
        }).addCase(forgotPasswordToken.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.isError=false;
            state.isSuccess= true;
            state.token = action.payload;
            if(state.isSuccess){
                toast.success("Fotgot Password Email Sent Successfully!")
            }
           
        }).addCase(forgotPasswordToken.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError= true;
            state.isSuccess= false;
            state.message=action.error;
            if(state.isError === false){
                toast.error("Something went wrong!")
            }
        });

    },
});

export default authSlice.reducer;
