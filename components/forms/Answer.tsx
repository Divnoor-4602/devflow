"use client";

import React, { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { AnswerSchema } from "../../lib/validations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import Image from "next/image";

const Answer = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const handleCreateAnswer = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateAnswer)}
        className="mt-6 flex w-full flex-col gap-4"
      >
        <div className="flex-between flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-2">
          <div className="paragraph-semibold text-dark400_light800">
            Write your answer here
          </div>
          <Button
            className="background-light800_dark300 btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none"
            onClick={() => {}}
          >
            <Image
              src="/assets/icons/stars.svg"
              alt="star icon"
              width={12}
              height={12}
            />
            Generate AI answer
          </Button>
        </div>
        {/* answer tiny mce editor */}
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormControl className="mt-3.5">
                {/* Special editor component for posting questions */}
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(
                    _evt,
                    editor // @ts-ignore
                  ) => (editorRef.current = editor)}
                  initialValue=""
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "codesample | bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: mode === "dark" ? "oxide-dark" : "oxide",
                    content_css: mode === "dark" ? "dark" : "light",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-[14px] text-light-400 dark:text-light-500">
                Write your answer here in detail. Minimum 100 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="button"
            className="primary-gradient w-fit text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Answer"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Answer;
