// Import everything needed to use the `useQuery` hook
import { gql, useQuery } from "@apollo/client";

const GET_ALL_BOOKS = gql`
  query getBooks {
    getBooks {
      _id
      name
      author
      price
    }
  }
`;

const DisplayData = () => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error : {error.message}</p>;
  // if (data) return console.log(data.getBooks);
  return data?.getBooks?.map(({ _id, name, author, price }) => (
    <div key={_id}>
      <h3>{name}</h3>
      <br />
      <b>About this Book:</b>
      <p>{author}</p>
      <p>{price}</p>
      <br />
    </div>
  ));
};

export default DisplayData;
