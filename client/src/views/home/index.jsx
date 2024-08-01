import React, {useEffect, useState } from 'react';
import validation from '../validations';  
import { useSelector } from "react-redux";
import { setSignal } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import {Link } from 'react-router-dom'
import "./home.css"; // Asegúrate de importar el archivo CSS

const URL = 'http://localhost:3001/dogs';

export default function Form({ postDog, getTemperaments}){
    const dispatch = useDispatch();

    const signal = useSelector(state => state.myCurrentPage );  

    
    const [dogData, setUserData] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        breed_group: '',
        temperament:[],
    });

    const [errors, setErrors] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        breed_group:'',
        temperament:[],
    });
    
    //Esperamos la signal y si llega borramos lo que hay en el form
    if(signal === 1){  
        setUserData(prevState => ({
            name: '',
            height: '',
            weight: '',
            life_span: '',
            breed_group: '',
            temperament:[],
        }));
        dispatch(setSignal(0))
    }
    //Lo que pasa despues de  oprimir submit
    const handlerSubmit = (event) =>{
        event.preventDefault();
        if(dogData.temperament.length > 5){
            alert("Too many selected temperaments")
        }else{
            if(errors.name||errors.height||errors.weight||errors.life_span||errors.breed_group){
                alert("Form has errors")
            }else{
                postDog(dogData);
            }
        }
    }
    //Esto esta pasando mientras se va escribiendo en el form
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === 'temperament'){
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
            setUserData(prevState => ({
                ...prevState,
                [name]:selectedOptions
            }));
        }else{
            setUserData(prevState => ({
                ...prevState,
                [name]:value
            }));
        }
        //Mandamos los datos a validacion
        setErrors(validation({
          ...dogData,
          [name]: value
        }));
    };
    
    return(
        <div className="container" onSubmit={handlerSubmit}>
            <h1>Aqui tendria que poner para subir mis fotos</h1>

            <form className="form" id="formul">
                <div className="arriba">
                    <div className='cajas' > 
                        <label > (*) Means it cannot be empty</label>
                        <p></p>
                        <label>Name</label>
                        <input 
                        type='text' 
                        name='name'
                        value={dogData.name}
                        onChange={handleChange}
                        //Si hay un error en name entonces el estilo es warning si no el estilo es input form
                       
                        />

                        <label>Height (cm)</label>
                        <input 
                        type='text' 
                        name='height'
                        value={dogData.height}
                        onChange={handleChange}
                        />


                        <label>Weight (Kg)</label>
                        <input 
                        type='text' 
                        name='weight'
                        value={dogData.weight}
                        onChange={handleChange}
                        />

                        <label>Life_span</label>
                        <input 
                        type='text' 
                        name='life_span'
                        value={dogData.life_span}
                        onChange={handleChange}
                        />

                        <label>Breed Group</label>
                        <input 
                        type='text' 
                        name='breed_group'
                        value={dogData.breed_group}
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div >
                    <Link to={`/home`}>
                        <button >Cancel</button>
                    </Link>
                    <div >
                        <button type='submit'>Submit</button>
                    </div>
                </div>
            </form>

            
        </div>

    )
    }