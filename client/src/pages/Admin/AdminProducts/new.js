import { postProduct } from "../../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { Formik, FieldArray } from "formik";
import newProductScheme from "./validations";

import {
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";

function NewProduct() {
  const queryClient = useQueryClient();

  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries("products"), //refetch işlemi gerçekleşiyor
  });

  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Loading...", key: "product_update" });
    console.log(values);

    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };

    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        console.log("Success");

        message.success({
          content: "The product successfuly updated",
          key: "product_update",
          duration: 2,
        });
      },
    });
  };

  return (
    <div>
      <Text fontSize="2xl">Add New Product</Text>

      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          photos: [],
        }}
        validationSchema={newProductScheme}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box my="5" textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />
                    {touched.title && errors.title && (
                      <Text color="red">{errors.title}</Text>
                    )}
                  </FormControl>
                  <FormControl mt="5">
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                      isInvalid={touched.description && errors.description}
                    />

                    {touched.description && errors.description && (
                      <Text color="red">{errors.description}</Text>
                    )}
                  </FormControl>

                  <FormControl mt="5">
                    <FormLabel>Price</FormLabel>
                    <Input
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                      isInvalid={touched.price && errors.price}
                    />

                    {touched.price && errors.price && (
                      <Text color="red">{errors.price}</Text>
                    )}
                  </FormControl>

                  <FormControl mt="5">
                    <FormLabel>Photos</FormLabel>
                    <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <div>
                          {values.photos &&
                            values.photos.map((photo, index) => (
                              <div key={index}>
                                <Input
                                  name={`photos.${index}`}
                                  value={photo}
                                  disabled={isSubmitting}
                                  onChange={handleChange}
                                  w="3xl"
                                />

                                <Button
                                  ml="4"
                                  type="button"
                                  colorScheme="red"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}

                          <Button
                            mt="5"
                            type="button"
                            onClick={() => arrayHelpers.push(``)}
                          >
                            Add a photo
                          </Button>
                        </div>
                      )}
                    />
                  </FormControl>

                  <Button type="submit" width="full" isLoading={isSubmitting}>
                    Save
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}
export default NewProduct;
