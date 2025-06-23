export const validatePostForm = ({
  author,
  title,
  category,
  content,
  file,
}) => {
  const errors = {};

  if (!author.trim()) errors.author = "Author is required";
  else if (author.trim().length < 3)
    errors.author = "Author must be at least 3 characters";

  if (!title.trim()) errors.title = "Title is required";
  else if (title.trim().length < 5)
    errors.title = "Title must be at least 5 characters";

  if (!category.trim()) errors.category = "Category is required";
  else if (category.trim().length < 3)
    errors.category = "Category must be at least 3 characters";

  if (!content.trim()) errors.content = "Content is required";
  else if (content.trim().length < 20)
    errors.content = "Content must be at least 20 characters";

  if (!file) errors.file = "Cover image is required";

  return errors;
};
