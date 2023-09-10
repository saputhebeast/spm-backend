'use strict';

import {
  AzureKeyCredential,
  TextAnalysisClient,
} from '@azure/ai-language-text';

const key = process.env.LANGUAGE_KEY;
const endpoint = process.env.LANGUAGE_ENDPOINT;

const documents = [
  {
    text: '',
    id: '0',
    language: 'en',
  },
];

export async function analyse(reviewText: string) {
  documents[0].text = reviewText;

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(key));

  const results = await client.analyze('SentimentAnalysis', documents, {
    includeOpinionMining: true,
  });

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    console.log(`- Document ${result.id}`);
    if (!result.error) {
      console.log(result);
    } else {
      console.error(`\tError: ${result.error}`);
    }
  }
  return results;
}

analyse(documents[0].text).catch((err) => {
  console.error('The sample encountered an error:', err);
});
