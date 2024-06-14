import { getQuestions } from "@/lib/actions/question.action";
import { getAllTags } from "@/lib/actions/tag.actions";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // fetch all questions and add them in the sitemap
  const result: any = await getQuestions({});

  const questionEntries: MetadataRoute.Sitemap = result.questions.map(
    (question: any) => {
      return {
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/question/${question._id}`,
      };
    }
  );

  // fetch all the tags
  const tags = await getAllTags({});
  const tagEntries: MetadataRoute.Sitemap = tags.tags.map((tag: any) => {
    return {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/tags/${tag._id}`,
    };
  });

  return [
    { url: `${process.env.NEXT_PUBLIC_SERVER_URL}/ask-question` },
    ...questionEntries,
    ...tagEntries,
  ];
}
