import React, { useEffect, useState } from 'react'

//Bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

//Action
import add from '../Actions/Action';

//Api fetching
import axios from 'axios'

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Products() {
    const navigate=useNavigate()

    const viewProduct=(list)=>{
        navigate('/viewproduct',{state:{list}})
    }
    const { cart } = useSelector(state => state.updateCart)
    const dispatch = useDispatch()

    const send = (list) => {
        dispatch(add(list))
    }

    const [data, setData] = useState([])

    useEffect(() => {

        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setData(res.data)
            })
    }, [])

    return (
        <>
            <Container>
                <h2>Product Page</h2>

                <div className='row d-flex flex-wrap gap-5'>

                    {
                        data && data.map((list) => {
                            return (

                                <Card key={list.id} style={{ width: '21%' }}  className='p-2' >
                                    <Card.Img variant="top" src={list.image} onClick={()=>viewProduct(list)} style={{ width: '100%', height: "230px" }} />
                                    <Card.Body>
                                        <Card.Title>{list.title}</Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Price: ${list.price}</ListGroup.Item>
                                        <ListGroup.Item>Rating: {list.rating.rate}</ListGroup.Item>
                                        <ListGroup.Item>Category: {list.category}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body>
                                        <Button variant="primary" onClick={() => send(list)}>Add to cart</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </div>
            </Container>


        </>
    );
}

export default Products;