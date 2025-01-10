import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Input,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Option,
  Radio,
  Select,
  Slider,
  Stack,
  Switch,
  Textarea,
  Typography,
} from "@mui/joy";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiUserLine,
} from "@remixicon/react";
import dayjs from "dayjs";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AppDatePicker } from "src/components/base/AppDatePicker";
import { AppInput } from "src/components/base/AppInput";
import { AppInputController } from "src/components/base/AppInputController";
import { AppInputNumber } from "src/components/base/AppInputNumber";
import { AppSelect } from "src/components/base/AppSelect";
import { AppLexical } from "src/components/base/lexical/AppLexical";
import { DragDropBox } from "src/components/common/DragDropBox";
import { InputPassword } from "src/components/common/InputPassword";

interface SectionProps {
  title: string;
  children: ReactNode;
}

interface ComponentGroupProps {
  children: ReactNode;
}

function UIKit() {
  const handleFileUpload = (files: File[]) => {
    console.log("Uploaded file:", files);
    // Handle the file upload here (e.g., send it to a server)
  };
  const { handleSubmit, control } = useForm();

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const onChange = (date: [Date | null, Date | null]) => {
    const [start, end] = date;
    setStartDate(start ?? undefined);
    setEndDate(end ?? undefined);
  };

  return (
    <Card sx={{ p: 8 }}>
      <Typography level="h1" sx={{ mb: 4 }}>
        Joy UI Components
      </Typography>

      <Box sx={{ margin: "auto" }}>
        <DragDropBox onFileUpload={handleFileUpload} />
      </Box>

      <Section title="Card">
        <ComponentGroup>
          <Card>
            <CardContent>
              We could validate your invitation code. Please choose your
              password to access Astra.
            </CardContent>
          </Card>
        </ComponentGroup>
      </Section>
      <Section title="Input">
        <ComponentGroup>
          <Input placeholder="default" />
          <Input placeholder="placeholder size default md" />
          <Input placeholder="outlined" defaultValue="size Md" />

          <Input placeholder="placeholder size lg" size="lg" />
          <Input placeholder="outlined" size="lg" defaultValue="size Lg" />
          <Input
            placeholder="outlined"
            size="lg"
            defaultValue="size Lg + disabled"
            disabled
          />

          <InputPassword
            placeholder="password"
            size="lg"
            defaultValue="size Lg + password"
          />
          <Input
            placeholder="password"
            size="lg"
            defaultValue="Search + size Lg + password"
            startDecorator={<RiUserLine />}
          />
        </ComponentGroup>
        <ComponentGroup>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Input key={size} size={size} placeholder={size} />
          ))}
        </ComponentGroup>
      </Section>
      <Section title="AppInput">
        <ComponentGroup>
          <AppInput label="Label" placeholder="AppInput with label" />
          <AppInput
            label="error"
            error="Error message"
            placeholder="AppInput with error"
            defaultValue="HIHIIIH"
          />
        </ComponentGroup>
      </Section>
      <Section title="AppInputController">
        <Box component="form">
          <ComponentGroup>
            <AppInputController
              label="Label"
              placeholder="AppInputController"
              required
              name="name"
              control={control}
            />
          </ComponentGroup>
          <Button onClick={handleSubmit((data) => console.log(data))}>
            Submit
          </Button>
        </Box>
      </Section>
      <Section title="AppInputNumber">
        <ComponentGroup>
          <AppInputNumber />
        </ComponentGroup>
      </Section>
      <Section title="Button">
        <ComponentGroup>
          {(["solid", "soft", "outlined", "plain"] as const).map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </ComponentGroup>
        <ComponentGroup>
          {(["solid", "soft", "outlined", "plain"] as const).map((variant) => (
            <Button disabled key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </ComponentGroup>
        <ComponentGroup>
          <Stack spacing={8} direction="row">
            <Button variant="solid" endDecorator={<RiArrowRightLine />}>
              Continue
            </Button>
            <Button variant="outlined" startDecorator={<RiArrowLeftLine />}>
              Go Back
            </Button>
            <Button
              variant="solid"
              endDecorator={<RiArrowRightLine />}
              disabled
            >
              Continue
            </Button>
          </Stack>

          <Stack spacing={8} direction="row">
            <Button variant="outlined" color="error-main">
              error-main
            </Button>
            <Button variant="outlined" color="error-main" disabled>
              error-main
            </Button>
            <Button variant="outlined" color="astra-pink" disabled>
              astra-pink
            </Button>
            <Button variant="outlined" color="astra-pink">
              astra-pink
            </Button>
          </Stack>
          <Stack spacing={8} direction="row">
            <Button color="error-main">error-main</Button>
            <Button color="error-main" disabled>
              error-main
            </Button>
            <Button color="astra-pink">astra-pink</Button>
            <Button color="astra-pink" disabled>
              astra-pink
            </Button>
          </Stack>
        </ComponentGroup>
        <ComponentGroup>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </ComponentGroup>
      </Section>

      <Section title="Datepicker">
        <ComponentGroup>
          <Stack>
            Calendar only:
            <div>
              <AppDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date ?? new Date())}
              />
            </div>
          </Stack>
          <Stack>
            Time picker
            <div>
              <AppDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date ?? new Date())}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
          </Stack>

          <Stack>
            Range picker
            <div>
              <AppDatePicker
                swapRange
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                excludeDates={[
                  dayjs().add(1, "d").toDate(),
                  dayjs().add(5, "d").toDate(),
                ]}
                selectsRange
                selectsDisabledDaysInRange
                inline
              />
            </div>
          </Stack>
        </ComponentGroup>
      </Section>
      <Section title="Link">
        <ComponentGroup>
          <Link href="/login">Login</Link>
          <Link href="/login" underline="always">
            Login + underline always
          </Link>
        </ComponentGroup>
      </Section>
      <Section title="Typography">
        <Typography level="h3">Register to Astra</Typography>
        <Typography level="h4">Typography h4</Typography>
        <Typography level="h5">Typography h5</Typography>
        Text body1
      </Section>
      <Section title="Checkbox">
        {/* <ComponentGroup>
          {(["solid", "soft", "outlined", "plain"] as const).map((variant) => (
            <Checkbox key={variant} variant={variant} label={variant} />
          ))}
        </ComponentGroup> */}
        <ComponentGroup>
          <Checkbox label="Checkbox" checked />
          {(["sm", "md", "lg"] as const).map((size) => (
            <Checkbox key={size} size={size} label={size} />
          ))}
        </ComponentGroup>
      </Section>
      <Section title="Radio">
        <ComponentGroup>
          {(["solid", "soft", "outlined", "plain"] as const).map((variant) => (
            <Radio key={variant} variant={variant} label={variant} />
          ))}
        </ComponentGroup>
        <ComponentGroup>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Radio key={size} size={size} label={size} />
          ))}
        </ComponentGroup>
        <ComponentGroup>
          <Radio label="Radio long RadioRadioRadioRadioRadioRadioRadioRadioRadio long RadioRadioRadioRadioRadioRadioRadioRadioRadio long RadioRadioRadioRadioRadioRadioRadioRadioRadio long RadioRadioRadioRadioRadioRadioRadioRadioRadio long RadioRadioRadioRadioRadioRadioRadioRadioRadio long RadioRadioRadioRadioRadioRadioRadioRadioRadio long RadioRadioRadioRadioRadioRadioRadioRadio" />
        </ComponentGroup>
      </Section>
      <Section title="Chip">
        <ComponentGroup>
          <Chip color="danger">SELL</Chip>
          <Chip color="primary">BUY</Chip>
        </ComponentGroup>
        <ComponentGroup>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Chip key={size} size={size}>
              {size}
            </Chip>
          ))}
          {(["primary", "danger"] as const).map((color) => (
            <Chip key={color} color={color}>
              {color}
            </Chip>
          ))}
        </ComponentGroup>
      </Section>

      <Section title="Textarea">
        <ComponentGroup>
          {(["solid", "soft", "outlined", "plain"] as const).map((variant) => (
            <Textarea
              key={variant}
              variant={variant}
              placeholder={variant}
              minRows={2}
            />
          ))}
        </ComponentGroup>
        <ComponentGroup>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Textarea key={size} size={size} placeholder={size} minRows={2} />
          ))}
        </ComponentGroup>
      </Section>

      <Section title="AppLexical">
        <AppLexical height={200} />
      </Section>
      <Section title="Select">
        <ComponentGroup>
          {(["solid", "soft", "outlined", "plain"] as const).map((variant) => (
            <Select key={variant} variant={variant} placeholder={variant}>
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
            </Select>
          ))}
        </ComponentGroup>
        <ComponentGroup>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Select key={size} size={size} placeholder={size}>
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
            </Select>
          ))}
        </ComponentGroup>
      </Section>
      <Section title="AppSelect">
        <AppSelect label="AppSelect with label" />
        <AppSelect
          label="label"
          error="AppSelect with error"
          ref={(el) => {
            console.log(el);
          }}
          defaultValue="option1"
        >
          {(["sm", "md", "lg"] as const).map((size) => (
            <Select key={size} size={size} placeholder={size}>
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
            </Select>
          ))}
        </AppSelect>
      </Section>

      <Section title="Switch">
        <Typography component="label" endDecorator={<Switch />}>
          Turn alarm on
        </Typography>
        <Typography component="label" startDecorator={<Switch />}>
          Turn alarm on
        </Typography>
        <ComponentGroup>
          {(["solid", "soft", "outlined"] as const).map((variant) => (
            <Switch key={variant} variant={variant} />
          ))}
        </ComponentGroup>
        <ComponentGroup>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Switch key={size} size={size} />
          ))}
        </ComponentGroup>
      </Section>
      <Section title="Slider">
        <ComponentGroup>
          {(["solid", "soft", "outlined"] as const).map((variant) => (
            <Slider key={variant} variant={variant} defaultValue={50} />
          ))}
        </ComponentGroup>
        <ComponentGroup>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Slider key={size} size={size} defaultValue={50} />
          ))}
        </ComponentGroup>
      </Section>
      <Section title="CircularProgress">
        <ComponentGroup>
          {(["solid", "soft", "outlined", "plain"] as const).map((variant) => (
            <CircularProgress key={variant} variant={variant} />
          ))}
        </ComponentGroup>
        <ComponentGroup>
          {(["sm", "md", "lg"] as const).map((size) => (
            <CircularProgress key={size} size={size} />
          ))}
        </ComponentGroup>
      </Section>
      <Section title="LinearProgress">
        <ComponentGroup>
          {(["solid", "soft", "outlined", "plain"] as const).map((variant) => (
            <LinearProgress key={variant} variant={variant} />
          ))}
        </ComponentGroup>
        <ComponentGroup>
          {(["sm", "md", "lg"] as const).map((size) => (
            <LinearProgress key={size} size={size} />
          ))}
        </ComponentGroup>
      </Section>
      <Section title="Avatar">
        <ComponentGroup>
          {(["solid", "soft", "outlined", "plain"] as const).map((variant) => (
            <Avatar key={variant} variant={variant}>
              A
            </Avatar>
          ))}
        </ComponentGroup>
        <ComponentGroup>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Avatar key={size} size={size}>
              A
            </Avatar>
          ))}
        </ComponentGroup>
      </Section>
      <Section title="Badge">
        <ComponentGroup>
          {(["solid", "soft", "outlined", "plain"] as const).map((variant) => (
            <Badge key={variant} variant={variant} badgeContent={4}>
              <Avatar>A</Avatar>
            </Badge>
          ))}
        </ComponentGroup>
        <ComponentGroup>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Badge key={size} size={size} badgeContent={4}>
              <Avatar>A</Avatar>
            </Badge>
          ))}
        </ComponentGroup>
      </Section>
      <Section title="List">
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Avatar size="sm">A</Avatar>
              </ListItemDecorator>
              List Item 1
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Avatar size="sm">B</Avatar>
              </ListItemDecorator>
              List Item 2
            </ListItemButton>
          </ListItem>
        </List>
      </Section>

      <Section title="Toast">
        <ComponentGroup>
          <Button onClick={() => toast("Blank Tost")}>Blank Tost</Button>
          <Button onClick={() => toast.error("This didn't work.")}>
            This didn't work.
          </Button>
          <Button onClick={() => toast.success("Successfully toasted!")}>
            Successfully toasted!
          </Button>
          <Button
            onClick={() => {
              const id = toast.loading("loading...");
              setTimeout(() => {
                toast.dismiss(id);
              }, 5000);
            }}
          >
            loading...
          </Button>
          <Button
            onClick={() =>
              toast.custom(
                {
                  description: "Sure! 8:30pm works great",
                  title: "John Doe",
                },
                {
                  icon: <RiArrowRightLine />,
                  closeButton: true,
                  autoClose: false,
                }
              )
            }
          >
            Toast Custom
          </Button>
        </ComponentGroup>
      </Section>
    </Card>
  );
}

function Section({ title, children }: SectionProps) {
  return (
    <Box sx={{ mb: 16 }}>
      <Typography level="h2" sx={{ mb: 8 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function ComponentGroup({ children }: ComponentGroupProps) {
  return <Box sx={{ mb: 18 }}>{children}</Box>;
}

export default UIKit;
