import axios from 'axios';
export const ADD_RAZA = 'ADD_RAZA';
export const ADD_TEMPERAMENT = 'ADD_TEMPERAMENT';
export const DELETE_ALL = 'DELETE_ALL';
export const ORDER_TEMPERAMENTS = 'ORDER_TEMPERAMENTS';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';             //? Todo esto solo para evitar errores de sintaxis
export const ORDER_BY_ABC = 'ORDER_BY_ABC';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const SET_SIGNAL = 'SET_SIGNAL';
export const DELETE_DOG = 'DELETE_DOG';

//Nos mandan las señales desde cualquier componente y llegan aqui primero
export function addRaza(raza){//(Significa add perro)
    return{
        //Cuando llega un addraza
        type: ADD_RAZA,
        payload:raza// Lo mandamos al reducer con este payload(mensaje)
    }
}

export function addTemperament(temperament){
    return{
        type: ADD_TEMPERAMENT,
        payload:temperament
    }
}
export function deleteAll(){
    return{
        type: DELETE_ALL,
    }
}
export function orderDogsByTemperaments(temperament){
    return{
        type: ORDER_TEMPERAMENTS,
        payload:temperament
    }
}
export function filterDogsByOrigin(origin){
    return{
        type: FILTER_BY_ORIGIN,
        payload:origin
    }
}
export function orderByAbc(order){
    return{
        type: ORDER_BY_ABC,
        payload:order
    }
}
export function orderByWeight(weight){
    return{
        type: ORDER_BY_WEIGHT,
        payload: weight
    }
}
export function setSignal(page){
    return{
        type: SET_SIGNAL,
        payload: page
    }
}
export function deleteDogRedux(id){
    return{
        type: DELETE_DOG,
        payload: id
    }
}