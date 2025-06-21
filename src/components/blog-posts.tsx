import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { blogPosts } from "@/lib/mock-data";

export function BlogPosts() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline text-3xl">From The Blog</CardTitle>
            <CardDescription>Insights, tutorials, and inspiration for creators.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-8">
                {blogPosts.map((post) => (
                    <article key={post.id}>
                        <div className="grid gap-1">
                            <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <h3 className="text-xl font-semibold font-headline text-primary">
                                <a href={post.url} className="hover:underline">{post.title}</a>
                            </h3>
                            <p className="text-muted-foreground">{post.excerpt}</p>
                            <Button variant="link" asChild className="p-0 h-auto justify-start w-fit">
                                <a href={post.url}>
                                Read More <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </article>
                ))}
            </div>
        </CardContent>
    </Card>
  );
}
