import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bcategoryService from "./bcategoryService";


export const getCategories = createAsyncThunk("blogCategory/get-categories", 
async(thunkAPI)=>{
    try {
        return await bcategoryService.getBlogCategories();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createBlogCategory = createAsyncThunk("blogCategory/create-categories", 
async(blogcategoryData, thunkAPI)=>{
    try {
        return await bcategoryService.createBlogCategorie(blogcategoryData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// export const seleteblogCat = createAsyncThunk(
//     "blogCategory/delete-category",
//     async(id, thunkAPI)=>{
//         try {
//             return await bcategoryService.deleteBlogCategory(id)
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );


export const getABlogCategory = createAsyncThunk(
    "blogCategory/get-blog-category",
    async (id, thunkAPI) => {
      try {
        return await bcategoryService.getBlogsCategory(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const updateABlogCategory = createAsyncThunk("blogCategory/update-category", 
async(bCategory, thunkAPI)=>{
    try {
        return await bcategoryService.updateBlogsCategory(bCategory);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteABlogCategory = createAsyncThunk(
    "blogCategory/delete-category",
    async (id, thunkAPI) => {
      try {
        return await bcategoryService.deleteBlogsCategory(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);


export const resetState = createAction("Reset_all");

const initialState ={
    bCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const pcategorySlice = createSlice({
    name: "bCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getCategories.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(getCategories.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.bCategories = action.payload;
        })
        .addCase(getCategories.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createBlogCategory.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(createBlogCategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdCategories = action.payload;
        })
        .addCase(createBlogCategory.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getABlogCategory.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(getABlogCategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.bCategoryName = action.payload.title;
        })
        .addCase(getABlogCategory.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateABlogCategory.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(updateABlogCategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedBlogCategory = action.payload;
        })
        .addCase(updateABlogCategory.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteABlogCategory.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(deleteABlogCategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedBlogCategory = action.payload;
        })
        .addCase(deleteABlogCategory.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState,()=> initialState);
    }
});

export default pcategorySlice.reducer;