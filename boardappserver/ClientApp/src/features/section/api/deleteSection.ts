import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { Section } from "../../../types";
import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { useDispatch } from "react-redux";
import { createNotification } from "../../notification/notificationSlice";

const header = requestHeader();

export const deleteSection = ({
  sectionId,
}: {
  sectionId: string;
}): Promise<Section[]> => {
  return axios.delete(
    "https://localhost:7170/delete?sectionId=" + sectionId,
    header
  );
};

export const useDeleteSection = ({ boardId }: { boardId: string }) => {
  const dispatch = useDispatch();
  return useMutation({
    onMutate: async (deletedSection) => {
      await queryClient.cancelQueries(["sections", boardId]);
      const previousSections = queryClient.getQueryData<AxiosResponse>([
        "sections",
        boardId,
      ]);
      return { previousSections };
    },
    onError: (_, __, context: any) => {
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
        createNotification({ type: "warning", title: "Section Deleted" })
      );
    },
    mutationFn: deleteSection,
  });
};
