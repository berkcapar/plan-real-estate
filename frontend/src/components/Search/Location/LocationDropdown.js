import { locationDropdownItems } from "../DropdownItems";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  form: {
    backgroundColor: "white",
    width: "98%",
    border: "1px solid black",
    borderRadius: "0.125rem",
  },
}));

function getStyles(option, locationList, theme) {
  return {
    fontWeight:
      locationList.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const LocationDropdown = ({ name }) => {
  const classes = useStyles();
  const [locationList, setLocationList] = useState([]);
  const theme = useTheme();

  const handleChange = (event) => {
    setLocationList(event.target.value);
  };

  return (
    <FormControl className={classes.form} variant="filled">
      <InputLabel>Location</InputLabel>
      <Select value={locationList} multiple onChange={handleChange} name={name}>
        {locationDropdownItems.map((option) => (
          <MenuItem
            style={getStyles(option, locationList, theme)}
            value={option.location}
          >
            {option.locationname}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LocationDropdown;
