import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { storeInfo } from "@/lib/mock-data";
import { Badge } from "./ui/badge";
import { ArrowRight, Shirt, Sticker, Magnet, Circle, DraftingCompass } from "lucide-react";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import type { Product } from "@/lib/types";

const categoryIcons: Record<Product["category"], React.ReactNode> = {
  'T-Shirt': <Shirt className="h-4 w-4" />,
  'Sticker': <Sticker className="h-4 w-4" />,
  'Magnet': <Magnet className="h-4 w-4" />,
  'Button': <Circle className="h-4 w-4" />,
  'Bumper Sticker': <DraftingCompass className="h-4 w-4" />,
};


export async function ProductShowcase() {
  let products: Product[] = [];

  try {
    const productsCollection = collection(firestore, 'products');
    const q = query(productsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    products = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const aiHint = data.title ? data.title.toLowerCase().split(' ').slice(0, 2).join(' ') : 'product image';
      return {
        id: data.id,
        name: data.title,
        category: data.label,
        imageUrl: `https://placehold.co/400x400.png`,
        aiHint: aiHint,
      } as Product;
    });
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    // On error, products will be an empty array, and a message will be shown.
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Our Products</CardTitle>
        <CardDescription>High-quality, custom-made goods to express yourself.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col">
              <div className="relative aspect-square w-full">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  data-ai-hint={product.aiHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                 <Badge variant="secondary" className="flex items-center gap-2 w-fit">
                  {categoryIcons[product.category]}
                  {product.category}
                </Badge>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            No products have been added yet. Come back soon!
          </p>
        )}
      </CardContent>
       <CardFooter className="flex flex-col sm:flex-row items-center gap-6 bg-muted/50 p-6 rounded-b-lg">
        <div className="flex-grow flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-lg font-semibold font-headline">Have an idea?</h3>
            <p className="text-muted-foreground mb-4">Bring your design to life on our store.</p>
            <Button asChild>
                <a href={storeInfo.storeUrl} target="_blank" rel="noopener noreferrer">
                    Submit to Store <ArrowRight className="ml-2 h-4 w-4" />
                </a>
            </Button>
        </div>
        <div className="flex flex-col items-center">
            <Image
                src={storeInfo.qrCodeUrl}
                alt="QR Code for store"
                width={100}
                height={100}
                className="rounded-lg"
                data-ai-hint={storeInfo.qrCodeAiHint}
            />
            <p className="text-xs text-muted-foreground mt-2">Scan to shop</p>
        </div>
      </CardFooter>
    </Card>
  );
}
