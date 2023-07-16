import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IProducts {
  date: string;
  genre: string;
  searchTerm:string
}

const initialState: IProducts = {
  date: "0",
  genre: "default",
  searchTerm:'empty'
};

const booksSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setDate,setGenre,setSearchTerm } = booksSlice.actions;

export default booksSlice.reducer;
