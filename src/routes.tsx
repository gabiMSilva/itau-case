import Home from "./pages/Home";
import { Routes as Switch, Route } from "react-router-dom";
import PropertyStep from "./pages/PropertyStep";
import CoverageStep from "./pages/CoverageStep";
import ProfileStep from "./pages/ProfileStep";
import ResultStep from "./pages/ResultStep";

const Routes = () => {
  return (
    <Switch>
      <Route path="/profile" element={<ProfileStep />} />
      <Route path="/property" element={<PropertyStep />} />
      <Route path="/coverage" element={<CoverageStep />} />
      <Route path="/result" element={<ResultStep />} />
      <Route path="/" element={<Home />} />
    </Switch>
  );
};

export default Routes;
