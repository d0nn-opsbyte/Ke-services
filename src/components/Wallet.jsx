import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "./BackButton";
import axios from "axios";

function Wallet() {
  const { id } = useParams();
  const [wallet, setWallet] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user and wallet info
  useEffect(() => {
    fetch(`http://localhost:3001/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));

    fetch(`http://localhost:3001/wallets?userId=${id}`)
      .then((res) => res.json())
      .then((data) => setWallet(data[0]));
  }, [id]);

  // Handle deposit via M-Pesa (calls backend /stk_push)
  const handleDeposit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3000/stk_push", {
        phoneNumber: "2547XXXXXXXX", // <-- Replace with buyer's phone
        amount: 100, // Example deposit
        userId: id,
      });

      setMessage("STK Push sent! Check your phone to complete payment.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to send STK Push. Try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      {user && <BackButton />}
      <div className="content">
        <h1>Wallet</h1>
        {wallet ? (
          <>
            <p>
              Your balance: <strong>KES {wallet.balance}</strong>
            </p>
            <button onClick={handleDeposit} disabled={loading}>
              {loading ? "Processing..." : "Deposit via M-Pesa"}
            </button>
            {message && <p>{message}</p>}
          </>
        ) : (
          <p>Loading wallet...</p>
        )}
      </div>
    </div>
  );
}

export default Wallet;