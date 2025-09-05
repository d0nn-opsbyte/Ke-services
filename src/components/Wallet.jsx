import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

function Wallet() {
  const { id } = useParams();
  const [wallet, setWallet] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));

    fetch(`http://localhost:3001/wallets?userId=${id}`)
      .then((res) => res.json())
      .then((data) => setWallet(data[0]));
  }, [id]);

  return (
    <div className="layout">
      {user && <Sidebar userId={user.id} role={user.role} />}
      <div className="content">
        <h1>Wallet</h1>
        {wallet ? (
          <p>Your balance: <strong>KES {wallet.balance}</strong></p>
        ) : (
          <p>Loading wallet...</p>
        )}
      </div>
    </div>
  );
}

export default Wallet;