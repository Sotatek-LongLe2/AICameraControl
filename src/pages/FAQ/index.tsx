import { Box, Chip, Grid, Stack, Typography } from "@mui/joy";
import { RiMailLine, RiPhoneLine } from "@remixicon/react";
import { AppSearchBox } from "src/components/base/AppSearchBox";
import { emailSupport } from "src/shared/helpers/misc";
import { colors } from "src/styles/colors";
import { useDebounceValue } from "usehooks-ts";
import { FAQTab } from "./FQATab";

const contacts = [
  {
    title: "(+852) 3525 0900",
    subtitle: "We are always happy to help!",
    Icon: RiPhoneLine,
  },
  {
    title: emailSupport,
    subtitle: "Best way to get answer faster!",
    Icon: RiMailLine,
  },
];

export const FAQ = () => {
  const [debouncedValue, updateDebounceValue] = useDebounceValue("", 500);

  return (
    <Stack gap="24px">
      {/* Search section */}
      <Box
        padding={{
          mobile: "24px 12px",
          laptop: "75px 24px 12px 24px",
        }}
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        minHeight={{ mobile: "212px", laptop: "320px" }}
        bgcolor={colors.paper}
      >
        <Stack gap={{ mobile: "24px", laptop: "27px" }} alignItems="start">
          <Stack alignItems="center" gap="10px">
            <Typography level="h4" color="primary-main">
              Hello, how can we help?
            </Typography>
            <Typography level="body1" textAlign="center" color="text-secondary">
              or choose a category to quickly find the help you need
            </Typography>
          </Stack>

          <Box width={"100%"} position={"relative"}>
            <AppSearchBox
              size="lg"
              placeholder="search articles..."
              wrapperProps={{
                sx: {
                  width: { mobile: "100%", laptop: "450px" },
                  position: { mobile: "relative", laptop: "absolute" },
                },
              }}
              sx={(theme) => ({
                ...theme.typography["input-text-large"],
                "& .MuiInput-startDecorator": {
                  width: "18px",
                },
              })}
              slotProps={{
                input: {
                  style: {
                    fontSize: "17px",
                  },
                },
              }}
              onChange={(e) => updateDebounceValue(e.target.value)}
            />
          </Box>
        </Stack>
      </Box>

      {/* Categories section */}
      <FAQTab searchWord={debouncedValue} />

      {/* Question section */}
      <Stack alignItems="center" paddingY="24px" gap="8px">
        <Chip
          sx={{
            background: colors["primary-opacity-light"],
            color: colors["primary-main"],
          }}
        >
          Question
        </Chip>
        <Typography level="h4">You still have a question?</Typography>
        <Typography level="body1" color="text-secondary" textAlign="center">
          If you cannot find a question in our FAQ, you can always contact us.
          We will answer to you shortly!
        </Typography>
      </Stack>

      {/* Contact Section */}
      <Grid container spacing="24px">
        {contacts.map((contact, index) => (
          <Grid key={index} mobile={12} laptop={6}>
            <Stack
              paddingY="24px"
              gap="16px"
              alignItems="center"
              borderRadius="var(--joy-radius-md)"
              bgcolor={colors["action-hover"]}
            >
              <Box>
                <Box
                  bgcolor={colors["primary-opacity-light"]}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="var(--joy-radius-md)"
                  minWidth={50}
                  minHeight={50}
                >
                  <contact.Icon size={30} color={colors["primary-main"]} />
                </Box>
              </Box>

              <Stack gap="4px" alignItems="center">
                <Typography level="h5">{contact.title}</Typography>
                <Typography level="body1" color="text-secondary">
                  {contact.subtitle}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
