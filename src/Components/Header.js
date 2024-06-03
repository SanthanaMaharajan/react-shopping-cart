import React, { useEffect, useState } from 'react';
import { remove } from '../Actions/Action';
import { removeOne } from '../Actions/Action';
import add from '../Actions/Action';

//Routing
import { Link } from 'react-router-dom';

//material ui
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'

//icons
import { HiShoppingCart, HiTrash } from "react-icons/hi";

//Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';

function Header() {

    const {cart}= useSelector(state=>state.updateCart)
    const dispatch=useDispatch()

    const [total,setTotal]=useState(0)

    const getTotal=()=>{
        let price=0
        cart.map((product)=>{
            return(

                price=product.price*product.rating.count+price
            )
        })
        setTotal(price)
    }

    useEffect(()=>{
        getTotal()
    })


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand> Online Shopping</Navbar.Brand>
                    <Nav >
                        <Link to="/" className='text-light text-decoration-none px-4'>Home</Link>
                        <Link to="/" className='text-light text-decoration-none px-4'>Products</Link>
                        <Link className='text-light text-decoration-none px-4'>
                            <Badge badgeContent={cart.length} color="secondary" >
                                <HiShoppingCart color="action" className='fs-4' onClick={handleClick} />
                            </Badge>
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>

                    {
                        cart.length === 0 ? <div>Your cart is empty</div> :
                    <Table striped bordered  style={{width:"45rem"}}>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Product</th>
                                <th>Details</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((product,index)=>{
                                    return(
                                        <tr key={index+1}>
                                            <td>{index+1}</td>
                                            <td><img src={product.image} style={{height:"100px"}} alt=''/></td>
                                            <td className='fs-6'>
                                                <p>{product.title}</p>
                                                <p>Price: $ {product.price}</p>
                                                <p>Rating: $ {product.rating.rate}</p>
                                                <p className='border border-1 border-dark d-inline-block'>
                                                    <span className='ps-2'onClick={product.rating.count ===1 ? ()=>dispatch(remove(product)):()=>dispatch(removeOne(product))}>-</span>
                                                    <span className='p-3'>{product.rating.count}</span>
                                                    <span className='pe-2' onClick={()=>dispatch(add(product))}>+</span>
                                                </p>
                                            </td>
                                            <td className='text-center text-danger fs-3'><HiTrash onClick={()=>dispatch(remove(product))}/></td>
                                        </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                        <tfoot>
                            <div>Total: $ {total}</div>
                        </tfoot>
                    </Table>
                    }
                </MenuItem>
            </Menu>
        </>
    );
}

export default Header;