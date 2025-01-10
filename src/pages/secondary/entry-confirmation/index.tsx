import { Card, CardContent, Link, Typography } from "@mui/joy";
import PAGES from "src/constants/router";
import { useAuthStore } from "src/store/authStore";

const CompletedConfirmation = () => (
  <CardContent sx={{ p: 20 }}>
    <Typography level="h4" sx={{ mb: 20 }}>
      Your Indication has been received
    </Typography>
    <Typography level="body1" sx={{ mb: 24 }}>
      You can access all your indications from {/* Add link to history page */}
      <Link href={PAGES.BIDS_AND_OFFERS.INDEX}>your history page</Link>.
    </Typography>
  </CardContent>
);

const SecondaryEntryConfirmation = () => {
  const typeAccess = useAuthStore((state) => state.typeAccess);

  if (typeAccess !== "full") return <></>;

  return (
    <Card sx={{ width: "100%", maxWidth: 772, m: "auto" }}>
      <CompletedConfirmation />
    </Card>
  );
};

export default SecondaryEntryConfirmation;
