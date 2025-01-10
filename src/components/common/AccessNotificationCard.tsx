import { Card, CardContent, Link, Typography } from "@mui/joy";
import { RiArrowRightLine, RiTimer2Line } from "@remixicon/react";
import PAGES from "src/constants/router";
import { useMedia } from "src/shared/hooks/useMedia";
import { useAuthStore } from "src/store/authStore";
import { useUserStore } from "src/store/userStore";

const AccessNotificationCard = () => {
  const typeAccess = useAuthStore((state) => state.typeAccess);
  const progress = useUserStore((state) => state.progress);
  const { isMobile } = useMedia();

  return (
    <>
      {typeAccess === "partial" && (
        <>
          {progress.step < 6 ? (
            <Card sx={{ mb: 24, borderRadius: 2 }}>
              <CardContent>
                <Link
                  href={PAGES.REGISTRATION.STEP_6}
                  sx={{
                    fontSize: 24,
                    fontFamily: "Jost",
                    fontWeight: 500,
                    mb: 16,
                  }}
                >
                  Complete your Registration
                  <RiArrowRightLine />
                </Link>
                <Typography level="body1">
                  Upload your financial documents and get full access to Astra
                  now.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ mb: 24, borderRadius: 2 }}>
              <CardContent>
                <Typography
                  level="h4"
                  sx={{
                    display: isMobile ? "block" : "flex",
                    alignItems: "center",
                    gap: 4,
                    fontFamily: "Jost",
                    mb: 16,
                  }}
                >
                  Document Verification On Going
                  {isMobile ? (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        verticalAlign: "middle",
                        marginLeft: "4px",
                      }}
                    >
                      <RiTimer2Line />
                    </span>
                  ) : (
                    <RiTimer2Line />
                  )}
                </Typography>
                <Typography level="body1">
                  Astra is currently verifying your financial documents. We will
                  notify you when this is done and you will get full access to
                  the application.
                </Typography>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </>
  );
};

export default AccessNotificationCard;
