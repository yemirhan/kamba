import {
  Card,
  DefaultMantineColor,
  Grid,
  Group,
  MantineNumberSize,
  Text,
  Title,
} from "@mantine/core";
import { ProgressBar } from "@tremor/react";
type DataCardProps = {
  data: any;
  titleWeight: React.CSSProperties["fontWeight"];
  titleText: string;
  titleAlignment?:
    | "left"
    | "right"
    | "-moz-initial"
    | "inherit"
    | "initial"
    | "revert"
    | "unset"
    | "center"
    | "end"
    | "start"
    | "justify"
    | "match-parent";
  titleColor?: DefaultMantineColor | "dimmed";
  innerCardBorderEnabled?: boolean;
  innerCardBorderColor?: string;
  innerCardLeftText: string;
  innerCardLeftTextColor?: "dimmed" | DefaultMantineColor | undefined;
  innerCardLeftTextSize?: MantineNumberSize;
  innerCardRightText: string;
  innerCardRightTextColor?: "dimmed" | DefaultMantineColor | undefined;
  innerCardRightTextSize?: MantineNumberSize;
  progressBarColor?:
    | "blue"
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | undefined;
  valueKey: string;
};

export const DataCard = ({
  data,
  titleText,
  titleWeight,
  titleAlignment,
  titleColor,
  innerCardBorderEnabled,
  innerCardBorderColor,
  innerCardLeftText,
  innerCardLeftTextColor,
  innerCardLeftTextSize,
  innerCardRightText,
  innerCardRightTextColor,
  innerCardRightTextSize,
  progressBarColor,
  valueKey,
}: DataCardProps) => {
  let sum = 0;
  return (
    <Card withBorder radius={"md"} style={{ height: "30vh" }}>
      <Title align={titleAlignment} weight={titleWeight} color={titleColor}>
        {titleText}
      </Title>
      <Card
        withBorder={innerCardBorderEnabled}
        shadow={"sm"}
        style={{
          borderColor: innerCardBorderColor,
          height: "80%",
          width: "100%",
          padding: "4px",
        }}
      >
        <Grid>
          <Grid.Col span={8}>
            <Text size={innerCardLeftTextSize} color={innerCardLeftTextColor}>
              {innerCardLeftText}
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text size={innerCardRightTextSize} color={innerCardRightTextColor}>
              {innerCardRightText}
            </Text>
          </Grid.Col>
          {data.map((data, index) => {
            sum = sum + data[valueKey];
            return <></>;
          })}
          {data.map((data, index) => {
            if (index < 3) {
              return (
                <>
                  <Grid.Col span={8}>
                    <ProgressBar
                      percentageValue={(data[valueKey] / sum) * 100}
                      color={progressBarColor}
                      marginTop={"mt-2"}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Group position="center">
                      <Text>{data[valueKey]}</Text>
                    </Group>
                  </Grid.Col>
                </>
              );
            }
          })}
        </Grid>
      </Card>
    </Card>
  );
};
