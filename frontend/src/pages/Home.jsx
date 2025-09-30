import { useLoaderData, Navigate } from "react-router-dom";

const Home = () => {
  const myBusiness = useLoaderData();

  if (myBusiness) {
    return <Navigate to="/bussiness/dashboard"></Navigate>;
  }
  return (
    <div>
      <p>In home components!</p>
    </div>
  );
};

export default Home;
