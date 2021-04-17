import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminPanel from "./components/Admin/AdminPanel";
import AdminPanelForm from "./components/Admin/AdminPanelForm";
import AllPropertiesList from "./components/SeeAll/AllPropertiesList";
import HomePage from "./components/pages/HomePage";
import AdminPanelAllPropertiesList from "./components/Admin/AdminPanelAllPropertiesList";
import AdminPanelPropertyPage from "./components/pages/AdminPanelPropertyPage";
import SearchResults from "./components/pages/SearchResults";
import Navigation from "./components/Navigation/Navigation";
import PropertyDetail from "./components/pages/PropertyDetail/PropertyDetail";
import MakeaWish from "./components/pages/MakeaWish";
import PropertyDetailContainer from "./components/pages/PropertyDetail/PropertyDetail";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Navigation />
          <HomePage />
        </Route>
        <Route path="/makeawish">
          <Navigation />
          <MakeaWish />
        </Route>
        <Route path="/adminpanellogin">
          <div>
            <AdminPanel />
          </div>
        </Route>
        <Route path="/adminpanelform">
          <div>
            <AdminPanelForm />
          </div>
        </Route>
        <Route path="/adminpanel-allproperties/:id">
          <div>
            <AdminPanelPropertyPage />
          </div>
        </Route>
        <Route path="/adminpanel-allproperties">
          <div>
            <AdminPanelAllPropertiesList />
          </div>
        </Route>
        <Route path="/showallproperties">
          <div>
            <Navigation />
            <AllPropertiesList />
          </div>
        </Route>
        <Route path="/searchresults">
          <div>
            <Navigation />
            <SearchResults />
          </div>
        </Route>
        <Route path="/properties/:id">
          <div className="test">
            <Navigation />
            <div className="property-detail-container">
              <PropertyDetailContainer />
            </div>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
