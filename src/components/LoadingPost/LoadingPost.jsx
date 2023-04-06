import load from "../../assets/loadingType/Loading_icon.gif";

const LoadingPost = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        zIndex: 100,
      }}
    >
      <div>
        <img
          src={load}
          alt="loading..."
          style={{
            width: "9rem",
            height: "9rem",
          }}
        />
      </div>
    </div>
  );
};

export default LoadingPost;
