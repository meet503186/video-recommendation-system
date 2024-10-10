"use client";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IFormField } from "@/interfaces/FormField.interface";
import videoSchema from "@/schemas/video.schema";

import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Form } from "../../components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import RenderFormField from "../../components/RenderFormField";
import { Button } from "../../components/ui/button";

const Home = () => {
  const addVideo = useAction(api.video.addVideo);
  const form = useForm<z.infer<typeof videoSchema>>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      category: "",
      description: "",
      thumbnailUrl: "",
      title: "",
      videoUrl: "",
    },
  });

  async function onSubmit(data: z.infer<typeof videoSchema>) {
    addVideo(data)
      .then(() => {
        toast("Video added successfully");
      })
      .catch((err) => {
        console.log(err);
        toast("Error in adding video");
      });
  }

  const fields: Omit<IFormField, "control">[] = [
    {
      inputType: "input",
      name: "title",
      label: "Title",
      placeholder: "Enter video title",
    },
    {
      inputType: "input",
      name: "description",
      label: "Description",
      placeholder: "Enter video description",
    },
    {
      inputType: "input",
      name: "category",
      label: "Category",
      placeholder: "Enter video category",
    },
    {
      inputType: "input",
      name: "videoUrl",
      label: "Video Url",
      placeholder: "Enter video url",
    },
    {
      inputType: "input",
      name: "thumbnailUrl",
      label: "Thumbnail Url",
      placeholder: "Enter thumbnail url",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle className="text-center">Add Video</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {fields.map((field) => (
                <RenderFormField
                  key={field.name}
                  control={form.control}
                  {...field}
                />
              ))}
            </CardContent>
            <CardFooter className="flex w-full justify-end">
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default Home;
