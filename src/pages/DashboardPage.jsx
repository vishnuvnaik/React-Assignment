import Dashboard from "../components/Dashboard";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  },[]);
  return <div>{userDetails ? <Dashboard /> : null}</div>;
};

export default DashboardPage;
