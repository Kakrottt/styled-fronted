export const PRODUCT_QUERY = `
query{
    products{
      data{
        attributes{
          Title
          Description
          Price
          slug
          Image {
            data {
              attributes{
                formats
              }
            }
          }
        }
      }
    }
  }
`
export const GET_PRODUCT_QUERY = `
  query GetProduct($slug: String!){
    products(filters: {slug: {eq: $slug}}){
      data{
        attributes{
          Title
          slug
          Description
          Price
          Image{
            data{
              attributes{
                formats
              }
            }
          }
        }
      }
    }
  }
`