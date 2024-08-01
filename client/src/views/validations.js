export default function validation(inputs){
    const errors = {};
    var numeros = "0123456789";
    var letras = "abcdefghyjklmnñopqrstuvwxyzQWERTYUIOPLKJHGFDSAZXCVBNM";
    var signos= "~!@#$%^&*()=_`-':+}{[]|:?><,./\;"
    var signosParaYears = "~!@#$%^&*()=_`':+}{[]|:?><,./\;"


    // Validacion nombre
    //IndexOf devuelve la poscicion en el array de lo que le mandes
    for (let i=0; i < inputs.name.length; i++){
        //si tenemos algo de numeros en nombre mandar error
        if (numeros.indexOf( inputs.name.charAt(i),0) !=-1){
            errors.name = 'Can not have numbers'
        }
    }
    for (let i=0; i < inputs.name.length; i++){
        if (signos.indexOf( inputs.name.charAt(i),0) !=-1){
            errors.name = 'Can not have signs'
        }
    }
    if(inputs.name.length > 15){
        errors.name = 'The name is too long'
    }
    if (!inputs.name) {
        errors.name = '*'
    }

    //Validacion altura
    for (let i=0; i < inputs.height.length; i++){
        if (signos.indexOf( inputs.height.charAt(i),0) !=-1){
            errors.height = 'Cant have signs'
        }
    }
    for (let i=0; i < inputs.height.length; i++){
        if (letras.indexOf( inputs.height.charAt(i),0) !=-1){
            errors.height = 'Cant have leters'
        }
    }
    if(inputs.height > 100){
        errors.height = 'Too high'
    }
    if(inputs.height < 10){
        errors.height = 'Too short'
    }
    if(!inputs.height){
        errors.height = '*'
    }

    //Validacion peso
    for (let i=0; i < inputs.weight.length; i++){
        if (signos.indexOf( inputs.weight.charAt(i),0) !=-1){
            errors.weight = 'Cant have signs'
        }
    }
    for (let i=0; i < inputs.weight.length; i++){
        if (letras.indexOf( inputs.weight.charAt(i),0) !=-1){
            errors.weight = 'Cant have leters'
        }
    }
    if(inputs.weight > 90){
        errors.weight = 'Too heavy'
    }
    if(!inputs.weight){
        errors.weight = '*'
    }

    //Validacion años de Vida
    for (let i=0; i < inputs.life_span.length; i++){
        if (signosParaYears.indexOf( inputs.life_span.charAt(i),0) !=-1){
            errors.life_span = 'Cant have signs'
        }
    }
    if(inputs.life_span.length > 15){
        errors.life_span = 'Too long'
    }
    if(!inputs.life_span){
        errors.life_span = '*'
    }
    //Validacion breed_groups
    for (let i=0; i < inputs.breed_group.length; i++){
        if (signos.indexOf( inputs.breed_group.charAt(i),0) !=-1){
            errors.breed_group = 'Cant have signs'
        }
    }
    for (let i=0; i < inputs.breed_group.length; i++){
        if (numeros.indexOf( inputs.breed_group.charAt(i),0) !=-1){
            errors.breed_group = 'Cant have numbers'
        }
    }
    if(inputs.breed_group.length > 15){
        errors.breed_group = 'The breed is too long'
    }
    if(!inputs.breed_group){
        errors.breed_group = '*'
    }
    //Validacion temperamentos
    // if(inputs.temperament.length < 1){
    //     errors.temperament = 'You need to select at least one'
    // }
    
    
    

    return errors;
}