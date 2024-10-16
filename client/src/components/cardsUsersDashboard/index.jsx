import React from "react";
import { Link } from "react-router-dom";
import "./cardsUsersDashboard.modules.css";
import { forgivePaymentByUserId } from "../../redux/actions/payments";
import { unblockUser, blockUser } from "../../redux/actions/users";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const CardsUsersDashboard = ({ allUsers }) => {
  const sortedUsers = allUsers?.sort((a, b) => a.name.localeCompare(b.name));
  const dispatch = useDispatch();

  // Función para copiar texto al portapapeles
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'none', // Removemos el ícono
        title: `${label} copied!`,
        showConfirmButton: false,
        timer: 1000, // Reduce el tiempo de visualización
        width: '200px', // Hacemos la ventana más pequeña
        padding: '5px', // Reducimos el padding
        backdrop: false, // Evita el fondo oscuro
        toast: true, // Usa el estilo tipo toast (sutil)
        customClass: {
          popup: 'small-swal-popup', // Clase CSS personalizada
          title: 'small-swal-title', // Clase para título pequeño
        }
      });
    });
  };
  

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

          <p className="user-info">
            <strong>ID:</strong> {user.auth0Id}{" "}
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(user.auth0Id, "Auth0 ID")}
            >
              Copy ID
            </button>
          </p>

          <p className="user-info">
            <strong>Email:</strong> {user.email}{" "}
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(user.email, "Email")}
            >
              Copy Email
            </button>
          </p>

          <p className="user-info">
            <strong>Payment Status:</strong>{" "}
            <span className={`payment-status ${user.hasPaid ? "paid" : "unpaid"}`}>
              {user.hasPaid ? "Payed up" : "Pending Payment"}
            </span>
          </p>

          <p className="user-info">
            <strong>Blocked Status:</strong>{" "}
            <span className={`block-status ${user.hasBeenBlocked ? "blocked" : "notBlocked"}`}>
              {user.hasBeenBlocked ? "User Blocked" : "Active User"}
            </span>
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
            <button
              className="unblock-btn"
              onClick={() => handleUnblockUser(user.auth0Id)}
            >
              Unblock User
            </button>
          ) : (
            <button
              className="block-btn"
              onClick={() => handleBlockUser(user.auth0Id)}
            >
              Block User
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardsUsersDashboard;
