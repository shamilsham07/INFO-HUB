import React, { useEffect,useState} from "react";
import { logout, authenticate } from "./components/redux/reducer";
import { useDispatch, useSelector } from "react-redux";

export default function Popup() {
  const [show, setshow] = useState(false);
  const opac = setTimeout(() => {
    useSelector((state) => state.auth.setlogout);
  }, 900);
  const dispatch = useDispatch();

  async function logouting() {
    const result = await fetch("http://localhost:8000/logout", {
      method: "POST",
      credentials: "include",
    });
    if (result.status === 200) {
      console.log("you logouted");
      dispatch(logout(false));
      dispatch(authenticate(false));
    } else {
      console.log("something went wrong");
      dispatch(logout(false));
    }
  }
  function cancellogout() {
    dispatch(logout(false));
  }
  useEffect(() => {
    const interval=
    setTimeout(() => {
      if (opac) {
        setshow(true);
      }
    }, 900);

return()=>clearTimeout(interval)
  }, [opac]);

  return (
    <section className="pop-up">
      <div className="pop ">
        <div className="">
          {opac && (
            <div className={`${show?"pop-message":"opacity-0"}`}>
              <button className="close-div" onClick={cancellogout}>
                <i class="bi bi-x-lg"></i>
              </button>
              <div className="pt-2">
                <p className="m-0 content-logout">
                  {" "}
                  Are you sure about logout?
                </p>
              </div>
              <div className="d-flex gap-3 pt-2 pop-btn">
                <button id="log-1" onClick={cancellogout}>
                  cancel
                </button>
                <button id="log-2" onClick={logouting}>
                  confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
