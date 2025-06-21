'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting blog topics based on a keyword or topic.
 *
 * - suggestBlogTopics - A function that takes a topic/keyword and returns a list of suggested blog topics.
 * - SuggestBlogTopicsInput - The input type for the suggestBlogTopics function.
 * - SuggestBlogTopicsOutput - The return type for the suggestBlogTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBlogTopicsInputSchema = z.object({
  topic: z.string().describe('The main topic or keyword for blog post ideas.'),
  storeFocus: z.string().describe('The general focus of the store. e.g. stickers, t-shirts, magnets'),
});
export type SuggestBlogTopicsInput = z.infer<typeof SuggestBlogTopicsInputSchema>;

const SuggestBlogTopicsOutputSchema = z.object({
  topics: z.array(z.string()).describe('A list of suggested blog post topics.'),
});
export type SuggestBlogTopicsOutput = z.infer<typeof SuggestBlogTopicsOutputSchema>;

export async function suggestBlogTopics(input: SuggestBlogTopicsInput): Promise<SuggestBlogTopicsOutput> {
  return suggestBlogTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBlogTopicsPrompt',
  input: {schema: SuggestBlogTopicsInputSchema},
  output: {schema: SuggestBlogTopicsOutputSchema},
  prompt: `You are a creative content strategist specializing in generating engaging blog post ideas.

  Given the following topic and store focus, generate a list of blog post topics that would attract visitors to the store.

  Topic: {{{topic}}}
  Store Focus: {{{storeFocus}}}

  Blog Post Topics:
  `, 
});

const suggestBlogTopicsFlow = ai.defineFlow(
  {
    name: 'suggestBlogTopicsFlow',
    inputSchema: SuggestBlogTopicsInputSchema,
    outputSchema: SuggestBlogTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
