import HighlightCard from "../../HighlightCard/HighlightCard";
import { useDispatch, useSelector } from "react-redux";
import { getPropertiesFromState } from "../../../redux/selectors";
import "./HighlightedArea.css";
import { useEffect } from "react";
import { initProperties } from "../../../redux/reducers/propertyReducer";

const HighlightedArea = () => {
  const properties = useSelector(getPropertiesFromState);
  const dispatch = useDispatch();
  console.log(properties);

  useEffect(() => {
    dispatch(initProperties());
  }, [dispatch]);

  switch (properties.status) {
    case "failure":
      return "error";
    case "loading":
    default:
      return "loading";
    case "success":
      return (
        <div className="ha-container">
          <h1>Discover the Highlighted Properties</h1>
          <div className="highlighted-area">
            {properties.data.slice(0, 3).map((property) => (
              <HighlightCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      );
  }
};

export default HighlightedArea;
