import { useEffect } from "react";
import { getAllUsers } from "../../redux/actions/users";
import { useDispatch, useSelector } from "react-redux";
import AllUsersCards from "../../components/cardsFromAllUsers";

const AllUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  console.log(allUsers);
  return (
    <div>
      <h1>Aqui van todos los usuarios</h1>
      <AllUsersCards allUsers={allUsers}/>
    </div>
  );
};

export default AllUsers;
