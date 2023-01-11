
import React from 'react';
import axios from 'axios';

import Stack from '@mui/material/Stack';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


class Cart extends React.Component {

    constructor(){
        super()
        
        // print(response)
        this.state = {orders: []};
    }

    async componentDidMount() {
        const response = await axios.get("http://localhost:5000/orders")
        this.setState({orders: response['data']['orders']})
    }
    render() {   
        // console.log(this.state)            
        return (
          <div className="App">
              Orders            
            <Stack alignItems="center">
            {this.state.orders.map((order, index) => {
                const order_id = order[0]
                const order_list = JSON.parse(order[1])
                let total_price = 0
                order_list.forEach(function (item, index) {
                    total_price += item['extracted_price']
                });
                return (
                <div key={index} style={{
                    'paddingTop': '10px',
                }}>
                    <Card  sx={{ maxWidth: 200 }}>
                    <CardContent>
                        <Typography gutterBottom variant="body5" component="div">
                            Order Id: {order_id}  
                        </Typography>      
                    </CardContent>                  
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="100"
                        image={order_list[0]['thumbnail']}
                        />
                        <CardContent>
                        <Typography variant="body3" color="text.secondary">
                            Total Price: ${total_price}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
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