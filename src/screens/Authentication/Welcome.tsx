import React from "react";

import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { VisualTestsIcon } from "../../components/icons/VisualTestsIcon";
import { Stack } from "../../components/Stack";
import { Text } from "../../components/Text";

interface WelcomeProps {
  onNext: () => void;
}

export const Welcome = ({ onNext }: WelcomeProps) => (
  <Container>
    <Stack>
      <div>
        <VisualTestsIcon />
        <Heading>Visual tests</Heading>
        <Text>
          Catch bugs in UI appearance automatically. Compare image snapshots to detect visual
          changes.
        </Text>
      </div>
      <Button secondary onClick={onNext}>
        Enable
      </Button>
    </Stack>
  </Container>
);
