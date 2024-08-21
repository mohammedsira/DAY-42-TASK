import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>URL SHORTENER</h1>
      <p>Please Login or Signup to Continue</p>
      <div className='homePage-buttons'>
        <Link to="/login"><Button className='mx-3' variant="success">Login</Button></Link>
        <h5 className='mt-3 mb-3'>Doesn't have an account?</h5>
        <Link to="/signUp"><Button className='mx-3' variant="success">Sign Up</Button></Link>
      </div>
    </div>
  )
}
