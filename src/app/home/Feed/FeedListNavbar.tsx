import { Section, Flex } from "@radix-ui/themes"
import { getServerSession } from "next-auth";
import Parser from 'rss-parser';

import { authOptions } from "../../api/auth/[...nextauth]/route";
import { db } from '../../db/db';
import { CardFeedItem } from "./CardFeedItem"
import { Feed } from "../FeedContext";

const parser = new Parser();

export const FeedListNavbar = async () => {
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
      try {
        const url = feed.url.startsWith('http')
          ? feed.url
          : `https://${feed.url}`;

        
        const rss = await parser.parseURL(url);

        const data: Feed = {
          id: feed.id,
          title: feed?.name || rss.title,
          description: rss.description,
          url: feed.url,
          items: rss.items,
        }

        return data;
      } catch (e) {
        // TODO: Improve the error handling when
        return null;
      }
    }));
  }

  const feeds = (await getFeeds()).filter(feed => feed !== null) as Feed[];

  return (
    <Section size='1' p='0' style={{ height: '100vh' }}>
      <Flex direction='column' gap='4'>
        {feeds.map(feed => (
          <CardFeedItem
            key={feed.id}
            feed={feed}
          />
        ))}
      </Flex>
    </Section>
  );
}
