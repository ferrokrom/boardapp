import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Section } from "../../../types";
import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { useDispatch } from "react-redux";
import { createNotification } from "../../notification/notificationSlice";

export type CreateSectionDTO = {
  boardId: string;
};
const header = requestHeader();

export const createSection = ({
  boardId,
}: CreateSectionDTO): Promise<Section[]> => {
  return axios.post("https://localhost:7170/create?boardId=" + boardId);
};
type UseCreateSectionOptions = {
  boardId: string;
};
export const useCreateSection = ({ boardId }: UseCreateSectionOptions) => {
  const dispatch = useDispatch();
  return useMutation({
    onMutate: () => {
      queryClient.cancelQueries(["sections", boardId]);

      const previousSections = queryClient.getQueryData<Section[]>([
        "sections",
        boardId,
      ]);

      return { previousSections };
    },
    onError: (_, __, context) => {
      console.log("errrir");
      if (context?.previousSections) {
        queryClient.setQueryData(
          ["sections", boardId],
          context.previousSections
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["sections", boardId]);
      dispatch(
        createNotification({ type: "success", title: "New Section Created" })
      );
    },
    mutationFn: createSection,
  });
};
