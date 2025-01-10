import { colors } from "src/styles/colors";
import { shadow } from "src/styles/shadow";
import { IFaqItem } from "./FAQ.types";
import {
  AccordionGroup,
  Accordion,
  AccordionSummary,
  accordionSummaryClasses,
  Typography,
  AccordionDetails,
  accordionDetailsClasses,
} from "@mui/joy";
import { memo } from "react";
import Highlighter from "react-highlight-words";

interface FAQContentProps {
  item: IFaqItem;
  searchWords?: string | string[];
}

export const FAQContent = memo(
  ({ item, searchWords = "" }: FAQContentProps) => {
    return (
      <AccordionGroup
        sx={{
          bgcolor: colors.paper,
          boxShadow: shadow.xs,
          borderRadius: "6px",
        }}
      >
        <Accordion>
          <AccordionSummary
            sx={{
              [`& .${accordionSummaryClasses.indicator} svg`]: {
                color: colors["text-primary"],
              },

              [`&& .${accordionSummaryClasses.button}`]: {
                padding: "12px 20px",
                border: "none",

                // 29/11/2024 10:45 Remove icon when no content
                "& svg": {
                  ...(!item.content && {
                    display: "none",
                  }),
                },

                "&:hover": {
                  bgcolor: "transparent",
                },
              },
            }}
          >
            <Typography
              level="body1-500"
              color="text-primary"
              levelMapping={{ "body1-500": "div" }}
            >
              <Highlighter
                searchWords={
                  typeof searchWords === "string" ? [searchWords] : searchWords
                }
                autoEscape={true}
                textToHighlight={item.title}
              />
            </Typography>
          </AccordionSummary>
          {item.content && (
            <AccordionDetails
              sx={{
                [`& .${accordionDetailsClasses.content}`]: {
                  padding: 0,
                },
              }}
            >
              <Typography
                padding="0 20px 20px"
                level="body1"
                color="text-secondary"
                whiteSpace="pre-wrap"
                levelMapping={{ body1: "p" }}
              >
                {item.content}
              </Typography>
            </AccordionDetails>
          )}
        </Accordion>
      </AccordionGroup>
    );
  }
);
