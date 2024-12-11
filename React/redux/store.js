//ESTADOS GLOBAIS

import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./loginSlice";
import { pesquisaSlice } from "./pesquisaSlice";

export const store = configureStore({
    //estados globais que recebem os slices
    reducer: {
        login: loginSlice.reducer,
        pesquisa: pesquisaSlice.reducer
    }
});

