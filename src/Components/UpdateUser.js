import React, { Component } from 'react'
import {Link} from 'react-router-dom'; 
import {ValidateField, CheckForSubmition, ValidateAllFields} from './Helpers/Valdators';

import Header from './Header';
import Error404 from './404';

class UpdateUser extends Component {

    constructor(props) {
        super(props)
    
        this.state = { 
            users: [],
            formData: {}, 
            formFieldsError: {
                    firstname: '',
                    lastname: '',
                    email:'',
                    phone:'',
                    address:'', 
            }
        } 
        this.convertingImage = false;
    }   

    static getDerivedStateFromProps(props, state){  
        if(state.users.length !== 0)
            return {}

        const { match: { params } } = props;
        const usersList = JSON.parse( localStorage.getItem('User_Details') );
        const formData = usersList.filter( (item) => item.id === parseFloat( params.user_id ) )[0];
        //console.log(usersList, formData, params.user_id)

        return ({ users: usersList, formData: formData });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        ValidateAllFields(this); 
        if(CheckForSubmition(this))
        {
            const users = this.state.users.map( item => {
                if(item.id === this.state.formData.id)
                    return this.state.formData;
                else
                    return item;
            });

            localStorage.setItem('User_Details', JSON.stringify(users));
            alert('Successfully Updated!'); 
            this.props.history.push('/'); 
        }else 
            alert('Kindly, correct input values of all the fields before submiting the form \n\n\t برائے مہربانی ، فارم جمع کروانے سے پہلے تمام فیلڈز کی ان پٹ ویلیوز کو درست کریں')
    
    }
    
    handleFileSelect = (evt) => { 
        if (window.File && window.FileReader && window.FileList && window.Blob) { 
            this.convertingImage = true;
            var f = evt.target.files[0]; // FileList object
            var reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = ((theFile) => {
                return (e) => {
                    var binaryData = e.target.result;
                    //Converting Binary Data to base 64
                    var base64String = window.btoa(binaryData);

                    //putting file converted to base64  
                    this.convertingImage = false;
                    
                    const currUserData = this.state.formData;
                    currUserData.imageBase64 = base64String
                    this.setState({formData: currUserData}); 
                };
            })(f);
            // Read in the image file as a data URL.
            reader.readAsBinaryString(f);
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }  
    }

    handleInputChange = (e) => {
        ValidateField(e.target.name, e.target.value, this); 

        const currUserData = this.state.formData; 
        currUserData[e.target.name] = e.target.value; 
        this.setState({formData: currUserData}); 
    }

    render() {
        
        if(this.state.formData === undefined || this.state.formData.length <= 0 ){
            return <Error404 />;
        } 

        return (  
            <>
            <Header />
            <div className="form-div">
            <form onSubmit={this.handleSubmit}>
                <h2>Edit User of ID: {this.state.formData.id}</h2>
                <div className="inputFields"> 
                    <label htmlFor="firstname">First-Name</label>
                    <input autoComplete="off" onChange={this.handleInputChange} 
                            type="text" id="firstname" name="firstname"
                            value={this.state.formData.firstname} />
                    <span className="error">
                        {this.state.formFieldsError.firstname !== "" && this.state.formFieldsError.firstname}
                    </span>

                    <br/>
                    <label htmlFor="lastname">last-Name</label>
                    <input autoComplete="off" onChange={this.handleInputChange} 
                            type="text" id="lastname" name="lastname" 
                            value={this.state.formData.lastname}/>
                    <span className="error">
                        {this.state.formFieldsError.lastname !== "" && this.state.formFieldsError.lastname}
                    </span>

                    <br/>
                    <label htmlFor="email">email</label>
                    <input autoComplete="off" onChange={this.handleInputChange} 
                            type="text" id="email" name="email" 
                            value={this.state.formData.email}/>
                    <span className="error">
                        {this.state.formFieldsError.email !== "" && this.state.formFieldsError.email}
                    </span>

                    <br/>
                    <label htmlFor="phone">Phone</label>
                    <input autoComplete="off" onChange={this.handleInputChange} 
                            type="text" id="phone" name="phone" 
                            value={this.state.formData.phone}/>
                    <span className="error">
                        {this.state.formFieldsError.phone !== "" && this.state.formFieldsError.phone}
                    </span>

                    <br/>
                    <label htmlFor="address">Address</label>
                    <input autoComplete="off" onChange={this.handleInputChange} 
                            type="text" id="address" name="address" 
                            value={this.state.formData.address}/>
                    <span className="error">
                        {this.state.formFieldsError.address !== "" && this.state.formFieldsError.address}
                    </span>

                    <br/>
                    <label htmlFor="image">Image</label>
                    <input autoComplete="off"  onChange={this.handleFileSelect} 
                            type="file" ref={this.imageRef} accept="image/*"   
                            id="image" name="image" />
                </div>
                <div className="form-controls">
                    <Link to="/"><input type="button" value="Cancel" /> </Link> 
                    <input type="submit" 
                            style={{border: "solid #509e50 2px"}} 
                            value="Save" 
                            className="btn-success" />
                </div>
            </form>
        </div>
        </>
        )  
    }
}

export default UpdateUser
