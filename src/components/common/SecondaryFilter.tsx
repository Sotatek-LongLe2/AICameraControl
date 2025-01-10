import {
  Card,
  CardContent,
  IconButton,
  Option,
  Radio,
  RadioGroup,
  Select,
  SelectStaticProps,
} from "@mui/joy";
import { RiCloseLine, RiGridLine, RiMenuLine } from "@remixicon/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { SecondarySideEnum } from "src/constants/enumBE";
import PAGES from "src/constants/router";
import { UserSecondaryService } from "src/services/UserSecondaryService";
import {
  ISecondaryFilterParams,
  useSecondaryStore,
} from "src/store/secondaryStore";
import { useDebounceValue } from "usehooks-ts";
import BasicButtonGroup from "../base/AppButtonGroupBuySell";
import { AppSearchBox } from "../base/AppSearchBox";

interface SecondaryFilterProps {
  onChangeFilter: (data: ISecondaryFilterParams) => void;
}

const VIEWS = [
  {
    icon: <RiMenuLine />,
    value: "list",
  },
  {
    icon: <RiGridLine />,
    value: "grid",
  },
];

const SecondaryFilter: React.FC<SecondaryFilterProps> = ({
  onChangeFilter,
}) => {
  const [listCountries, setListCountries] = useState<string[]>([]);
  const [listIndustries, setListIndustries] = useState<{ industry: string }[]>(
    []
  );
  const {
    displayView,
    setDisplayView,
    secondaryFilterParams,
    onChangeSecondaryFilterParams,
  } = useSecondaryStore();

  const [searchParams] = useSearchParams();
  const action: SelectStaticProps["action"] = useRef(null);

  const side = useMemo(
    () =>
      Number(searchParams.get("side")) === 1
        ? SecondarySideEnum.SELL
        : SecondarySideEnum.BUY,
    [searchParams]
  );

  const [debouncedValue, updateDebounceValue] = useDebounceValue(
    secondaryFilterParams.search,
    500
  );

  const loadListCountries = async () => {
    const { data } = await UserSecondaryService.listCountries({
      page: 1,
      limit: 1000,
    });
    setListCountries(data.data);
  };

  const loadListIndustries = async () => {
    const { data } = await UserSecondaryService.listIndustries({
      page: 1,
      limit: 1000,
    });
    setListIndustries(data.data);
  };

  const handleChangeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDebounceValue(e.target.value);
  };

  const handleClearFilter = (
    filterType: "countryFilter" | "industryFilter"
  ) => {
    onChangeSecondaryFilterParams({
      [filterType]: "",
      page: 1,
    });
  };

  useEffect(() => {
    loadListCountries();
    loadListIndustries();
  }, []);

  useEffect(() => {
    onChangeSecondaryFilterParams({
      search: debouncedValue,
      page: 1,
    });
  }, [debouncedValue, onChangeSecondaryFilterParams]);

  useEffect(() => {
    onChangeFilter({ ...secondaryFilterParams });
  }, [onChangeFilter, secondaryFilterParams]);

  return (
    <Card sx={{ mb: 24 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: { mobile: "column", laptop: "row" },
          alignItems: "center",
          gap: 12,
        }}
      >
        <BasicButtonGroup
          buttonFlex="0 1 100%"
          sx={(theme) => ({
            [theme.breakpoints.down("laptop")]: {
              width: "100%",
              justifyContent: "center",
            },
          })}
          value={side}
          onChange={(value) =>
            window.navigate({
              pathname: PAGES.SECONDARY,
              search: createSearchParams({
                side: String(value),
              }).toString(),
            })
          }
        />
        <Select
          action={action}
          placeholder="Country"
          value={secondaryFilterParams.countryFilter || null}
          onChange={(e, newValue) => {
            if (e)
              onChangeSecondaryFilterParams({
                countryFilter: newValue as string,
                page: 1,
              });
          }}
          {...(secondaryFilterParams.countryFilter && {
            endDecorator: (
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  handleClearFilter("countryFilter");
                  action.current?.focusVisible();
                }}
              >
                <RiCloseLine />
              </IconButton>
            ),
            indicator: null,
          })}
          sx={(theme) => ({
            flex: { laptop: 1.5 },
            background: "transparent",
            height: 40,
            width: "100%",
            [theme.breakpoints.down("laptop")]: {
              display: "none",
            },
          })}
        >
          {listCountries.length > 0 ? (
            listCountries.map((value, index) => (
              <Option
                key={index}
                value={value}
                sx={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  whiteSpace: "normal",
                }}
              >
                {value}
              </Option>
            ))
          ) : (
            <Option
              value=""
              sx={{
                "&.MuiOption-highlighted:not([aria-selected='true'])": {
                  backgroundColor: "transparent",
                },
              }}
            >
              No data
            </Option>
          )}
        </Select>
        <Select
          action={action}
          placeholder="Industry"
          value={secondaryFilterParams.industryFilter || null}
          onChange={(e, newValue) => {
            if (e)
              onChangeSecondaryFilterParams({
                industryFilter: newValue as string,
                page: 1,
              });
          }}
          {...(secondaryFilterParams.industryFilter && {
            endDecorator: (
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  handleClearFilter("industryFilter");
                  action.current?.focusVisible();
                }}
              >
                <RiCloseLine />
              </IconButton>
            ),
            indicator: null,
          })}
          sx={(theme) => ({
            flex: { laptop: 1.5 },
            background: "transparent",
            height: 40,
            width: "100%",
            [theme.breakpoints.down("laptop")]: {
              display: "none",
            },
          })}
        >
          {listIndustries.length > 0 ? (
            listIndustries.map((value, index) => (
              <Option
                key={index}
                value={value.industry}
                sx={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  whiteSpace: "normal",
                }}
              >
                {value.industry}
              </Option>
            ))
          ) : (
            <Option
              value=""
              sx={{
                "&.MuiOption-highlighted:not([aria-selected='true'])": {
                  backgroundColor: "transparent",
                },
              }}
            >
              No data
            </Option>
          )}
        </Select>
        <AppSearchBox
          wrapperProps={{
            sx: {
              width: { laptop: "260px", mobile: "100%" },
            },
          }}
          onChange={handleChangeSearchKey}
        />
        <RadioGroup
          orientation="horizontal"
          sx={(theme) => ({
            flex: { laptop: 1 },
            width: "100%",
            height: 38,
            borderRadius: 8,
            overflow: "hidden",
            "--RadioGroup-gap": "0px",
            "--Radio-actionRadius": "0px",
            [theme.breakpoints.down("laptop")]: {
              display: "none",
            },
          })}
        >
          {VIEWS.map((item, index) => (
            <Radio
              key={index}
              disableIcon
              value={item.value}
              onChange={() => setDisplayView(item.value)}
              checked={displayView === item.value}
              label={item.icon}
              sx={{
                flex: 1,
              }}
              slotProps={{
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    background: theme.color["primary-main"],
                    "&:hover": {
                      bgcolor: theme.color["primary-main"],
                    },
                    ...(checked && {
                      backgroundColor: theme.color["primary-dark"],
                      "&:hover": {
                        bgcolor: theme.color["primary-dark"],
                      },
                    }),
                  }),
                }),
                label: {
                  sx: (theme) => ({
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: theme.color["text-primary"],
                  }),
                },
              }}
            />
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default SecondaryFilter;
