import { ChangeEvent, FC, useState } from "react";
import { Checkbox, Paper, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import clsx from "clsx";

import { CoverageResultType } from "../../../../types/CoverageType";
import useStyles from "./styles";

type CoverageParamsType = {
  coverage: CoverageResultType;
  onChange?: (id: string, value: boolean) => void;
  index: number;
};

const mockInfoCoverages = [
  "Danos Elétricos",
  "Subtração de Bens",
  "Vazamento de Tubuações",
  "Responsabilidade Civil Familiar",
  "Quebra de Vidros",
];

const CoverageItem: FC<CoverageParamsType> = ({
  coverage,
  index,
  onChange,
}: CoverageParamsType) => {
  const [selected, setSelected] = useState<boolean>(false);

  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSelected(checked);
    if (!!onChange) onChange(coverage.id_cobertura, checked);
  };

  return (
    <Paper square className={clsx(classes.paper)}>
      <Box display="flex" alignItems="center" justifyContent="start">
        <Checkbox
          checked={selected}
          classes={{ root: classes.checkbox }}
          onChange={handleChange}
          name={coverage.id_cobertura}
        />
        <Typography fontWeight="bold">
          {mockInfoCoverages[index % mockInfoCoverages.length]}
        </Typography>
      </Box>
      <Typography textAlign="center" fontSize={12} m={theme.spacing(3, 0)}>
        {coverage.texto_franquia}
      </Typography>
      <Typography
        textAlign="center"
        color={theme.palette.primary.main}
        fontWeight="bold"
      >
        {coverage.valor.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </Typography>
    </Paper>
  );
};

export default CoverageItem;
