import React from "react";
import { Button, Heading, Box, Flex, Image, rem } from "@feast-it/pesto";
import { useInView } from "react-intersection-observer";

const TEAM = {
  Victoria: {
    name: "Victoria",
    image: "/victoria.jpg",
  },
};

export const Welcome = () => {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <Box height="80vh">
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Box ref={ref} mb={4}>
          <Flex width="100%" mb={4} justifyContent="center">
            <Box
              width={rem(68)}
              height={rem(68)}
              borderRadius="50%"
              overflow="hidden"
            >
              <Image
                src={TEAM["Victoria"].image}
                inView={inView}
                width={50}
                height={50}
              />
            </Box>
          </Flex>
          <Heading
            mb={[3, 1]}
            variant={["headingLarge", "display"]}
            textAlign="center"
            color="blueDark"
          >
            Let&#39;s get you some quotes!
          </Heading>

          <Heading
            as="h2"
            variant={["headingSmall", "headingMedium"]}
            textAlign="center"
            color="blueDark"
          >
            I&#39;m{" "}
            <Heading
              variant={["headingSmall", "headingMedium"]}
              as="span"
              color="blueMedium"
            >
              Victoria*
            </Heading>
            , and I&#39;m here to help you plan & book your event.
          </Heading>
        </Box>
        <Box mt={8} justifyItems="center" display="grid">
          <Button
            size="extraLarge"
            font="heading"
            type="submit"
            testId="start-button"
            m={0}
          >
            Get started
          </Button>

          <Heading textAlign="center" p={4} as="h4" variant="headingSmall">
            You’re just a few questions away <br /> from finding your perfect
            supplier
          </Heading>
        </Box>
        <Box>*I&#39;m actually a real person!</Box>
      </Flex>
    </Box>
  );
};
