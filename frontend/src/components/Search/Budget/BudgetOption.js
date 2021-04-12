import { minpriceDropdownItems, maxpriceDropdownItems } from "../DropdownItems";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formmin: {
    backgroundColor: "white",
    width: "48%",
    border: "1px solid black",
    borderRadius: "0.125rem",
  },
  formmax: {
    backgroundColor: "white",
    width: "48%",
    border: "1px solid black",
    borderTopRightRadius: "1rem",
    borderBottomRightRadius: "1rem",
  },
  "@media(max-width:675px)": {
    formmin: {
      width: "49%",
    },
    formmax: {
      width: "51%",
    },
  },
});

export const MinBudgetOption = ({ name }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formmin} variant="filled">
      <InputLabel>Min Budget</InputLabel>
      <Select name={name}>
        {minpriceDropdownItems.map((option) => (
          <MenuItem value={option.minpriceoption}>
            {option.minpriceoptionname}€
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export const MaxBudgetOption = ({ name }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formmax} variant="filled">
      <InputLabel>Max Budget</InputLabel>
      <Select name={name}>
        {maxpriceDropdownItems.map((option) => (
          <MenuItem value={option.maxpriceoption}>
            {option.maxpriceoptionname}€
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
