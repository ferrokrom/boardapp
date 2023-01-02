import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { axios } from "../../../api/axios"

import { Section } from "../../../types";
import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { BsChevronCompactLeft } from "react-icons/bs";

const header = requestHeader();

type UpdateSectionRequestBody = {
  title?: string;
  description?: string | undefined;
  dueDate: Date;
  color?: string | undefined;
};
type UpdateSectionResponse = {
  data: Section;
};
type UpdateSectionDTO = {
  data: {
    sectionId: string;
    body: UpdateSectionRequestBody;
  };
};
type CustomResponse = {
  data: UpdateSectionResponse;
  errors: null | string;
  statusCode: number;
  token: string | undefined;
};

export const updateSection = ({
  data,
}: UpdateSectionDTO): Promise<CustomResponse> => {
  return axios.put(
    "/update?sectionId=" + data.sectionId,
    {
      title: data.body.title,
      description: data.body.description,
      color: data.body.color,
      duedate: data.body.dueDate,
    },
    header
  );
};

export const useUpdateSection = ({ boardId }: { boardId: string }) => {
  return useMutation({
    onMutate: async (updatedSection) => {
      await queryClient.cancelQueries(["sections", boardId]);
      const previousSections = queryClient.getQueryData<AxiosResponse>([
        "sections",
        boardId,
      ]);
      console.log("prevsection", previousSections?.data.data);
      queryClient.setQueryData(
        ["sections", boardId],
        previousSections?.data.data.forEach((element: any) => {
          if (element.id === updatedSection.data.sectionId) {
            element.title = updatedSection.data.body.title;
            element.description = updatedSection.data.body.description;
            element.duedate = updatedSection.data.body.dueDate;
            element.color = updatedSection.data.body.color;
          }
        })
      );
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
    },
    mutationFn: updateSection,
  });
};
