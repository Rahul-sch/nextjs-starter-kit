"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Plus } from "lucide-react";
import Link from "next/link";

export default function SavedPodcasts() {
  // In a real app, you would fetch saved podcasts from your backend
  const savedPodcasts: any[] = [];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Saved Podcasts</h1>
          <p className="text-muted-foreground mt-2">
            Listen to your saved podcasts
          </p>
        </div>
        <Link href="/dashboard/podcast">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Podcast
          </Button>
        </Link>
      </div>

      {savedPodcasts.length === 0 ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>No Saved Podcasts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground mb-4">
              You haven't saved any podcasts yet.
            </p>
            <Link href="/dashboard/podcast">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Podcast
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedPodcasts.map((podcast, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{podcast.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {podcast.description}
                </p>
                <Button variant="outline" size="sm">
                  <Play className="mr-2 h-4 w-4" />
                  Play
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
