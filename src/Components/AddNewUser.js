import React, { Component } from 'react'
import {Link} from 'react-router-dom';  
import {ValidateField, CheckForSubmition, ValidateAllFields} from './Helpers/Valdators';

import Header from './Header';

class AddNewUser extends Component {

    constructor(props) {
        super(props)
    
        this.imageRef = React.createRef();
        this.state={
            formData: { id: '',
                        firstname: '',
                        lastname: '',
                        email:'',
                        phone:'',
                        address:'',
                        imageBase64:''
            }, 
            formFieldsError: {
                        firstname: '',
                        lastname: '',
                        email:'',
                        phone:'',
                        address:'', 
            }
        }
        this.convertingImage = false
        this.users = [] 
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
                    const formData = this.state.formData;
                    formData.imageBase64 = base64String;
                    this.setState({formData}); 
                };
            })(f);
            // Read in the image file as a data URL.
            reader.readAsBinaryString(f);
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }  
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if( !this.convertingImage){ 
            const formData = this.state.formData;
            formData.id = (new Date()).getTime();

            ValidateAllFields(this); 
            this.setState({formData}, ()=>{ 
                if(CheckForSubmition(this))
                {
                    const users = this.users;
                    users.push( this.state.formData ); 
                    console.log('submiting', this.users );
                    
                    localStorage.setItem('User_Details', JSON.stringify(this.users) );
                    alert('Successfully Added new User'); 
                    this.props.history.push('/'); 
                }else 
                    alert('Kindly, correct input values of all the fields before submiting the form \n\n\t برائے مہربانی ، فارم جمع کروانے سے پہلے تمام فیلڈز کی ان پٹ ویلیوز کو درست کریں')
                
            });  
        }else{
            alert('Convertion in Progress');
        }
    }

    handleInputChange = (e) => { 
        ValidateField(e.target.name, e.target.value, this)

        const formData = this.state.formData;
        formData[e.target.name] = e.target.value; 

        this.setState({formData}) 
    }

    componentDidMount(){
        try {
            const users = JSON.parse(localStorage.getItem('User_Details'));

            if(users !== null)
                this.users = users;
        } catch (error) {
            
        } 
    }

    render() { 

        return (   
            <>
            <Header />
            <div className="form-div">
            <form onSubmit={this.handleSubmit}>
                <h2>Add New User</h2>
                <div className="inputFields"> 
                    <label htmlFor="firstname">First-Name</label>
                    <input autoComplete="off" onChange={this.handleInputChange} type="text" id="firstname" name="firstname" />
                    <span className="error">
                        {this.state.formFieldsError.firstname !== "" && this.state.formFieldsError.firstname}
                    </span>

                    <br/>
                    <label htmlFor="lastname">last-Name</label>
                    <input autoComplete="off" onChange={this.handleInputChange} type="text" id="lastname" name="lastname" />
                    <span className="error">
                        {this.state.formFieldsError.lastname !== "" && this.state.formFieldsError.lastname}
                    </span>

                    <br/>
                    <label htmlFor="email">email</label>
                    <input autoComplete="off" onChange={this.handleInputChange} type="text" id="email" name="email" />
                    <span className="error">
                        {this.state.formFieldsError.email !== "" && this.state.formFieldsError.email}
                    </span>

                    <br/>
                    <label htmlFor="phone">Phone</label>
                    <input  autoComplete="off"onChange={this.handleInputChange} type="text" id="phone" name="phone" />
                    <span className="error">
                        {this.state.formFieldsError.phone !== "" && this.state.formFieldsError.phone}
                    </span>

                    <br/>
                    <label htmlFor="address">Address</label>
                    <input autoComplete="off" onChange={this.handleInputChange} type="text" id="address" name="address" />
                    <span className="error">
                        {this.state.formFieldsError.address !== "" && this.state.formFieldsError.address}
                    </span>

                    <br/>
                    <label htmlFor="image">Image</label>
                    <input  onChange={this.handleFileSelect} type="file" ref={this.imageRef} accept="image/*"   id="image" name="image" />
                </div>
                <div className="form-controls">
                    <Link to="/"><input type="button" value="Cancel" /> </Link> 
                    <input type="submit" style={{border: "solid #509e50 2px"}} value="Add" className="btn-success" />
                </div>
            </form>
        </div>
        </>
        ) 
    }
}

export default AddNewUser
