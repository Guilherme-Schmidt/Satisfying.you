//DIRETRIZES DO ESTADO GLOBAL PESQUISA
import { createSlice } from "@reduxjs/toolkit";

//valores iniciais do estado global pesquisa
const initialValues = {
    pesquisaID: null, //acessar os dados da pesquisa pelo seu id (usado somente para editar, excluir e gerar relatorio(carregar dados do firestore))
    //colocar os outros campos para otimizar tempo de carregamento na hora de exibir o título do header em AcoesPesquisa e trazer dados pré-carregados no modificar pesquisa (evitar consultas no firestore a cada pesquisa selecionada)
    nome: null,
    data: null,
    imagem: null
}

export const pesquisaSlice = createSlice({
    name: 'pesquisa',
    initialState: initialValues,
    reducers: {
        reducerSetPesquisa: (state, action) => {
            //Alterar os valores do estado global pesquisa
            state.pesquisaID = action.payload.pesquisaID;
            state.nome = action.payload.nome;
            state.data = action.payload.data;
            state.imagem = action.payload.imagem;
        }
    }
});

export const { reducerSetPesquisa } = pesquisaSlice.actions;
export default pesquisaSlice.reducer; 