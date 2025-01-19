const Box = ({ children, className, style, ...otherProps }) => {
    return (
      <div style={{

    width: "300px",
    height: "300px",
    background: "transparent",
    borderRadius: "20px",
    border: "2px solid rgba(255, 255, 255, 0.5)",
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "top",
    alignItems: "center",
    backdropFilter: "blur(15px)",
    overflow: "hidden",
    boxShadow: "0 0 30px rgba(0, 0, 0, 0.5)",

      }} 
         
      >

    {children}

      </div>
    );
  };
  
  export default Box;