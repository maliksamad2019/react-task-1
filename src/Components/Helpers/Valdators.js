
export const ValidateAllFields = (_this) =>{
    for (let item in _this.state.formData){
        console.warn(ValidateField(item,_this.state.formData[item], _this));
    } 
}


export const ValidateField = (fieldType, fieldValue, _this) => { 
    let test = false;
    let formFieldsError = _this.state.formFieldsError;

    switch(fieldType){
        case 'firstname':
        case 'lastname': 
            test = /^[a-z A-Z]{5,10}$/.test(fieldValue);
            formFieldsError[fieldType] = (test ? "" : `${fieldType}'s lenght must be between 5 and 10 and should only be alphabits`)
            break;
        case 'email': 
            test = /^([\w.-]+@([\w-]+)\.+\w{2,})/.test(fieldValue); 
            formFieldsError[fieldType] = (test ? "" : `${fieldType} is not in correct formate`)
            break;
        case 'phone': 
            test =  /^(\+92|92|03|0092)\d{10}$/.test(fieldValue);
            formFieldsError[fieldType] = (test ? "" : `${fieldType} is not in correct formate`)
            break; 
        case 'address': 
            test = fieldValue.length > 0 && fieldValue.length < 100; 
            formFieldsError[fieldType] = (test ? "" : `${fieldType} can't be empty [required]`)
            break; 
        default:
            return 'un-known values, inputField could be [FILE or ID]';
            
    }

    _this.setState({formFieldsError});
    return (test); 
}

export const CheckForSubmition = (_this) => { 
    let canSubmit = true; 
    canSubmit = _this.state.formFieldsError.firstname !== "" ? false: canSubmit;
    canSubmit = _this.state.formFieldsError.lastname !== "" ? false: canSubmit;
    canSubmit = _this.state.formFieldsError.email !== "" ? false: canSubmit;
    canSubmit = _this.state.formFieldsError.address !== "" ? false: canSubmit;
    canSubmit = _this.state.formFieldsError.phone !== "" ? false: canSubmit;

    console.log(canSubmit); 
    
    return canSubmit;
}









/*
    Names : ^[a-z A-Z]{5,10}$
    Email:  ^([\w.-]+@([\w-]+)\.+\w{2,}) 
    Phone: ^(\+92|92|03|0092)\d{10}$ 
*/
