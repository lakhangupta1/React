import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../users/userSlice";

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">ID</th>
            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Name</th>
            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Email</th>
            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-3">{user.id}</td>
              <td className="border border-gray-300 px-4 py-3">{user.name}</td>
              <td className="border border-gray-300 px-4 py-3">{user.email}</td>
              <td className="border border-gray-300 px-4 py-3">
                <button
                  onClick={() => dispatch(deleteUser(user.id))}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded transition-all"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;