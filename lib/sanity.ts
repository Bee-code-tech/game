import { createClient } from '@sanity/client';

export const client = createClient({
  dataset: 'production',
    projectId: '5ahtvdeq',
   apiVersion: '2021-03-25',
  useCdn: false,
});
