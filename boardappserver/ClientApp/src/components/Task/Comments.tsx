import React, { FormEvent, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import useAuth from "../../Auth/useAuth";
import { useCreateComment } from "../../features/comments/api/createComment";
import { useGetCommentsByTodo } from "../../features/comments/api/getCommentsByTodoId";
import Button from "../Elements/Button";
import TextareaField from "../Elements/TextareaField";
import CommentItem from "./CommentItem";

function Comments({ todoId }: { todoId: string }) {
  const { user } = useAuth();
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");

  const createCommentMutation = useCreateComment({ todoId });
  const { data, isLoading } = useGetCommentsByTodo({ todoId });
  const [allComments, setAllComments] = useState(data?.data.data);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);
  console.log("all", allComments);
  useEffect(() => {
    if (data) {
      setAllComments(data?.data.data);
    }
  }, [data]);

  function handleNewComment(e: FormEvent) {
    e.preventDefault();
    const data = {
      todoId: todoId,
      userId: userId,
      body: {
        subject: comment,
        formFile: "",
      },
    };
    createCommentMutation.mutateAsync({ data });
  }

  return (
    <section className=" py-2 lg:py-3 ">
      <div className="max-w-2xl smx-auto ">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm text-gray-900 dark:text-slate">
            Comments ({allComments?.length})
          </h2>
        </div>
        <form className="mb-1" onSubmit={handleNewComment}>
          <div className=" mb-1 bg-white rounded-lg rounded-t-lg  border-gray-200 dark:border-gray-700 mb-4">
            <TextareaField
              isLoading={false}
              value={comment}
              label=""
              placeholder="Write a comment..."
              classname=""
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <Button
            icon={<FaCheck size={12} />}
            size="md"
            type="submit"
            isLoading={createCommentMutation.isLoading}
            text="Send"
            variant="primary"
            classname="h-8 rounded-full"
          />
        </form>
        <div className="overflow-auto mb-2" style={{ maxHeight: "400px" }}>
          {!isLoading &&
            allComments
              ?.map((comment: any) => <CommentItem commentItem={comment} />)
              .reverse()}
        </div>
      </div>
    </section>
  );
}

export default Comments;
