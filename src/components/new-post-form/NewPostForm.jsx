import { Controller, FormProvider, useForm } from "react-hook-form";
import Input from "../input/Input";
import styles from "./NewPostForm.module.css";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const NewPostForm = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const onSubmit = methods.handleSubmit(async (data) => {
    const url = new URL(`${import.meta.env.VITE_API_URL}/posts`);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("published", data.published);
      formData.append("bannerImage", data.bannerImage[0]);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.errors) {
          result.errors.forEach((error) => {
            methods.setError(error.path, {
              message: error.msg,
            });
          });
        }
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.error(error.message);
      methods.setError("root.serverError", {
        message: "Something went wrong!",
      });
    }
  });

  return (
    <section className={styles.section}>
      <h1>Create New Post</h1>
      <FormProvider {...methods}>
        <form
          noValidate
          onSubmit={(e) => e.preventDefault()}
          className={styles.createPostForm}
        >
          <Input
            type="text"
            id="title"
            name="title"
            label="Title"
            validation={{
              required: {
                value: true,
                message: "This field is required!",
              },
              minLength: {
                value: 5,
                message: "Title must contain at least 5 characters",
              },
            }}
          />
          <div className={`${styles.formControl} ${styles.tinymceEditor}`}>
            <label htmlFor="content" className={styles.label}>
              <span>
                Content
                <span className={styles.requiredAsterisk}>*</span>{" "}
                {methods.formState?.errors?.content && (
                  <span className={styles.error} aria-live="polite">
                    ({methods.formState.errors.content.message})
                  </span>
                )}
              </span>
              <Controller
                name="content"
                control={methods.control}
                rules={{
                  required: {
                    value: true,
                    message: "This field is required!",
                  },
                  validate: {
                    // Strip HTML tags and check length of raw text
                    minLength: (value) => {
                      const plainText = value
                        ? value.replace(/<[^>]*>/g, "").trim()
                        : "";
                      return (
                        plainText.length >= 10 ||
                        "Content must be at least 10 characters long"
                      );
                    },
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <Editor
                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                    value={value}
                    onEditorChange={onChange}
                    init={{
                      height: 300,
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
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat",
                    }}
                  />
                )}
              />
            </label>
          </div>
          <Input
            type="file"
            id="bannerImage"
            name="bannerImage"
            label="Banner Image"
            validation={{
              validate: {
                lessThan2MB: (files) => {
                  if (files[0] && files[0].size > 2 * 1024 * 1024) {
                    return "File is too large (max 2MB)";
                  }
                },
                allowedFormats: (files) => {
                  if (
                    files[0] &&
                    !["image/jpeg", "image/png", "image/gif"].includes(
                      files[0].type,
                    )
                  ) {
                    return "Invalid file type. Only JPEG, PNG and GIF are allowed.";
                  }
                },
              },
            }}
          />

          <Input
            type="checkbox"
            id="published"
            name="published"
            label="Publish"
          />

          <div className={styles.formControl}>
            <button
              className={styles.submitBtn}
              onClick={onSubmit}
              disabled={methods.isSubmitting}
            >
              Create
            </button>
          </div>
        </form>
      </FormProvider>
      {methods.formState.errors.root?.serverError && (
        <span
          className={`${styles.error} ${styles.generalError}`}
          aria-live="polite"
        >
          {methods.formState.errors.root.serverError.message}
        </span>
      )}
    </section>
  );
};

export default NewPostForm;
