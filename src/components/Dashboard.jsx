import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import Pagination from "./Pagination";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
} from "@mui/material";
import { auth } from "./firebase";

const Dashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await axios.post(
          "https://7q3k6vhat1.execute-api.ap-south-1.amazonaws.com/dev/profile",
          {
            count: 150,
            country_code: "en_IN",
            aadhar: true,
            dl: true,
            credit: true,
            debit: true,
            pan: true,
            passport: true,
            ssn: false,
          }
        );
        const creditCardResponse = await axios.post(
          "https://7q3k6vhat1.execute-api.ap-south-1.amazonaws.com/dev/card/credit",
          {
            count: 250,
            country_code: "en_IN",
          }
        );
        setProfiles(profileResponse.data.data);
        setCreditCards(creditCardResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProfiles = profiles.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography>☰</Typography>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: "center" }}>
            Dashboard
          </Typography>
          <div color="inherit" onClick={handleLogout}>
            Logout
          </div>
        </Toolbar>
      </AppBar>
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Table data={currentProfiles} />
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={profiles.length}
              paginate={paginate}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
