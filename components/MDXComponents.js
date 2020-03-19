/** @jsx jsx */
import {
  Box,
  Callout,
  Code,
  Heading,
  Kbd,
  Link,
  PseudoBox,
  Text,
  useColorMode
} from '@chakra-ui/core';
import { jsx } from '@emotion/core';
import NextLink from 'next/link';

const Table = (props) => (
  <Box as="table" textAlign="left" mt="32px" width="full" {...props} />
);

const THead = (props) => {
  const { colorMode } = useColorMode();
  const bg = {
    light: 'gray.50',
    dark: 'whiteAlpha.100'
  };

  return (
    <Box
      as="th"
      bg={bg[colorMode]}
      fontWeight="semibold"
      p={2}
      fontSize="sm"
      {...props}
    />
  );
};

const TData = (props) => (
  <Box
    as="td"
    p={2}
    borderTopWidth="1px"
    borderColor="inherit"
    fontSize="sm"
    whiteSpace="normal"
    {...props}
  />
);

const CustomLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <Link color="blue.500" {...props} />
      </NextLink>
    );
  }

  return <Link color="blue.500" isExternal {...props} />;
};

const DocsHeading = (props) => (
  <Heading
    css={{
      '&[id]': {
        pointerEvents: 'none'
      },
      '&[id]:before': {
        display: 'block',
        height: ' 6rem',
        marginTop: '-6rem',
        visibility: 'hidden',
        content: `""`
      },
      '&[id]:hover a': { opacity: 1 }
    }}
    {...props}
    mb="1em"
    mt="2em"
  >
    <Box pointerEvents="auto">
      {props.children}
      {props.id && (
        <PseudoBox
          aria-label="anchor"
          as="a"
          color="teal.500"
          fontWeight="normal"
          outline="none"
          _focus={{ opacity: 1, boxShadow: 'outline' }}
          opacity="0"
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </PseudoBox>
      )}
    </Box>
  </Heading>
);

const MDXComponents = {
  h1: (props) => <Heading as="h1" size="xl" my="1em" {...props}></Heading>,
  h2: (props) => (
    <DocsHeading as="h2" fontWeight="bold" size="lg" {...props}></DocsHeading>
  ),
  h3: (props) => (
    <DocsHeading as="h3" size="md" fontWeight="bold" {...props}></DocsHeading>
  ),
  inlineCode: (props) => (
    <Code variantColor="yellow" fontSize="0.84em" {...props} />
  ),
  kbd: Kbd,
  br: (props) => <Box height="24px" {...props} />,
  hr: (props) => <Box as="hr" borderTopWidth="1px" my={8} {...props} />,
  table: Table,
  th: THead,
  td: TData,
  a: CustomLink,
  p: (props) => <Text as="p" mt={4} lineHeight="tall" {...props} />,
  ul: (props) => <Box as="ul" pt="8px" pl="16px" {...props} />,
  ol: (props) => <Box as="ol" pt="8px" pl="16px" {...props} />,
  li: (props) => <Box as="li" pb="4px" {...props} />,
  blockquote: (props) => (
    <Callout
      mt={4}
      w="98%"
      variant="left-accent"
      status="info"
      css={{ '> *:first-of-type': { marginTop: 0 } }}
      {...props}
    />
  )
};

export default MDXComponents;
