import { createSlice } from "@reduxjs/toolkit";
import CONSTANTS from '../../constants';
const { THEMES } = CONSTANTS;

const initialState = THEMES.LIGHTL;
const themeSlice = createSlice({
    name: 'themes',
    initialState,
    reducers: {
      setTheme: (state) => (state === THEMES.DARK ? THEMES.LIGHTL : THEMES.DARK),
    },
  });
const { reducer, actions : { setTheme } } = themeSlice;

export { setTheme };
export default reducer;