import { useNavigate, useParams } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <button 
      className="back-btn"
      onClick={() => navigate(`/dashboard/${id}`)}
    >
      ⬅ Back to Dashboard
    </button>
  );
}

export default BackButton;