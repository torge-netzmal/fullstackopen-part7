import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 underline text-gray-700">Users</h1>
      <table className="min-w-full text-left text-sm">
        <tbody className={"divide-y divide-slate-200"}>
          <tr key="userlistheader">
            <th className={"px-4 py-3 font-medium"}></th>
            <th className={"px-4 py-3 font-medium"}>
              <b>blogs created</b>
            </th>
          </tr>
          {users.map((user) => (
            <tr className={"odd:bg-white even:bg-slate-50"} key={user.id}>
              <td className={"px-4 py-3 font-medium text-slate-900"}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td className={"px-4 py-3 text-slate-700"}>
                {user.blogs.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserList;
