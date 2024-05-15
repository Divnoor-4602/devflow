"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { infer, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionSchema } from "@/lib/validations";
import { useTheme } from "@/context/ThemeProvider";
import { createQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";

const type: any = "create";

interface Props {
  mongoUserId: string;
}

const Question = ({ mongoUserId }: Props) => {
  const { mode } = useTheme();

  const router = useRouter();
  const pathname = usePathname();

  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    setIsSubmitting(true);
    try {
      // make an api call and post the qquestion to the backend
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        author: JSON.parse(mongoUserId),
        path: pathname,
      });
      // contain all data
      // navigate to the home page
      router.push("/");
    } catch (error) {
      // handle error
    } finally {
      setIsSubmitting(false);
    }
    console.log(values);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, field: any) {
    if (e.key === "Enter" && field.name === "tags") {
      // prevent default submission
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        // Check tag length
        if (tagValue.length > 15) {
          return form.setError("tags", {
            message: "Tag length should be less than 15 characters",
          });
        }

        // check tag duplication
        if (!field.value.includes(tagValue)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex w-full flex-col gap-[36px]"
        >
          {/* question title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800 text-base">
                  Question title <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    {...field}
                    className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-dark300_light700 min-h-[56px]"
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-[14px] text-light-400 dark:text-light-500">
                  Be specific and imagine you’re asking a question to another
                  person.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* question description */}
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800 text-base">
                  Detailed explanation of your problem?{" "}
                  <span className="text-primary-500">*</span>
                </FormLabel>
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
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                    }}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-[14px] text-light-400 dark:text-light-500">
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* question tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800 text-base">
                  Tags <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <>
                    <Input
                      className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-dark300_light700 min-h-[56px]"
                      placeholder="e.g. reactjs, nodejs, javascript"
                      onKeyDown={(e) => handleKeyDown(e, field)}
                    />
                    {/* show tags if tags have been added */}

                    {field.value.length > 0 && (
                      <div className="flex-start mt-2.5 gap-2.5">
                        {field.value.map((tag) => {
                          return (
                            <>
                              <div
                                key={tag}
                                className="background-light800_dark400 subtle-medium text-dark500_light700 flex items-center gap-2 rounded-md px-4 py-2 text-[10px] uppercase"
                                onClick={() => {
                                  // remover tag on click
                                  form.setValue(
                                    "tags",
                                    field.value.filter((t) => t !== tag)
                                  );
                                }}
                              >
                                {tag}
                                <Image
                                  src="/assets/icons/close.svg"
                                  alt="close icon"
                                  width={12}
                                  height={12}
                                  className="dark:invert-colors cursor-pointer object-contain"
                                />
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-[14px] text-light-400 dark:text-light-500">
                  Add up to 5 tags to describe what your question is about.
                  Start typing to see suggestions.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button
            className="primary-gradient min-h-[46px] w-fit self-end px-4 py-3 text-light-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>{type === "edit" ? "Editing..." : "Posting..."}</>
            ) : (
              <>{type === "edit" ? "Edit Question" : "Post Question"}</>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Question;
