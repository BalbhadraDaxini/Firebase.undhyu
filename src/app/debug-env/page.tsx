
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DebugEnvPage() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const apiToken = process.env.SHOPIFY_STOREFRONT_API_TOKEN;

  const partiallyHideToken = (token: string | undefined) => {
    if (!token || token.trim() === "") {
      return <span className="text-destructive font-semibold">Not Set or Empty</span>;
    }
    if (token.length < 8) {
      return "Token is too short to display securely.";
    }
    return `${token.substring(0, 4)}...${token.substring(token.length - 4)}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Environment Variable Debugger</CardTitle>
            <CardDescription>
              This page displays the environment variables as seen by the Next.js server.
              Verify these values match what you have set in your <code>.env.local</code> file.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-md">
              <span className="font-medium text-muted-foreground">SHOPIFY_STORE_DOMAIN:</span>
              <code className="font-mono text-lg">
                {storeDomain ? storeDomain : <span className="text-destructive font-semibold">Not Set</span>}
              </code>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-md">
              <span className="font-medium text-muted-foreground">SHOPIFY_STOREFRONT_API_TOKEN:</span>
              <code className="font-mono text-lg">
                {partiallyHideToken(apiToken)}
              </code>
            </div>
            <div className="pt-4 text-sm text-muted-foreground">
              <p>
                If these values are "Not Set" or incorrect, please ensure your <code>.env.local</code> file is in the root directory of your project and contains the correct values.
              </p>
              <p className="mt-2">
                After verifying, you may need to restart the development server for the changes to take effect.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
