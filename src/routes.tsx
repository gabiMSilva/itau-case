import Home from "./pages/Home";
import { Routes as Switch, Route } from "react-router-dom";
import PropertyStep from "./pages/PropertyStep";
import CoverageStep from "./pages/CoverageStep";

const Routes = () => {  
  return (
    <Switch>
      <Route path="/property" element={<PropertyStep />} />
      <Route path="/coverage" element={<CoverageStep />} />
      <Route path="/" element={<Home />} />
    </Switch>
  );
};

export default Routes;
