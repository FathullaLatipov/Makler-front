import load from "../../assets/loadingType/Loading_icon.gif";

const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <img
        src={load}
        alt="loading..."
        style={{
          width: "9rem",
          height: "9rem",
        }}
      />
    </div>
  );
};

export default Loading;
