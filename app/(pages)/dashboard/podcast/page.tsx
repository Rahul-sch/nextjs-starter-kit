"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Headphones, Mic, Save } from "lucide-react";

export default function PodcastGenerator() {
  // State for podcast generation
  const [podcastText, setPodcastText] = useState("");
  const [language, setLanguage] = useState("english");
  const [voiceGender, setVoiceGender] = useState("male");
  const [playbackSpeed, setPlaybackSpeed] = useState("1.0");
  const [generatedPodcastText, setGeneratedPodcastText] = useState("");
  const [isPodcastLoading, setIsPodcastLoading] = useState(false);

  // State for debate generation
  const [firstDebater, setFirstDebater] = useState("");
  const [secondDebater, setSecondDebater] = useState("");
  const [debatePlaybackSpeed, setDebatePlaybackSpeed] = useState("1.0");
  const [generatedDebateText, setGeneratedDebateText] = useState("");
  const [isDebateLoading, setIsDebateLoading] = useState(false);

  // Handle podcast generation
  const handleGeneratePodcast = async () => {
    if (!podcastText) return;

    setIsPodcastLoading(true);
    try {
      const response = await fetch("/api/generate-podcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: podcastText,
          language,
          voiceGender,
          playbackSpeed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate podcast");
      }

      const data = await response.json();
      setGeneratedPodcastText(data.text);
    } catch (error) {
      console.error("Error generating podcast:", error);
    } finally {
      setIsPodcastLoading(false);
    }
  };

  // Handle debate generation
  const handleGenerateDebate = async () => {
    if (!firstDebater || !secondDebater) return;

    setIsDebateLoading(true);
    try {
      const response = await fetch("/api/generate-debate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstDebater,
          secondDebater,
          playbackSpeed: debatePlaybackSpeed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate debate");
      }

      const data = await response.json();
      setGeneratedDebateText(data.text);
    } catch (error) {
      console.error("Error generating debate:", error);
    } finally {
      setIsDebateLoading(false);
    }
  };

  // Handle saving podcast
  const handleSavePodcast = () => {
    console.log("Saving podcast");
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Podcast Generator
        </h1>
        <p className="text-muted-foreground mt-2">
          Create and save your custom podcasts
        </p>
      </div>

      <Tabs defaultValue="podcast" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="podcast" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            Generate Podcast
          </TabsTrigger>
          <TabsTrigger value="debate" className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            Generate Debate
          </TabsTrigger>
        </TabsList>

        {/* Podcast Generation Tab */}
        <TabsContent value="podcast">
          <Card>
            <CardHeader>
              <CardTitle>Generate Podcast</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="podcast-text">Podcast Content</Label>
                <Textarea
                  id="podcast-text"
                  placeholder="Enter the content for your podcast..."
                  className="min-h-[200px]"
                  value={podcastText}
                  onChange={(e) => setPodcastText(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Voice Gender</Label>
                  <div className="flex items-center space-x-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="male-voice"
                        checked={voiceGender === "male"}
                        onCheckedChange={() => setVoiceGender("male")}
                      />
                      <Label htmlFor="male-voice">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="female-voice"
                        checked={voiceGender === "female"}
                        onCheckedChange={() => setVoiceGender("female")}
                      />
                      <Label htmlFor="female-voice">Female</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="playback-speed">Playback Speed</Label>
                  <Select
                    value={playbackSpeed}
                    onValueChange={setPlaybackSpeed}
                  >
                    <SelectTrigger id="playback-speed">
                      <SelectValue placeholder="Select speed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0.5x</SelectItem>
                      <SelectItem value="0.75">0.75x</SelectItem>
                      <SelectItem value="1.0">1.0x</SelectItem>
                      <SelectItem value="1.25">1.25x</SelectItem>
                      <SelectItem value="1.75">1.75x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  onClick={handleGeneratePodcast}
                  disabled={!podcastText || isPodcastLoading}
                >
                  {isPodcastLoading ? "Generating..." : "Generate Podcast"}
                </Button>
                <Button variant="outline" onClick={handleSavePodcast}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Podcast
                </Button>
              </div>

              {generatedPodcastText && (
                <div className="mt-4 p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold mb-2">Generated Transcript:</h3>
                  <p>{generatedPodcastText}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Debate Generation Tab */}
        <TabsContent value="debate">
          <Card>
            <CardHeader>
              <CardTitle>Generate Debate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="first-debater">First Debater</Label>
                <Textarea
                  id="first-debater"
                  placeholder="Enter content for the first debater..."
                  className="min-h-[150px]"
                  value={firstDebater}
                  onChange={(e) => setFirstDebater(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="second-debater">Second Debater</Label>
                <Textarea
                  id="second-debater"
                  placeholder="Enter content for the second debater..."
                  className="min-h-[150px]"
                  value={secondDebater}
                  onChange={(e) => setSecondDebater(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="debate-playback-speed">Playback Speed</Label>
                <Select
                  value={debatePlaybackSpeed}
                  onValueChange={setDebatePlaybackSpeed}
                >
                  <SelectTrigger id="debate-playback-speed">
                    <SelectValue placeholder="Select speed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="0.75">0.75x</SelectItem>
                    <SelectItem value="1.0">1.0x</SelectItem>
                    <SelectItem value="1.25">1.25x</SelectItem>
                    <SelectItem value="1.75">1.75x</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  onClick={handleGenerateDebate}
                  disabled={!firstDebater || !secondDebater || isDebateLoading}
                >
                  {isDebateLoading ? "Generating..." : "Generate Debate"}
                </Button>
                <Button variant="outline" onClick={handleSavePodcast}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Podcast
                </Button>
              </div>

              {generatedDebateText && (
                <div className="mt-4 p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold mb-2">Generated Transcript:</h3>
                  <p>{generatedDebateText}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
