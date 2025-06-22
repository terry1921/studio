'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, PackagePlus } from 'lucide-react';
import type { FormState } from '@/app/dashboard/actions';
import { addProduct } from '@/app/dashboard/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding Product...
        </>
      ) : (
        <>
          <PackagePlus className="mr-2 h-4 w-4" />
          Add Product
        </>
      )}
    </Button>
  );
}

export function ProductUploader() {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(addProduct, initialState);
  const { toast } = useToast();

  const labelTypes = ['Sticker', 'Bumper Sticker', 'Button', 'Magnet', 'T-shirt'];

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.message.includes('error') || state.message.includes('Failed') || state.message.includes('Invalid') ? 'Error' : 'Success',
        description: state.message,
        variant: state.message.includes('error') || state.message.includes('Failed') || state.message.includes('Invalid') ? 'destructive' : 'default',
      });
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Add New Product</CardTitle>
        <CardDescription>
          Upload your product details to the store. The ID will be generated automatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input id="title" name="title" placeholder="e.g., Cool Alien Sticker" />
            {state.errors?.title && (
              <p className="text-sm text-destructive">{state.errors.title[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeUrl">Store URL</Label>
            <Input id="storeUrl" name="storeUrl" placeholder="https://your.store/product-link" />
            {state.errors?.storeUrl && (
              <p className="text-sm text-destructive">{state.errors.storeUrl[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="label">Label Type</Label>
            <Select name="label">
              <SelectTrigger id="label">
                <SelectValue placeholder="Select a label type" />
              </SelectTrigger>
              <SelectContent>
                {labelTypes.map(label => (
                  <SelectItem key={label} value={label}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.label && (
              <p className="text-sm text-destructive">{state.errors.label[0]}</p>
            )}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
