import {
  Box,
  Stack,
  Tab,
  tabClasses,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";
import { RiFolderOpenLine } from "@remixicon/react";
import { memo, useEffect, useMemo, useState } from "react";
import { useMedia } from "src/shared/hooks/useMedia";
import { colors } from "src/styles/colors";
import { FAQ_ENUM, FAQ_TYPE, FAQs_CONTENT } from "./FAQ.const";
import { FAQContent } from "./FAQContent";
import dayjs from "dayjs";

interface FAQTabProps {
  searchWord?: string;
}

export const FAQTab = memo(({ searchWord = "" }: FAQTabProps) => {
  const { isDesktop } = useMedia();
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const trimWord = useMemo(() => searchWord.trim().toLowerCase(), [searchWord]);

  const [keyReload, setKeyReload] = useState<number>(dayjs().unix());

  useEffect(() => {
    if (!trimWord) {
      setKeyReload(dayjs().unix());
      setSelectedTab(0);
    }
  }, [trimWord]);

  const matchingCategories = useMemo(() => {
    if (!trimWord.length) return FAQ_TYPE;

    let key: FAQ_ENUM;
    const filterCategories: FAQ_ENUM[] = [];

    for (key in FAQs_CONTENT) {
      const faqs = FAQs_CONTENT[key];

      const hasMatchingKeyword = faqs.some(
        ({ title }) => title.toLowerCase().includes(trimWord)
        // || content.includes(trimWord)
      );

      if (hasMatchingKeyword) filterCategories.push(key);
    }

    const result = FAQ_TYPE.filter((category) =>
      filterCategories.some((c) => c === category.key)
    );

    setSelectedTab((preV) => {
      const currentSelectedTab = FAQ_TYPE[preV]?.key;

      const newIndex = filterCategories.findIndex(
        (category) => category === currentSelectedTab
      );
      return newIndex >= 0 ? newIndex : 0;
    });

    return result;
  }, [trimWord]);

  const selectedCategories = useMemo(
    () => matchingCategories.at(selectedTab),
    [matchingCategories, selectedTab]
  );

  return (
    <Tabs
      aria-label="FAQ"
      onChange={(_, value) => setSelectedTab(Number(value))}
      orientation={isDesktop ? "vertical" : "horizontal"}
      sx={{
        gap: "24px",
        bgcolor: "transparent",
      }}
      value={selectedTab}
    >
      {matchingCategories.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            padding: "60px 0",
            borderRadius: "6px",
            gap: "7px",
            background: colors["paper"],
          }}
        >
          <RiFolderOpenLine size={42} />
          <Typography level="body1">No data</Typography>
        </Box>
      ) : (
        <>
          <TabList
            disableUnderline
            sx={{
              gap: "4px",
              overflow: "auto",
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {matchingCategories.map((category, index) => (
              <Tab
                key={index}
                sx={{
                  padding: "8px 22px",
                  borderRadius: "var(--joy-radius-md)",
                  gap: "6px",
                  flexShrink: 0,
                  color: colors["text-primary"],
                  border: "none",
                  minWidth: { laptop: "300px" },

                  "&&:hover": {
                    color: colors["primary-main"],
                    bgcolor: colors["primary-opacity-light"],
                  },

                  "&::after": {
                    width: 0,
                    height: 0,
                  },

                  [`&&.${tabClasses.selected}`]: {
                    color: colors["text-primary"],
                    backgroundColor: colors["primary-main"],
                  },
                }}
              >
                <category.Icon
                  size={18}
                  style={{
                    flexShrink: 0,
                  }}
                />
                <Typography level="btn-medium">{category.key}</Typography>
              </Tab>
            ))}
          </TabList>
          <Stack flex={1} gap="16px">
            {/* Header */}
            <Box display="flex" gap="16px">
              <Box
                bgcolor={colors["primary-opacity-light"]}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="var(--joy-radius-md)"
                width={50}
                height={50}
                flexShrink={0}
              >
                {selectedCategories?.Icon && (
                  <selectedCategories.Icon
                    size={30}
                    color={colors["primary-main"]}
                  />
                )}
              </Box>

              <Stack>
                <Typography level="h5" color="text-primary">
                  {selectedCategories?.key}
                </Typography>
                <Typography level="body1" color="text-secondary">
                  {selectedCategories?.subtitle}
                </Typography>
              </Stack>
            </Box>
            {matchingCategories.map((category, index) => (
              <TabPanel key={index} value={index} sx={{ padding: 0 }}>
                <Stack gap="8px">
                  {FAQs_CONTENT[category.key]
                    .filter((item) =>
                      item.title.toLowerCase().includes(trimWord)
                    )
                    ?.map((item, index) => (
                      <FAQContent
                        item={item}
                        key={`${keyReload}-${index}`}
                        searchWords={trimWord}
                      />
                    ))}
                </Stack>
              </TabPanel>
            ))}
          </Stack>
        </>
      )}
    </Tabs>
  );
});
