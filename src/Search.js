import './App.css';

import TextField from '@mui/material/TextField';
import React from 'react';
import axios from 'axios';

import Stack from '@mui/material/Stack';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
axios.defaults.headers.get['Access-Control-Allow-Orign-Type'] = '*';

class Seach extends React.Component {
  constructor(){
    super()
    // localStorage.removeItem('Cart')
    this.state = {search: "", shopping_results: [], cart: []};
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(item) {
    let cart = localStorage.getItem('Cart')
    
    if(cart){
      cart = JSON.parse(cart)
      cart.push(item)
      localStorage.setItem('Cart', JSON.stringify(cart))
    }else{
      localStorage.setItem('Cart', JSON.stringify([item]))
    }

    this.setState({cart: cart})
  }

  async handleSearch() {
    const { search } = this.state
    const response = await axios.get("http://localhost:5000/product", {
      params: {
        'product': search
      }
    })
    const data = response['data']
    this.setState({shopping_results: data['shopping_results']})
  }

  update(field){
    return e => (
      this.setState({[field]: e.currentTarget.value})
    );
  }

  render() {    
    let cart = localStorage.getItem('Cart')
    return (
      <div className="App">
          <TextField label="Filled" onChange={this.update("search")} variant="standard" />
          <div className='search-button'>
            <Button variant="contained" onClick={this.handleSearch}>Search</Button>
          </div>
          <Stack alignItems="center">
            {this.state.shopping_results.map((item, index) => {
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
                      <Button size="small" color="primary" onClick={() => this.handleAdd(item)}>
                        Add
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

export default Seach;