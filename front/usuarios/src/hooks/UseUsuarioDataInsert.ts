import axios, { AxiosPromise } from "axios"
import { UsuarioData } from "../interface/UsuarioData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const API_URL = 'http://localhost:8080';
const ENDPOINT = '/usuario'
const postData =async (data : UsuarioData): AxiosPromise<any> => {
    const response = axios.post(API_URL+ENDPOINT, data);
    return response;
}


export function useUsuarioDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usuario-data'] });     
           }
    })

    return mutate;
}