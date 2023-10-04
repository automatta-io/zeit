import { Section, Flex } from "@radix-ui/themes"
import { getServerSession } from "next-auth";
import Parser from 'rss-parser';

import { authOptions } from "../../api/auth/[...nextauth]/route";
import { db } from '../../db/db';
import { feeds } from '../../db/schema';
import { CardFeedItem } from "./CardFeedItem"

const parser = new Parser();

export const FeedList = async () => {
  const session = await getServerSession(authOptions);

  const getFeeds = async () => {
    const feeds = await db.query.feeds.findMany({
      with: {
        users: {
          where: (users, { eq }) => eq(users.email, session?.user?.email),
        },
      },
    });

    return Promise.all(feeds.map(async feed => {
      const rss = await parser.parseURL(feed.url);

      return {
        ...feed,
        title: feed.title || rss.title,
      }
    }));
  }

  const feeds = await getFeeds();

  return (
    <Section size='1' p='0' style={{ height: '100vh' }}>
      <Flex direction='column' gap='4'>
        {feeds.map(feed => (
          <CardFeedItem
            key={feed.id}
            title={feed.title}
          />
        ))}
      </Flex>
    </Section>
  )
}