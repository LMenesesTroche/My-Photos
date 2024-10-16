import React from "react";
import { Link } from "react-router-dom";
import "./cardsUsersDashboard.modules.css";
import { forgivePaymentByUserId } from "../../redux/actions/payments";
import { unblockUser } from "../../redux/actions/users"; 
import { blockUser } from "../../redux/actions/users"; 
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const CardsUsersDashboard = ({ allUsers }) => {
  const sortedUsers = allUsers?.sort((a, b) => a.name.localeCompare(b.name));
  const dispatch = useDispatch();

  // Función para perdonar el pago
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
        dispatch(forgivePaymentByUserId(auth0Id));
      }
    });
  };

  // Función para bloquear el usuario
  const handleBlockUser = (auth0Id) => {
    Swal.fire({
      title: '¿Bloquear usuario?',
      text: "El usuario será bloqueado y no podrá acceder al sistema.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, bloquear',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(blockUser(auth0Id));

      }
    });
  };

  // Función para desbloquear el usuario
  const handleUnblockUser = (auth0Id) => {
    Swal.fire({
      title: '¿Desbloquear usuario?',
      text: "El usuario podrá acceder al sistema nuevamente.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desbloquear',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(unblockUser(auth0Id));
      }
    });
  };

  return (
    <div className="dashboard-container">
      {sortedUsers?.map((user, index) => (
        <div
          key={user.auth0Id || index}
          className={`card ${user.hasBeenBlocked ? "blocked" : ""}`}
        >
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

          {!user.hasPaid && !user.hasBeenBlocked && (
            <button
              className="forgive-btn"
              onClick={() => forgivePayment(user.auth0Id)}
            >
              Forgive payment
            </button>
          )}

          {user.hasBeenBlocked ? (
            <>
              <p className="blocked-status">User Blocked</p>
              <button
                className="unblock-btn"
                onClick={() => handleUnblockUser(user.auth0Id)}
              >
                Unblock User
              </button>
            </>
          ) : (
            <>
              <p className="blocked-status">Active User</p>
              <button
                className="block-btn"
                onClick={() => handleBlockUser(user.auth0Id)}
              >
                Block User
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardsUsersDashboard;
