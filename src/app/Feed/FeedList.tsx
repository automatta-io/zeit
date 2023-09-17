'use client';

import { Section, Flex } from "@radix-ui/themes"
import { CardFeedItem } from "./CardFeedItem"
import { useLocalStorage } from "../../useLocalStorage"

export const FeedList = () => {
  return (
    <Section size='1' p='0' style={{ height: '100vh' }}>
      <Flex direction='column' gap='4'>
        <CardFeedItem />
        <CardFeedItem />
        <CardFeedItem />
      </Flex>
    </Section>
  )
}