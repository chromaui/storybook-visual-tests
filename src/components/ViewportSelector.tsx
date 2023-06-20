import { Icon } from "@storybook/design-system";
import React from "react";

import { aggregate } from "../constants";
import { ComparisonResult } from "../gql/graphql";
import { ArrowIcon } from "./icons/ArrowIcon";
import { StatusDot, StatusDotWrapper } from "./StatusDot";
import { TooltipMenu } from "./TooltipMenu";

interface ViewportSelectorProps {
  viewportResults: Record<string, ComparisonResult>;
  onSelectViewport: (viewport: string) => void;
}

export const ViewportSelector = ({ viewportResults, onSelectViewport }: ViewportSelectorProps) => {
  const [selected, setSelected] = React.useState(Object.keys(viewportResults)[0]);

  const handleSelect = React.useCallback(
    (viewport: string) => {
      setSelected(viewport);
      onSelectViewport(viewport);
    },
    [onSelectViewport]
  );

  const aggregateResult = aggregate(Object.values(viewportResults));
  if (!aggregateResult) return null;

  return (
    <TooltipMenu
      placement="bottom"
      links={Object.entries(viewportResults).map(([viewport, result]) => ({
        id: `viewport-${viewport}`,
        title: viewport,
        right: result !== ComparisonResult.Equal && <StatusDot status={result} />,
        onClick: () => handleSelect(viewport),
        active: selected === viewport,
      }))}
    >
      {aggregateResult === ComparisonResult.Equal ? (
        <Icon icon="grow" />
      ) : (
        <StatusDotWrapper status={aggregateResult}>
          <Icon icon="grow" />
        </StatusDotWrapper>
      )}
      {selected}
      <ArrowIcon icon="arrowdown" />
    </TooltipMenu>
  );
};