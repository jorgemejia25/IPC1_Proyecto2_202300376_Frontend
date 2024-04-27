import { PostCategory } from "../enums/post-category";

export const postCategories: { value: string; label: string }[] = [
  {
    value: PostCategory.ANNOUNCEMENT,
    label: "Anuncio Importante",
  },
  {
    value: PostCategory.FUNNY,
    label: "Divertido",
  },
  {
    value: PostCategory.ACADEMIC,
    label: "Académico",
  },
  {
    value: PostCategory.VARIETY,
    label: "Variado",
  },
];
