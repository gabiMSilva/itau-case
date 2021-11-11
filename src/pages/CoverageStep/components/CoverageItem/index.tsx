import { ChangeEvent, FC, useState } from "react";
import { Checkbox, Paper, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import clsx from "clsx";

import { CoverageType } from "../../../../types/CoverageType";
import { InfoTooltip } from "../../../../components";
import useStyles from "./styles";

type CoverageParamsType = {
  coverage: CoverageType;
  onChange?: (id: string, value: boolean) => void;
};

const CoverageItem: FC<CoverageParamsType> = ({
  coverage,
  onChange,
}: CoverageParamsType) => {
  const [selected, setSelected] = useState<boolean>(
    coverage.cobertura_obrigatoria
  );

  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (coverage.cobertura_obrigatoria) return;

    const checked = event.target.checked;
    setSelected(checked);
    if (!!onChange) onChange(coverage.id_cobertura, checked);
  };

  return (
    <Paper square className={clsx(classes.paper)}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="start"
      >
        <Checkbox
          checked={selected}
          classes={{ root: classes.checkbox }}
          onChange={handleChange}
        />
        <Typography fontWeight="bold">{coverage.nome}</Typography>
        <InfoTooltip color="primary" info={coverage.resumo} />
      </Box>
      <Typography m={theme.spacing(3, 0)}>{coverage.descricao}</Typography>
      {coverage.cobertura_obrigatoria && (
        <Typography color={theme.palette.primary.main} mt={theme.spacing(2)} fontSize={12}>
          ITEM OBRIGATÓRIO
        </Typography>
      )}
    </Paper>
  );
};

export default CoverageItem;
