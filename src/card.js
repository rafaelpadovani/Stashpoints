import React from 'react';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import './index.css';


export default (props) => {
    return (
      <div>
        <Card className="card">
          <CardBody className="card-container">
            <CardTitle>{props.name}</CardTitle>
            <CardSubtitle>{props.status}</CardSubtitle>
            <CardText>{props.address}</CardText>
            <CardText>{props.description}</CardText>
          </CardBody>
        </Card>
      </div>
    )
}
