import { userLogin, userRegister } from "../features/auth/authAction";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!email || !password) {
      return alert("Please provide all fields");
    }
    console.log("login", e, email, password, role);
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};
export const handelRegister = (
  e,
  name,
  role,
  email,
  password,
  organizationName,
  website,
  address,
  phone,
  hospitalName
) => {
  try {
    e.preventDefault();
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        organizationName,
        website,
        address,
        phone,
        hospitalName,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
