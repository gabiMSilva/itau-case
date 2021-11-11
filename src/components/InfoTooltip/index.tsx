import { FC, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

type InfoTooltipParamsType = {
  info: string;
  color?:
    | "info"
    | "secondary"
    | "inherit"
    | "default"
    | "primary"
    | "error"
    | "success"
    | "warning";
};

const InfoTooltip: FC<InfoTooltipParamsType> = ({
  info,
  color = "secondary",
}: InfoTooltipParamsType) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Tooltip
      title={info}
      open={showTooltip}
      onOpen={() => setShowTooltip(true)}
      onClose={() => setShowTooltip(false)}
      data-testid="tooltip"
    >
      <IconButton data-testid="action-btn" color={color} onClick={() => setShowTooltip(true)}>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default InfoTooltip;
