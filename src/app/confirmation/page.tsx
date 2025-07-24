import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl font-headline font-semibold">
            Thank You For Your Order!
          </CardTitle>
          <CardDescription>
            Your order has been placed successfully. A confirmation email has been sent to you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            Your Order ID is: <span className="font-semibold text-primary">#{(Math.random() * 1000000).toFixed(0)}</span>
          </p>
          <p className="text-muted-foreground">You can track your order status in your account page.</p>
          <Button asChild size="lg" className="mt-4 bg-white text-black hover:bg-black hover:text-white font-bold rounded-none transition-colors duration-300">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
