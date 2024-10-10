import React from "react";
import { Link } from "react-router-dom";
import "./cardsUsersDashboard.modules.css";
import { forgivePaymentByUserId } from "../../redux/actions/payments";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2"; // Importa SweetAlert2

const CardsUsersDashboard = ({ allUsers }) => {
  const sortedUsers = allUsers?.sort((a, b) => a.name.localeCompare(b.name));
  const dispatch = useDispatch();

  // Función para "perdonar" el pago
  const forgivePayment = (auth0Id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, perdonar pago',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma, se despacha la acción para perdonar el pago
        dispatch(forgivePaymentByUserId(auth0Id));
      }
    });
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
            {user.hasPaid ? "Payed up" : "Pending Payment"}
          </p>

          {!user.hasPaid && (
            <button
              className="forgive-btn"
              onClick={() => forgivePayment(user.auth0Id)}
            >
              Forgive payment
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardsUsersDashboard;
