import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';


export default () => {
    return (
        <Form>
            <FormGroup>
                <Input type="text" name="search" placeholder="Try 'London', 'Paris', 'Rome'" />
            </FormGroup>
            <Button>Find Luggage Storage</Button>
        </Form>
    )
}