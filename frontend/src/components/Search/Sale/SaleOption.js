import { purchaseDropdownItems } from "../DropdownItems";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  form: {
    backgroundColor: "white",
    width: "98%",
    border: "1px solid black",
    borderTopLeftRadius: "1rem",
    borderBottomLeftRadius: "1rem",
  },
});

const SaleOption = ({ name }) => {
  const classes = useStyles();

  return (
    <FormControl
      className={classes.form}
      variant="filled"
      InputProps={{ disableUnderline: true }}
    >
      <InputLabel>Option</InputLabel>
      <Select style={{}} name={name}>
        {purchaseDropdownItems.map((option) => (
          <MenuItem value={option.purchaseoption}>
            {option.purchaseoptionname}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SaleOption;
