import React, { Component } from 'react'
import SingleUserInList from './SingleUserInList'; 
import Header from './Header';  

class UserList extends Component {
  
    constructor(props) {
        super(props);
    
        this.state = {
            Users: [],
            filteredUsers: [], 
            selectAll: true,
            selectedUsersID: []
        }
        this.filtering = false;
        this.deleteSingleItem = this.deleteSingleItem.bind(this);
    }  

    
    handleSearch = (e) => {
        const query = e.target.value.toLowerCase()
        this.filtering = query !== ""; 
        const filteredUsers = this.state.Users.filter(item => (item.firstname.toLowerCase().includes(query) 
        || item.lastname.toLowerCase().includes(query) ) )
        this.setState({filteredUsers : filteredUsers});
    }   
    
    componentDidMount(){ 
        if(localStorage.getItem('User_Details') != null){ 
            let users = JSON.parse(localStorage.getItem('User_Details'));
            // users.push();
            console.log(users);
            this.setState({Users: users});
        }
    } 
    
    deleteAllSelected = ()=>{
        if(!global.confirm(`Are you Sure, to delete all of the Selected users`))
            return;

        const remainingUsers = this.state.Users.filter(item => {
            return this.state.selectedUsersID.find((value) => value === item.id) === undefined;
        })
 
        this.setState({Users : remainingUsers});
        localStorage.setItem('User_Details', JSON.stringify(remainingUsers));
    }
    
    deleteSingleItem = (id) => { 
        
        if(!global.confirm(`Are you Sure, to delete this user of ID: ${id}`))
            return;

        let Users = this.state.Users;
        console.log('submiting',  Users);
        Users = Users.filter(item => item.id !== id)
        
        this.setState({Users});
        localStorage.setItem('User_Details', JSON.stringify(Users) );
    }

    selectUser = (id) => {
        if(id === 'select_all'){
            this.setState({selectAll: !this.state.selectAll});
            return;
        }

        if(!this.state.selectedUsersID.includes(id))
        {   const selected = this.state.selectedUsersID;
            selected.push(id);  
            this.setState({selectedUsersID: selected})
        }
        else{
            const selected = this.state.selectedUsersID; 
            this.setState({selectedUsersID: selected.filter(item => item !== id)})
        } 
    }

    render() { 
        const renderingList = this.filtering ? this.state.filteredUsers : this.state.Users; 
        
        return (  
        <>
        <Header deleteAll={this.deleteAllSelected} />
        
        <div style={{textAlign: "center"}}>
            <h2 style={{color:"#6e6e6e"}}>Users List</h2>
            <div className="searchForm">
                <form>
                    <input type="text" onChange={this.handleSearch} placeholder="Search..."/> 
                </form>
            </div> 
            <table className="user-list"> 
                <tbody> 
                    <tr>
                        <td><input hidden onChange={() => this.selectUser('select_all')}
                                    defaultChecked={this.state.selectAll}
                                    className="scale" type="checkbox" /></td>
                        <td><span>Image</span></td>
                        <td><span>First-Name</span></td>
                        <td><span>Last-Name</span></td>
                        <td><span>Email</span></td>
                        <td><span>Address</span></td>
                        <td><span>Actions</span></td>
                    </tr>
                    {
                        renderingList.map(item => <SingleUserInList key={item.id} 
                            userList={this}
                            userData={item} />)
                    }
                    
                </tbody>
            </table>
        </div>  
        </>
        )
    }
} 

export default UserList
