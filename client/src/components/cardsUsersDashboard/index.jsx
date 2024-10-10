import React from "react";
import { Link } from "react-router-dom";
import "./cardsUsersDashboard.modules.css"; // Asegúrate de tener este archivo de CSS.
import { forgivePaymentByUserId } from "../../redux/actions/payments";
import { useDispatch } from "react-redux";

const CardsUsersDashboard = ({ allUsers }) => {
  const sortedUsers = allUsers?.sort((a, b) => a.name.localeCompare(b.name));
  const dispatch = useDispatch();

  // Función para "perdonar" el pago
  const forgivePayment = (auth0Id) => {
    console.log(`Perdonar pago para el usuario con ID: ${auth0Id}`);
    dispatch(forgivePaymentByUserId(auth0Id));
  };

  return (
    <div className="dashboard-container">
      {sortedUsers?.map((user, index) => (
        <div key={user.auth0Id || index} className="card">
          <Link to={`/profile/${user.auth0Id}`} className="profile-link">
            <img
              src={user.picture}
              alt={`${user.name}'s profile`}
              className="profile-img"
            />
            <h2 className="user-name">{user.name}</h2>
          </Link>

          <p className={`payment-status ${user.hasPaid ? "paid" : "unpaid"}`}>
            {user.hasPaid ? "Pagado" : "Pendiente de Pago"}
          </p>

          {!user.hasPaid && (
            <button
              className="forgive-btn"
              onClick={() => forgivePayment(user.auth0Id)}
            >
              Perdonar Pago
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardsUsersDashboard;
