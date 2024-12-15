import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddUser() {

    const history = useHistory();
    const [userInput, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        error_list: [],
    });


    const handleInput = (e) => {
        e.persist();
        setUser({...userInput, [e.target.name]: e.target.value })
    }

    const saveUser = (e) => {
        e.preventDefault();
        
        const data = {
            name:userInput.name,
            email:userInput.email,
            password:userInput.password,
            password_confirmation:userInput.password_confirmation,
        }

        axios.post(`/api/add-user`, data).then(res => {

            if(res.data.status === 200)

            {
                swal("Success!",res.data.message,"success");
                setUser({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    error_list: [],
                });
                history.push('/users');
            }
            else if(res.data.status === 422)
            {
                setUser({...userInput, error_list: res.data.validate_err });
            }
        });
    }

    return (

        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add User 
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveUser} >
                                    <div className="form-group mb-3">
                                        <label>User Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={userInput.name} className="form-control" />
                                        <span className="text-danger">{userInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={userInput.email}  className="form-control" />
                                        <span className="text-danger">{userInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="text" name="password" onChange={handleInput} value={userInput.password}  className="form-control" />
                                        <span className="text-danger">{userInput.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Confirm Password</label>
                                        <input type="text" name="password_confirmation" onChange={handleInput} value={userInput.password_confirmation}  className="form-control" />
                                        <span className="text-danger">{userInput.error_list.password_confirmation}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddUser;