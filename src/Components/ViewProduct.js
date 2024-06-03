import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdStar } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import {Row,Col,Button} from 'react-bootstrap';
import add from '../Actions/Action';
import { useDispatch } from 'react-redux';



function ViewProduct() {
    const dispatch = useDispatch()

    const send = (data) => {
        dispatch(add(data))
    }

    const location=useLocation()
    const [data, setData] = useState([])

    useEffect(() => {

        axios.get(`https://fakestoreapi.com/products/${location.state.list.id}`)
            .then((res) => {
                setData(res.data)
            })
    })
console.log(data);
    return ( 
        <>
           <Container>

                <Row>
                    <Col sm={12} md={6} className='p-4'>
                        <img src={data.image} className='img-fluid d-block mb-4' style={{width:"100%", padding:"30px", height:"400px"}}/>
                        <div className='d-flex justify-content-evenly'>
                        <Button className='px-5' onClick={() => send(data)}>Add to cart</Button> <Button variant='danger px-5'onClick={() => send(data)}>Buy now</Button>
                        </div>
                    </Col>
                    <Col sm={12} md={6} className='p-5'>
                        <p className='text-primary mb-5'>{data.category}</p>
                        <h3 className='mb-4'>{data.title}</h3>
                        <p className='text-secondary mb-4 pe-3'>{data.description}</p>
                        <h4 className='mb-4'>Price: ${data.price}</h4>
                        <p>Category: {data.category}</p>
                        <Button variant='success' className='px-5' onClick={() => send(data)} >Add to cart</Button>
                    </Col>
                </Row>
           </Container>
        </>
     );
}

export default ViewProduct;