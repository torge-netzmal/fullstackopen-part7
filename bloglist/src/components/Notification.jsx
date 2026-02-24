import { useSelector } from "react-redux";

const Notification = ({ notificationType }) => {
  const notification = useSelector(
    (state) => state.notification[notificationType],
  );
  return notification && <div className={notificationType}>{notification}</div>;
};

export default Notification;
