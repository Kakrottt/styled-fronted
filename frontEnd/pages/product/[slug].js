import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import { DetailsStyle, ProductInfo, Quantity, Buy } from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";

export default function ProductDetails() {
    const { qty, increaseQty, deccreaseQty, onAdd } = useStateContext();
    //Fetch slug
    const { query } = useRouter();

    //Fetch Graphql data
    const [results] = useQuery({
        query: GET_PRODUCT_QUERY,
        variables: {slug: query.slug},
    });

    const {data, fetching, error} = results;
    //Check for the data coming in
    if(fetching) return <p>Loading...</p>;
    if(error) return <p>Oh No... {error.message}</p>;
    
    //Extract our Data
    
    const {Title, Description, Image} = data.products.data[0].attributes;

    return (
        <DetailsStyle>
            <img src={Image.data.attributes.formats.small.url} alt={Title} />
            <ProductInfo>
                <h3>{Title}</h3>
                <p>{Description}</p>
                <Quantity>
                    <span>Quantity</span>
                    <button onClick={deccreaseQty}><AiFillMinusCircle/></button>
                    <p>{ qty }</p>
                    <button onClick={increaseQty}><AiFillPlusCircle/></button>
                </Quantity>
                <Buy onClick={() => onAdd(data.products.data[0].attributes, qty)}>Add to Cart</Buy>
            </ProductInfo>
        </DetailsStyle>
    );
}