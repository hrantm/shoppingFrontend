
import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

class Cart extends React.Component {

    constructor(){
        super()
        let cart = localStorage.getItem('Cart')
        if(cart){
            cart = JSON.parse(cart)
        }else{
            cart = []
        }
        this.state = {cart: cart};        
        this.handleRemove = this.handleRemove.bind(this);
        this.createOrder = this.createOrder.bind(this);
    }

    handleRemove(index){
        this.setState({
            cart: this.state.cart.filter((_, i) => i !== index)
        }, () => {
            localStorage.setItem('Cart', JSON.stringify(this.state.cart));
        });
        
    }

    async createOrder(){
        const response = await axios.post("http://localhost:5000/order", {
            params: {
              'order': this.state.cart
            }
          })
        this.setState({cart: []}, () => {
            localStorage.removeItem('Cart');
        })       
        
        console.log(response)
    }

    render() { 
        let cart = localStorage.getItem('Cart')
        return (
          <div className="App">
            <Button size="small" color="primary" onClick={this.createOrder}>
                Create Order
            </Button>              
            <Stack alignItems="center">
            {this.state.cart.map((item, index) => {
                return (
                <div key={index} style={{
                    'paddingTop': '10px',
                }}>
                    <Card  sx={{ maxWidth: 200 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="100"
                        image={item['thumbnail']}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h8" component="div">
                            {item['price']}  
                        </Typography>
                        <Typography variant="body5" color="text.secondary">
                            {item['title']}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => this.handleRemove(index)}>
                        Remove
                        </Button>
                    </CardActions>
                </Card>      
                </div>          
                )
            })}            
            </Stack>
         </div>    
        )
      }    
    
}

export default Cart;