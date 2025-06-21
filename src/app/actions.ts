'use server';

import { suggestBlogTopics } from "@/ai/flows/suggest-blog-topics";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  topic: z.string().min(2, { message: "Topic must be at least 2 characters long." }),
  storeFocus: z.string().min(2, { message: "Store focus must be at least 2 characters long." }),
});

export type FormState = {
  message: string | null;
  topics: string[];
  errors?: {
    topic?: string[];
    storeFocus?: string[];
  };
};

export async function getTopicSuggestions(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = formSchema.safeParse({
    topic: formData.get('topic'),
    storeFocus: formData.get('storeFocus'),
  });

  if (!parsed.success) {
    return {
      message: 'Invalid form data.',
      topics: [],
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await suggestBlogTopics(parsed.data);
    if (!result.topics || result.topics.length === 0) {
      return { 
        message: "No topics generated. Try a different keyword.", 
        topics: [] 
      };
    }
    return { 
      message: 'Success!', 
      topics: result.topics,
      errors: {} 
    };
  } catch (error) {
    console.error(error);
    return { 
      message: "An error occurred while generating topics. Please try again.", 
      topics: [] 
    };
  }
}
