import React from "react";
import { Link } from "react-router-dom";
import MyImage from '../Assets/check.png'

const AccountCreated = () => {
    return (
        <div className="d-flex flex-column">
            <h1 className="display-6 text-center"><b>Account Created Successfully</b><img style={{ width: "45px", height: "45px", marginLeft: '8px' }} src={MyImage} alt='login'></img></h1>
            <p className="text-center"></p>
            <Link className="text-center mt-4" to="/login">
                <button variant='info' type="submit" className="btn btn-info">
                    Login to Continue
                </button>
            </Link>
        </div>
    );
};

export default AccountCreated;