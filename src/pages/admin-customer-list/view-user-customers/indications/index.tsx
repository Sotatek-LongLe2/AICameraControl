import PostingIndicationTable from "./PostingIndicationTable";
import ExecutedIndicationTable from "./ExecutedIndicationTable";
import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/joy";
import { RiFolderOpenLine } from "@remixicon/react";

const IndicationSection = () => {
  const [postingCount, setPostingCount] = useState<number>(0);
  const [executedCount, setExecutedCount] = useState<number>(0);

  return (
    <>
      <PostingIndicationTable
        onChangeData={(data) => setPostingCount(data.length)}
      />
      <ExecutedIndicationTable
        onChangeData={(data) => setExecutedCount(data.length)}
      />
      {postingCount + executedCount === 0 && (
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

export default IndicationSection;
