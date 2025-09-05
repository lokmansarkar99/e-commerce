import axios from 'axios'
import { useEffect, useState } from 'react'



const Products = () => {

const [product, setProduct] = useState([])

const getProduct = async () => {
    try {
        const res  =await axios.get("http://localhost:3000/api/product")
        console.log(res.data.products)
        setProduct(res.data.products)
    } catch (error) {
        console.log(error)
    }
    

}

useEffect(() => {
getProduct()

} , [])


  return (
    <div>Products

{
    <h1>Name  
    
    {product.map((p) => {
     return <div key={p.id}>

        <p>Name : { p.name }</p>
        <br />
        Image
        <img src= {p.image} alt="" />
     </div>
    })}
     </h1>
}

    </div>
  )
}

export default Products