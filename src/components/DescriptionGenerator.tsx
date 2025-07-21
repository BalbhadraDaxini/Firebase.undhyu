"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateProductDescription, GenerateProductDescriptionInput } from '@/ai/flows/generate-product-description';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2 } from 'lucide-react';
import { Separator } from './ui/separator';

const formSchema = z.object({
  title: z.string().min(1, 'Product title is required.'),
  attributes: z.string().min(1, 'Please provide some attributes.'),
});

interface DescriptionGeneratorProps {
    productTitle: string;
    productAttributes: string;
}

export default function DescriptionGenerator({ productTitle, productAttributes }: DescriptionGeneratorProps) {
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: productTitle || '',
      attributes: productAttributes || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setGeneratedDescription('');
    try {
      const result = await generateProductDescription(values);
      setGeneratedDescription(result.description);
    } catch (error) {
      console.error('Error generating description:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate product description. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary"/>
            AI-Assisted Description
        </CardTitle>
        <CardDescription>Generate a compelling product description using AI.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attributes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Attributes</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Color: Red, Material: Silk, Style: Modern" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Description'
              )}
            </Button>
          </form>
        </Form>
        {(isLoading || generatedDescription) && <Separator className="my-6" />}
        {isLoading && (
            <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-5/6 animate-pulse rounded bg-muted"></div>
            </div>
        )}
        {generatedDescription && (
          <div>
            <h3 className="mb-2 text-lg font-semibold">Generated Description:</h3>
            <Textarea value={generatedDescription} readOnly rows={8} className="bg-secondary" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
