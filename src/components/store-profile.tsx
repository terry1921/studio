import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { storeInfo } from "@/lib/mock-data";
import { Mail, MapPin, Phone } from "lucide-react";

export function StoreProfile() {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24 border-4 border-primary">
              <AvatarImage 
                src={storeInfo.profileImageUrl} 
                alt={storeInfo.name} 
                data-ai-hint={storeInfo.profileImageAiHint}
              />
              <AvatarFallback>{storeInfo.name.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
        <CardTitle className="font-headline text-2xl">{storeInfo.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-6">{storeInfo.bio}</p>
        <Separator className="my-4"/>
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 text-accent" />
            <a href={`mailto:${storeInfo.email}`} className="hover:underline">
              {storeInfo.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="h-5 w-5 text-accent" />
            <span>{storeInfo.phone}</span>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="h-5 w-5 text-accent mt-1 shrink-0" />
            <span>{storeInfo.address}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
