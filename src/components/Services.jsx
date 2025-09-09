import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "./BackButton";

function Services() {
  const { id } = useParams(); // current logged-in user
  const [services, setServices] = useState([]);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));

    fetch(`http://localhost:3001/services`)
      .then((res) => res.json())
      .then((data) => setServices(data));

    fetch(`http://localhost:3001/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  // Handle ordering a service
  const handleOrder = (serviceId) => {
    const newOrder = {
      buyerId: id,
      serviceId,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    }).then(() => {
      alert("Order placed successfully!");
    });
  };

  // Handle adding a review
  const handleReview = (serviceId, rating, comment) => {
    const newReview = {
      serviceId,
      buyerId: id,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    fetch("http://localhost:3001/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews([...reviews, data]);
      });
  };

  // Calculate average rating for a service
  const getAverageRating = (serviceId) => {
    const serviceReviews = reviews.filter((r) => r.serviceId === serviceId);
    if (serviceReviews.length === 0) return 0;
    const total = serviceReviews.reduce((sum, r) => sum + r.rating, 0);
    return total / serviceReviews.length;
  };

  // Filter services based on search
  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {user && <BackButton />}
      <div className="content">
        <h1>Available Services</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        {filteredServices.length > 0 ? (
          <ul className="services-list">
            {filteredServices.map((s) => (
              <li key={s.id}>
                <img
                  src={s.image || "https://via.placeholder.com/250"}
                  alt={s.title}
                />
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <p>
                  <strong>KES {s.price}</strong>
                </p>

                {/* Ratings */}
                <div className="rating">
                  {"⭐".repeat(Math.round(getAverageRating(s.id)))}
                  <span>({getAverageRating(s.id).toFixed(1)}/5)</span>
                </div>

                {/* Order Button */}
                <button
                  className="order-btn"
                  onClick={() => handleOrder(s.id)}
                >
                  Order Service
                </button>

                {/* Show Reviews */}
                <div className="reviews">
                  <h4>Reviews</h4>
                  {reviews
                    .filter((r) => r.serviceId === s.id)
                    .map((r) => (
                      <div key={r.id} className="review-card">
                        <p>{"⭐".repeat(r.rating)}</p>
                        <p>{r.comment}</p>
                      </div>
                    ))}

                  {/* Add Review Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const rating = parseInt(e.target.rating.value);
                      const comment = e.target.comment.value;
                      handleReview(s.id, rating, comment);
                      e.target.reset();
                    }}
                  >
                    <select name="rating" required>
                      <option value="">Rate</option>
                      <option value="1">⭐</option>
                      <option value="2">⭐⭐</option>
                      <option value="3">⭐⭐⭐</option>
                      <option value="4">⭐⭐⭐⭐</option>
                      <option value="5">⭐⭐⭐⭐⭐</option>
                    </select>
                    <input
                      type="text"
                      name="comment"
                      placeholder="Leave a comment"
                      required
                    />
                    <button type="submit">Submit Review</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No services found.</p>
        )}
      </div>
    </div>
  );
}

export default Services;