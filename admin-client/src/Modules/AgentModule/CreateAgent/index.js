import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Card} from "react-bootstrap";
import './index.css'

export function CreateAgent({handleChange ,handleSubmit}) {
    return (<>
            <div className={'container'}>
                <div>
                    <Card body style={{background: '#db7a69'}}>Please enter the details carefully</Card>
                    <Form onSubmit={(e)=>handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={handleChange} type="text" name={'uname'} placeholder="Enter name"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={handleChange} type="email" name={'username'}
                                          placeholder="Enter email"/>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={handleChange} type="password" name={'password'}
                                          placeholder="Password"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out"/>
                        </Form.Group>
                        <Button  style={{background: '#db7a69'}} id={'dropdown-basic'} type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
}
