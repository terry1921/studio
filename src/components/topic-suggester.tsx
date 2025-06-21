'use client';

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getTopicSuggestions, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Lightbulb, List, Loader2, ServerCrash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Lightbulb className="mr-2 h-4 w-4" />
          Get Suggestions
        </>
      )}
    </Button>
  );
}

export function TopicSuggester() {
  const initialState: FormState = { message: null, topics: [] };
  const [state, dispatch] = useActionState(getTopicSuggestions, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'Invalid form data.' && state.message !== 'Success!') {
      toast({
        title: state.message.includes('error') ? 'Error' : 'Notification',
        description: state.message,
        variant: state.message.includes('error') ? 'destructive' : 'default',
      });
    }
  }, [state, toast]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">AI Topic Suggester</CardTitle>
        <CardDescription>
          Stuck on what to write? Enter a keyword and your store's focus to get unique blog topic ideas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Keyword or Topic</Label>
            <Input id="topic" name="topic" placeholder="e.g., retro gaming, space exploration" />
            {state.errors?.topic && (
              <p className="text-sm text-destructive">{state.errors.topic[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeFocus">Store Focus</Label>
            <Input id="storeFocus" name="storeFocus" placeholder="e.g., t-shirts, stickers, magnets" />
            {state.errors?.storeFocus && (
              <p className="text-sm text-destructive">{state.errors.storeFocus[0]}</p>
            )}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
      {state.topics.length > 0 && (
        <CardFooter>
          <Alert>
            <List className="h-4 w-4" />
            <AlertTitle className="font-headline">Generated Topics</AlertTitle>
            <AlertDescription>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {state.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </CardFooter>
      )}
    </Card>
  );
}
