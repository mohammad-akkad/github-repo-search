import React, { useState } from "react";
import Modal from "react-modal";

const TokenModal = (props: any) => {
  Modal.setAppElement("#root")
  const [token, setToken] = useState("");
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

  const handleTokenInput = () => {
    setIsTokenModalOpen(true);
  };

  const handleTokenSubmit = () => {
    props.setTokenHandler(token)
    setIsTokenModalOpen(false);
  };

  return (
    <div style={{ marginTop: "1%" }}>
      <span>This website is using Github API V4 and personal token is required for any query </span>
      <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token">for more information</a>
      <button style={{ marginLeft: "2%" }} onClick={handleTokenInput}>Enter Token</button>
      <Modal
        isOpen={isTokenModalOpen}
        onRequestClose={() => setIsTokenModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)",
            maxWidth: "500px",
            width: "100%",
          },
        }}
      >
        <h2>Enter your GitHub personal access token:</h2>
        <input type="text" style={{ marginRight: "5%", padding: "2%" }} value={token} onChange={(event) => setToken(event.target.value)} />
        <button onClick={handleTokenSubmit}>Submit</button>
      </Modal>
    </div>
  );
};

export default TokenModal;


