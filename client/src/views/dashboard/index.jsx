import React from "react";
import "./dashboard.modules.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../redux/actions/users";
import CardsUsersDashboard from "../../components/cardsUsersDashboard";

export default function Dashboard() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="container">
      <h1>This is the dashboard</h1>      
      <CardsUsersDashboard allUsers={allUsers} />
    </div>
  );
}
