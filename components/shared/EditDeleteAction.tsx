"use client";

import React from "react";
import Image from "next/image";
import editButton from "../../public/assets/icons/edit.svg";
import deleteButton from "../../public/assets/icons/trash.svg";
import { deleteQuestion } from "@/lib/actions/question.action";
import { deleteAnswer } from "@/lib/actions/answers.action";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const path = usePathname();
  const router = useRouter();

  const showToast = () => {
    toast.success(`Your ${type.toLowerCase()} was deleted successfully!`);
  };

  const handleEdit = () => {
    router.push(`/question/edit/${itemId}`);
  };

  const handleDelete = async () => {
    if (type === "Question") {
      // delete question
      await deleteQuestion({ questionId: JSON.parse(itemId), path });
    } else if (type === "Answer") {
      // delete answer
      await deleteAnswer({ answerId: JSON.parse(itemId), path });
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {type === "Question" && (
          <Image
            src={editButton}
            alt="edit button"
            width={14}
            height={14}
            className="cursor-pointer"
            onClick={handleEdit}
          />
        )}
        <Image
          src={deleteButton}
          alt="delete button"
          width={14}
          height={14}
          onClick={() => {
            handleDelete();
            showToast();
          }}
          className="cursor-pointer"
        />
      </div>
    </>
  );
};

export default EditDeleteAction;
