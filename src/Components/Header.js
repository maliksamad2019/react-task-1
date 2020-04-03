import React from 'react'
import {Link} from 'react-router-dom';

function Header(props) {
    return ( 
        
        <div className="header">
            <div className="app-name">
                User Management
            </div>
            <div className="app-nav">
                {
                    props.deleteAll && <div className="btn-danger" onClick={props.deleteAll}> 
                                        <i className="material-icons icon">&#xE15C;</i> 
                                        <div>Delete Selected</div>
                                    </div>
                }
                
                <Link to="/add-user">
                    <div href="Form.html" className="btn-success"> <i className="material-icons icon">&#xE147;</i>  
                        <div>Add New User</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
