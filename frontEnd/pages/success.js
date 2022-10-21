import { useRouter } from "next/router";
import Image from "next/image";
import vader from "../public/vader.png";
import styled from "styled-components";

const { motion } = require("framer-motion");

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );
  return { props: { order } };
}

export default function Success({ order }) {
  const route = useRouter();

  return (
    <Wrapper>
      <FullCard>
        <div>
          <h1>Thank You for your Order!</h1>
          <h2>A confirmation mail has been sent to</h2>
          <h2>
            <em>{order.customer_details.email}</em>
          </h2>
        </div>
        <InfoWrapper>
          <Address>
            <h3>Address</h3>
            {Object.entries(order.customer_details.address).map(
              ([key, val]) => (
                <p key={key}>
                  {key} : {val}
                </p>
              )
            )}
          </Address>
          <OrderInfo>
            <h3>Products</h3>
            {order.line_items.data.map((item) => (
              <div key={item.id}>
                <p>Product: {item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price.unit_amount}</p>
              </div>
            ))}
          </OrderInfo>
          <ImageButton>
            <Image src={vader} alt="vader-approves" />
            <button onClick={() => route.push("/")}>Continue Shopping</button>
          </ImageButton>
        </InfoWrapper>
      </FullCard>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 5rem 5rem;
`;

const FullCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  background: white;
  border-radius: 2rem;
  padding: 5rem 10rem;
  h2 {
    font-size: 1.5rem;
    font-weight: 200;
    margin-bottom: 1rem 0rem;
  }
  h1 {
    font-size: 2rem;
  }
  button {
    color: white;
    background: var(--primary);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
`;

const Address = styled.div`
  font-size: 1rem;
  width: 100%;
`;

const OrderInfo = styled.div`
  font-size: 1rem;
  width: 100%;
  div {
    padding-bottom: 1rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* width: 100%; */
  margin: 2rem 0rem;
`;

const ImageButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
