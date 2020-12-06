import React from 'react';
import { useColorMode, Heading, Text, Flex, Stack } from '@chakra-ui/react';

import Timeline from '../components/Timeline';
import Container from '../components/Container';
import BlogPost from '../components/BlogPost';
import Subscribe from '../components/Subscribe';
import ProjectCard from '../components/ProjectCard';

const Index = () => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400'
  };

  return (
    <Container>
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="700px"
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
          mb={8}
        >
          <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
            Hey, I’m Lee Robinson
          </Heading>
          <Text color={secondaryTextColor[colorMode]}>
            I’m a developer, writer, and creator. I work at ▲Vercel as a
            Solutions Architect. You’ve found my personal slice of the internet
            – everything you want to know and more is here.
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
          mt={8}
        >
          <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
            Most Popular
          </Heading>
          <BlogPost
            title="Everything I Know About Style Guides, Design Systems, and Component Libraries"
            summary="A deep-dive on everything I've learned in the past year building style guides, design systems, component libraries, and their best practices."
            slug="style-guides-component-libraries-design-systems"
          />
          <BlogPost
            title="How Stripe Designs Beautiful Websites"
            summary="Examining the tips and tricks used to make Stripe's website design a notch above the rest."
            slug="how-stripe-designs-beautiful-websites"
          />
          <BlogPost
            title="Creating a Monorepo with Lerna & Yarn Workspaces"
            summary="In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process."
            slug="monorepo-lerna-yarn-workspaces"
          />
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
        >
          <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
            Projects
          </Heading>
          <ProjectCard
            title="React 2025"
            description="Build and deploy a modern Jamstack application using the most popular open-source software."
            href="https://react2025.com/"
            icon="react2025"
          />
          <ProjectCard
            title="Learn Next.js"
            description="A free video course for building static and server-side rendered applications with Next.js and React."
            href="https://masteringnextjs.com/"
            icon="nextjs"
          />
          <ProjectCard
            title="Fast Feedback"
            description="The easiest way to add comments or reviews to your static site. Built as part of React 2025."
            href="https://fastfeedback.io/"
            icon="fastfeedback"
          />
        </Flex>
        <Timeline />
        <Subscribe />
      </Stack>
    </Container>
  );
};

export default Index;
