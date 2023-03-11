import { Error500 } from "assets";

const Error = () => {
  return (
    <>
      <img
        src={Error500}
        alt="500 Server Error"
        style={{ width: "100%", height: "auto" }}
      />
    </>
  );
};

export default Error;
