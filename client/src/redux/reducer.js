import { ADD_RAZA, ADD_TEMPERAMENT, DELETE_ALL, ORDER_TEMPERAMENTS, FILTER_BY_ORIGIN, ORDER_BY_ABC, SET_SIGNAL, DELETE_DOG } from "./actions";

const initialState = {//Esto es mi memoria temporal global.
    misRazas:[],//Mis perros que se muestran en la pantalla
    razasOriginales: [], //Los perros que tengo sin filtrar o alterar nada(no se muestran en la pantalla)
    misTemperamentos:[],
    myCurrentPage:0,
}

const rootReducer = (state = initialState, {type, payload}) =>{
    switch(type){
        //En caso de que me llegue uno con el nombre add raza(add perro)
        case ADD_RAZA:
            return{
                //TODO MUY IMPORTANTE AQUI SIEMRPE HACER UNA COPIA  DEL ESTADO  
                //Caso contrario borraria todo lo demas que este(temperamentos, myCurrenPage etc)
                ...state,//copia del estado
                misRazas:[...state.misRazas,payload],//Significa que mis razas sean una copia del misrazas del estrado, junto con el payload
                razasOriginales: [...state.razasOriginales, payload], //significa que lo mismo de arriba pero guardandolo en mis razas originales
            }
        case ADD_TEMPERAMENT:
            return{
                ...state,
                misTemperamentos:[...state.misTemperamentos,payload]
            }
        case DELETE_ALL:
            return{
                ...state,
                misRazas:[],
                razasOriginales: [], 
            }
        case ORDER_TEMPERAMENTS:
            return{
                ...state,
                misRazas:  payload !== 'all' ? state.razasOriginales.filter((element)=>element.temperament &&  element.temperament.includes(payload))  : state.razasOriginales
            }    
        case FILTER_BY_ORIGIN://Necesario usar : y ? para if else
            return{
                ...state,
                misRazas: payload === 'api' 
                ? state.razasOriginales.filter(element => !element.fromDataBase)
                : payload === 'dataBase'
                ? state.razasOriginales.filter(element => element.fromDataBase)
                : state.razasOriginales

            } 
            case ORDER_BY_ABC:
                const sortedArr = payload === 'asc' ?
                [...state.misRazas].sort(function (a, b) {
                    if (a.name > b.name) { return 1 }
                    if (b.name > a.name) { return -1 }
                    return 0;
                }) : payload === 'dsc' ?
                [...state.misRazas].sort(function (a, b) {
                    if (a.name > b.name) { return -1; }
                    if (b.name > a.name) { return 1; }
                    return 0;
                }) : state.razasOriginales
            return {
                ...state,
                misRazas: sortedArr
            }

            case 'ORDER_BY_WEIGHT':
                const pesoPromedio = (weightString) => {
                    if(weightString !== undefined){
                      if(typeof weightString === 'string'){
                        let weightArray = weightString.split("-");
                        let weight = weightArray.map((element) => {
                          return Number (element.trim())
                        });
                        if(weight.length === 2){
                          let suma =  weight[0] + weight[1];
                          let promedio = suma / 2;
                          return promedio
                        }else{
                          return weight;
                        }
                      }else{
                        return weightString
                      }
                    }else{
                      console.log("Error en peso promedio")
                    }
                  };
                const sortedWeight = payload === 'asc' ?
                    [...state.misRazas].sort((a, b) => {
                        const weightA = pesoPromedio(a.weight);
                        const weightB = pesoPromedio(b.weight);
                        return weightA - weightB;
                      })
                    :  payload === 'dsc' ?
                    [...state.misRazas].sort((a, b) => {
                        const weightA = pesoPromedio(a.weight);
                        const weightB = pesoPromedio(b.weight);
                        return weightB - weightA;
                    }): state.razasOriginales
                
                return {
                    ...state,
                    misRazas: sortedWeight
                }

            case SET_SIGNAL:
                return{
                    ...state,
                    myCurrentPage:payload
                } 
            case DELETE_DOG:
                return{
                    ...state,
                    razasOriginales:  state.razasOriginales.filter((perro)=>perro.id !== payload),
                    misRazas:  state.razasOriginales.filter((perro)=>perro.id !== payload)
                } 
        default:
            return{...state};
    }
}
export default rootReducer;
