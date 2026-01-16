import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../redux/slices/cartSlice";

const Notification = () => {
  const dispatch = useDispatch();

  const notification = useSelector(
    (state) => state.cart.notification
  );

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div className="fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50">
      {notification}
    </div>
  );
};

export default Notification;
