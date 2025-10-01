import { useLoaderData, Navigate } from "react-router-dom";

const Home = () => {
  const myBusiness = useLoaderData();
  // console.log(myBusiness);

  if (myBusiness?.data.length != 0) {
    return <Navigate to="/bussiness/dashboard"></Navigate>;
  }
  return (
    <div>
      <p>In home components!</p>
    </div>
  );
};

export default Home;
