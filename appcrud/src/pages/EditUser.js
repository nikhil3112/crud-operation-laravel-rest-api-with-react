import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditUser(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [userInput, setUser] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {
        
        //const user_id = props.match.params.id;
        axios.get(`/api/edit-user/`+props.match.params.id).then( res => {

            if(res.data.status === 200)
            {
                //console.log('user::',res.data.user);
                setUser(res.data.user);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/users');
            }
        });

    }, [history]);

    const handleInput = (e) => {
        e.persist();
        setUser({...userInput, [e.target.name]: e.target.value });
    }

    const updateUser = (e) => {
        e.preventDefault();
        
        //const user_id = props.match.params.id;
        // const data = userInput;
        const data = {
            name: userInput.name,
            email: userInput.email,
        }

        axios.put(`/api/update-user/`+props.match.params.id, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/users');
            }
            else if(res.data.status === 422)
            {
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/users');
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Edit User Data...</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Users 
                                    <Link to={'/users'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateUser} >
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={userInput.name} className="form-control" />
                                        <span className="text-danger">{errorInput.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={userInput.email}  className="form-control" />
                                        <span className="text-danger">{errorInput.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update</button>
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

export default EditUser;
