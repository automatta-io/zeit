import { Container, Flex } from "@radix-ui/themes"

import { HeaderLogin } from "./HeaderLogin"

export default function Index() {
  return (
    <Container size='4' style={{ padding: 'var(--space-8) 0' }}>
      <Flex direction='column'>
        <HeaderLogin />
      </Flex>
    </Container>
  )
}
