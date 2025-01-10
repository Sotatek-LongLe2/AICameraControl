import PendingDemandTable from "./PendingDemandTable";
import ExecutedDemandTable from "./ExecutedDemandTable";
import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/joy";
import { RiFolderOpenLine } from "@remixicon/react";

const DemandSection = () => {
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [executedCount, setExecutedCount] = useState<number>(0);

  return (
    <>
      <PendingDemandTable
        onChangeData={(data) => setPendingCount(data.length)}
      />
      <ExecutedDemandTable
        onChangeData={(data) => setExecutedCount(data.length)}
      />
      {pendingCount + executedCount === 0 && (
        <Card>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 60,
            }}
          >
            <RiFolderOpenLine size={42} />
            <Typography level="body1">No data</Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default DemandSection;
