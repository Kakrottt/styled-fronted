import { ProductStyle } from "../styles/ProductStyle";
import Link from "next/link";


export default function Product({ product }) {
    //Extract the info from props
    const {Title, Price, Image, slug} = product.attributes;
    return (
        <ProductStyle>
            <Link href={`/product/${slug}`}>
                <div>
                    <img src={Image.data.attributes.formats.small.url} alt="" />
                </div>
            </Link>
            <h2>{Title}</h2>
            <h3>₹ {Price}</h3>
        </ProductStyle>
    )
}
