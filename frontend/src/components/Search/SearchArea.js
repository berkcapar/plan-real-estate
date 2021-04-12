import { MinBudgetOption } from "./Budget/BudgetOption";
import { MaxBudgetOption } from "./Budget/BudgetOption";
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
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  SizeDropdown: {
    border: "1px",
  },
  button: {
    width: "20%",
  },
  "@media(max-width:675px)": {
    button: {
      width: "100%",
      margin: "1rem auto",
      border: "1px solid red",
      backgroundColor: "lightseagreen",
    },
  },
});

const SearchArea = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchData = Object.fromEntries(formData.entries());

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
            <MinBudgetOption name="minpriceoption" />
            <MaxBudgetOption name="maxpriceoption" />
          </div>
          <Button
            style={{
              backgroundColor: "lightseagreen",
              color: "black",
              fontWeight: "900",
            }}
            className={classes.button}
            variant="contained"
            type="submit"
          >
            SEARCH
          </Button>
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
