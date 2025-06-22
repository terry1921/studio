'use server';

import { z } from 'zod';
import { firestore } from '@/lib/firebase';
import { collection, addDoc, getCountFromServer, serverTimestamp } from 'firebase/firestore';
import * as cheerio from 'cheerio';

const productSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  storeUrl: z.string().url({ message: "Please enter a valid URL." }),
  label: z.enum(['Sticker', 'Bumper Sticker', 'Button', 'Magnet', 'T-Shirt'], { 
    errorMap: () => ({ message: "Please select a valid label type." })
  }),
});

export type FormState = {
  message: string | null;
  errors?: {
    title?: string[];
    storeUrl?: string[];
    label?: string[];
  };
};

export async function addProduct(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = productSchema.safeParse({
    title: formData.get('title'),
    storeUrl: formData.get('storeUrl'),
    label: formData.get('label'),
  });

  if (!parsed.success) {
    return {
      message: 'Invalid form data. Please check the fields and try again.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  let imageUrl = '';
  try {
    const response = await fetch(parsed.data.storeUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    imageUrl = $('meta[property="og:image"]').attr('content') || '';

    if (!imageUrl) {
        return {
            message: 'Could not automatically find an image at the provided URL. Please check the link.',
            errors: { storeUrl: ['Could not find an image at this URL.'] }
        };
    }
  } catch (e: any) {
      console.error('Scraping error:', e);
      return {
          message: 'Failed to scrape the provided URL for an image. Please ensure it is a valid product page.',
          errors: { storeUrl: ['Failed to get image from this URL.'] }
      };
  }

  try {
    const productsCollection = collection(firestore, 'products');
    const countSnapshot = await getCountFromServer(productsCollection);
    const newId = countSnapshot.data().count + 1;

    await addDoc(productsCollection, {
      id: newId,
      title: parsed.data.title,
      storeUrl: parsed.data.storeUrl,
      label: parsed.data.label,
      imageUrl: imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      message: `Product "${parsed.data.title}" added successfully!`,
      errors: {}
    };
  } catch (error) {
    console.error('Error adding product to Firestore:', error);
    return {
      message: 'Failed to add product due to a server error. Please try again later.',
      errors: {}
    };
  }
}
