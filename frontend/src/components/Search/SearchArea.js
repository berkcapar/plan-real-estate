import BudgetOption from "./Budget/BudgetOption";
import HomeOption from "./Home/HomeOption";
import LocationDropdown from "./Location/LocationDropdown";
import RoomDropdown from "./Room/RoomDropdown";
import SaleOption from "./Sale/SaleOption";
import SizeDropdown from "./Size/SizeDropdown";
import { useDispatch } from "react-redux";
import { searchProperty } from "../../redux/reducers/propertyReducer";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  SizeDropdown: {
    border: "1px",
  },
});

const SearchArea = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchData = new FormData(event.target);

    try {
      dispatch(searchProperty(searchData));
      history.push("/searchresults");
    } catch (error) {}
  };

  return (
    <div className="searchformarea">
      <h3 className="searchformareatitle">Find Your Cozy Place</h3>
      <form onSubmit={handleSearch} className="searchform">
        <div className="searchform-first">
          <div className="searchform-sale-location-home">
            <div className="all-options">
              <SaleOption name="option" />
            </div>
            <div className="all-options">
              <LocationDropdown name="city" />
            </div>
            <div className="all-options">
              <HomeOption name="propertyType" />
            </div>
          </div>
          <div className="all-options">
            <BudgetOption name="price" />
          </div>
          <button className="searchbutton" type="submit">
            SEARCH{" "}
          </button>
        </div>

        <Box display="flex" justifyContent="space-between" marginTop="1rem">
          <Box display="flex" width="80%">
            <RoomDropdown name="roomnumber" />
            <SizeDropdown className={classes.SizeDropdown} name="m2" />
          </Box>
          <Link to="/showallproperties" style={{ textDecoration: "none" }}>
            <Typography style={{ color: "white" }} variant="h6">
              See All
            </Typography>{" "}
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default SearchArea;
