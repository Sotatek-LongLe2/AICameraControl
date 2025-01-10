import {
  Box,
  Card,
  CardContent,
  CardContentProps,
  Link,
  styled,
  Typography,
} from "@mui/joy";
import { colors } from "src/styles/colors";

const TextDetail = styled(Typography)(() => ({
  color: colors["text-secondary"],
}));

interface RiskAndWarningProps {
  cardContentProps?: CardContentProps;
}

const RiskAndWarning: React.FC<RiskAndWarningProps> = ({
  cardContentProps,
}) => {
  return (
    <Box>
      <Typography
        level="h3"
        sx={{
          fontWeight: 500,
          color: colors["text-primary"],
          marginTop: "24px",
        }}
      >
        Risk Warning / Disclosure
      </Typography>
      <Card
        sx={(theme) => ({
          border: 1,
          borderColor: theme.color.divider,
        })}
      >
        <CardContent
          {...cardContentProps}
          sx={{
            px: 16,
            py: 12,
            maxHeight: 360,
            overflow: "auto",
            ...cardContentProps?.sx,
          }}
        >
          <TextDetail
            level="body1"
            sx={{
              marginTop: "4px",
            }}
          >
            Please read and accept the Risk Warning below to continue:
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Launch Point Limited (“Launch Point”, “we”, “our” or “us”) is a Hong
            Kong Securities and Futures Commission licensed Corporation,
            accessible ONLY by Professional Investors (“Investors”, “you” or
            “your”) as defined in Schedule 1 of the Securities and Futures
            Ordinance (Cap.571 of the Laws of Hong Kong) and in section 3 of the
            Securities and Futures (Professional Investor) Rules (Cap.571D of
            the Laws of Hong Kong).
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            Launch Point allows Professional Investors to directly invest in
            early stage private companies which have been approved by Launch
            Point (“Startup”), via the website located at{" "}
            <Link
              href="https://www.launchpoint-astra.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.launchpoint-astra.com
            </Link>{" "}
            (“Site”).
          </TextDetail>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "20px",
            }}
          >
            In considering whether to invest, you should inform yourself and be
            aware of the risks generally, and in particular should note the
            following:
          </TextDetail>
          <TextDetail level="body1">
            <ul>
              <li>
                Investments in early stage companies are considered a complex
                product by the SFC, and are specifically an investment in a
                private company.
              </li>
              <li>
                Your investment is illiquid, may lose all value, and any returns
                on your investment may not be realized.
              </li>
              <li>
                While your potential gain on any investment is not capped or
                limited, you may lose all your principal.
              </li>
              <li>
                The offering documents or information provided by the Startups
                on our platform have not been reviewed by the SFC and you are
                advised to exercise caution in relation to any offer.
              </li>
              <li>
                Any information provided by a Startup on past performance of
                that Startup is not indicative of future performance.
              </li>
            </ul>
          </TextDetail>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RiskAndWarning;
