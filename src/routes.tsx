import Home from "./pages/Home";
import { Routes as Switch, Route } from "react-router-dom";
import PropertyStep from "./pages/PropertyStep";

const Routes = () => {
  return (
    <Switch>
      <Route path="/property" element={<PropertyStep />} />
      <Route path="/" element={<Home />} />
    </Switch>
  );
};

export default Routes;
