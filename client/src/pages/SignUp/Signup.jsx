import { useState } from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import AuthService from '../../actions/auth';
import {signup} from '../../api/index'


const Signup = () => {
    const [fn, setFN] = useState('');
    const [ln, setLN] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPW] = useState('');
    const [showAlert, setShowAlert] = useState('');
    
    return(
        <Form>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control 
            type="firstName" 
            placeholder="Enter first name" 
            onChange={(e)=>{setFN(e.targetValue)}}
            required
            />
            <Form.Control.Feedback type='invalid'>Required</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last name</Form.Label >
            <Form.Control 
            type="lastName" 
            placeholder="Enter last name" 
            onChange={(e)=>{setLN(e.targetValue)}}
            required
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
            type="email" 
            placeholder="Enter email" 
            onChange={(e)=>{setEmail(e.targetValue)}}
            // value={formData.email}
            required
            />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Password" 
            onChange={(e)=>{setPW(e.targetValue)}}
            // value={formData.password}
            required
            />
        </Form.Group>

        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    )
}

export default Signup