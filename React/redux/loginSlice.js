//DIRETRIZES DO ESTADO GLOBAL LOGIN
import { createSlice } from "@reduxjs/toolkit";

//valores iniciais do estado global login
const initialValues = {
    email: null,
    userID: null
}

export const loginSlice = createSlice({
    name: 'login',
    initialState: initialValues,
    reducers: { //funções que recebem uma action e realizam a alteração do estado
        reducerSetLogin: (state, action) => {
            //Alterar os valores do estado global login
            state.email = action.payload.email; //payload sao os parametros passados quando a action for disparada
            state.userID = action.payload.userID;
        }
    }
});

export const { reducerSetLogin } = loginSlice.actions; //propriedade actions permite disparar as nossas actions em outras telas. actions é gerado por createSlice
export default loginSlice.reducer; //funções criadas no objeto reducers. Será usado em store.js