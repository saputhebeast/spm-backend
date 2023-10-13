'use strict';

import {
  TextAnalyticsClient,
  AzureKeyCredential,
} from '@azure/ai-text-analytics';
import { Item, Preference, Review } from '@prisma/client';
import { ReviewUpdateDto } from './dto';
import { PreferenceCreateUpdateDto } from '../preference/dto';

const key = process.env.LANGUAGE_KEY;
const endpoint = process.env.LANGUAGE_ENDPOINT;

const documents = [
  {
    text: '',
    id: '0',
    language: 'en',
  },
];

export async function analyse(
  preference: Preference,
  reviewToAnalyse: Review,
  item: Item,
) {
  documents[0].text = reviewToAnalyse.description;

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));

  const results = await client.analyzeSentiment(documents, {
    includeOpinionMining: true,
  });

  const review = new ReviewUpdateDto();

  const result = results[0];
  if (!result.error) {
    if ('sentiment' in result) {
      review.isPositive = result.sentiment !== 'negative';
    }

    const materials = preference.material.split(',');
    const colors = preference.color.split(',');
    const brands = preference.brand.split(',');
    const types = preference.type.split(',');
    const sizes = preference.size.split(',');

    const material = item.material;
    const color = item.color;
    const brand = item.brand;
    const type = item.tags.split(',')[0];
    const size = item.size;
    const outcome: string[] = [];
    for (const { text, sentiment } of 'sentences' in result
      ? result.sentences
      : null) {
      console.log(text);

      //material
      if (
        (text.includes('material') || text.includes(material)) &&
        sentiment !== 'positive'
      ) {
        const index = materials.indexOf(material);
        if (index > -1) {
          outcome.push(materials.splice(index, 1)[0]);
        }
      }

      //color
      if (
        (text.includes('color') || text.includes(color)) &&
        sentiment !== 'positive'
      ) {
        const index = colors.indexOf(color);
        if (index > -1) {
          outcome.push(colors.splice(index, 1)[0]);
        }
      }

      //brand
      if (
        (text.includes('brand') || text.includes(brand)) &&
        sentiment !== 'positive'
      ) {
        const index = brands.indexOf(brand);
        if (index > -1) {
          outcome.push(brands.splice(index, 1)[0]);
        }
      }

      //type
      if (
        (text.includes('type') || text.includes(type)) &&
        sentiment !== 'positive'
      ) {
        const index = types.indexOf(type);
        if (index > -1) {
          outcome.push(types.splice(index, 1)[0]);
        }
      }

      //size
      if (
        (text.includes('size') || text.includes(size)) &&
        sentiment !== 'positive'
      ) {
        const index = sizes.indexOf(size);
        if (index > -1) {
          outcome.push(sizes.splice(index, 1)[0]);
        }
      }
    }

    const updatePreference = new PreferenceCreateUpdateDto();
    if (materials.length > 0) updatePreference.material = materials;
    if (colors.length > 0) updatePreference.color = colors;
    if (brands.length > 0) updatePreference.brand = brands;
    if (types.length > 0) updatePreference.type = types;
    if (sizes.length > 0) updatePreference.size = sizes;

    review.sentiment =
      outcome.length == 0
        ? 'preference not changed'
        : `preference of ${outcome.join(',')} changed`;

    return { review, updatePreference };
  }

  return null;
}
