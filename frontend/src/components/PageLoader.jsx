import { Grid } from "ldrs/react";
import "ldrs/react/Grid.css";

const PageLoader = () => {
  return (
    <div className='text-white h-screen w-screen flex justify-center items-center'>
      <div>
        <Grid size='60' speed='1.5' color='#fff' />
        <h1>Loading...</h1>
      </div>
    </div>
  );
};

export default PageLoader;
