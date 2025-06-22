'use server';

import { z } from 'zod';
import { firestore } from '@/lib/firebase';
import { collection, addDoc, getCountFromServer, serverTimestamp } from 'firebase/firestore';

const productSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  storeUrl: z.string().url({ message: "Please enter a valid URL." }),
  label: z.enum(['Sticker', 'Bumper Sticker', 'Button', 'Magnet', 'T-shirt'], { 
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

  try {
    const productsCollection = collection(firestore, 'products');
    const countSnapshot = await getCountFromServer(productsCollection);
    const newId = countSnapshot.data().count + 1;

    await addDoc(productsCollection, {
      id: newId,
      title: parsed.data.title,
      storeUrl: parsed.data.storeUrl,
      label: parsed.data.label,
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
