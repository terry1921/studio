import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { musicTracks } from "@/lib/mock-data";
import { Icons } from "@/components/icons";
import { Button } from "./ui/button";

export function MusicShowcase() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">From the Playlist</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {musicTracks.map((track, index) => (
            <li key={track.id}>
              <div className="flex items-center gap-4">
                <Image
                  src={track.albumArtUrl}
                  alt={`Album art for ${track.title}`}
                  width={64}
                  height={64}
                  className="rounded-md"
                  data-ai-hint={track.aiHint}
                />
                <div className="flex-grow">
                  <p className="font-semibold">{track.title}</p>
                  <p className="text-sm text-muted-foreground">{track.artist}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer" aria-label="Listen on Spotify">
                            <Icons.spotify className="h-5 w-5"/>
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href={track.appleMusicUrl} target="_blank" rel="noopener noreferrer" aria-label="Listen on Apple Music">
                            <Icons.appleMusic className="h-5 w-5"/>
                        </a>
                    </Button>
                </div>
              </div>
              {index < musicTracks.length - 1 && <Separator className="mt-4"/>}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
