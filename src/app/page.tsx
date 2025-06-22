import { StoreProfile } from '@/components/store-profile';
import { BlogPosts } from '@/components/blog-posts';
import { ProductShowcase } from '@/components/product-showcase';
import { MusicShowcase } from '@/components/music-showcase';
import { Icons } from '@/components/icons';
import { AuthButton } from '@/components/auth-button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-8 text-center flex flex-col items-center">
        <Icons.logo className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-5xl font-headline font-bold">Content Shelf</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
          Your creative space for content and products. We provide the tools and showcase to bring your brand to life.
        </p>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <aside className="lg:col-span-1 flex flex-col gap-8 sticky top-8">
            <StoreProfile />
            <MusicShowcase />
          </aside>
          
          <div className="lg:col-span-2 flex flex-col gap-8">
            <ProductShowcase />
            <BlogPosts />
          </div>
        </div>
      </main>

      <footer className="w-full py-6 px-4 md:px-6 border-t mt-12">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Content Shelf. All Rights Reserved.</p>
          <AuthButton />
        </div>
      </footer>
    </div>
  );
}
