import axios, { AxiosPromise } from "axios";
import { UsuarioData } from "../interface/UsuarioData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';
const ENDPOINT = '/usuario/';

const putData = async (data: UsuarioData): AxiosPromise<any> => {
    // Verifica se o id existe
    if (!data.id) throw new Error("ID do usuário não fornecido");
    const response = await axios.put(API_URL + ENDPOINT + data.id, data);
    return response;
};

export function useUsuarioDataUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usuario-data'] });
            
        },
    });

    return mutate;
}
