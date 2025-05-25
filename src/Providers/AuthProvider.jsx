import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
  }

  const loginUser = async (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password).then((result) => {
        const user = result?.user;
        console.log("User",user);
        user && Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Login",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  const logOut = () => {
    setLoading(true);
    signOut(auth).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logout Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        loading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        console.log("Current User", currentUser);
        setLoading(false)
    })

    return ()=> {return unsubscribe};
  },)

  const authInfo = { user, loading, setLoading, createUser, loginUser, logOut };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
