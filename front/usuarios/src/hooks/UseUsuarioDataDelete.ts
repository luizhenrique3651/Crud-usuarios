import axios, { AxiosPromise } from "axios";
import { UsuarioData } from "../interface/UsuarioData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';
const ENDPOINT = '/usuario/';

const deleteData = async (data: UsuarioData): AxiosPromise<any> => {
    // Verifica se o id existe
    if (!data.id) throw new Error("ID do usuário não fornecido");
    const response = await axios.delete(API_URL + ENDPOINT + data.id);
    return response;
};

export function useUsuarioDataDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usuario-data'] });
            
        },
    });

    return mutate;
}
