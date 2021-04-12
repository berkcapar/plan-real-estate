import { Link } from "react-router-dom";
import "./HighlightCard.css";
import Box from "@material-ui/core/Box";
import SquareFootIcon from "@material-ui/icons/SquareFoot";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

const HighlightCard = ({ property }) => {
  return (
    <div className="highlight-card">
      <Link
        style={{ textDecoration: "none" }}
        to={`/properties/${property.id}`}
      >
        <div className="highlightcard-textbox">
          <div className="">
            <img alt="property" src={property.photos[0]} />
            <Box paddingLeft="1rem">
              <h3>{property.title}</h3>
              <h3>{property.city}</h3>
              <p>€{property.price}</p>
              <SquareFootIcon /> <p>{property.m2}</p>
            </Box>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HighlightCard;
