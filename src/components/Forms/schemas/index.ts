import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should have atleast 6 characters")
    .required("Password is required"),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

export const registerSchema = yup.object().shape({
  fname: yup.string().required("First name is required"),
  lname: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .min(9, "Phone number should be 9 characters")
    .max(9, "Phone number should be 9 characters"),
  password: yup
    .string()
    .min(6, "Password should have atleast 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password should have atleast 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords do not match")
    .required("Confirm Password is required"),
});

export const updateProfileSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup
    .string()
    .min(9, "Phone number should be 9 characters")
    .max(9, "Phone number should be 9 characters")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  district: yup.string().required("District is required"),
});

export const ProductCategorySchema = yup.object().shape({
  name: yup.string().required("category name is required"),
  description: yup.string(),
  image: yup.string().required("Category Image is required"),
});

export const StoreSchema = yup.object().shape({
  name: yup.string().required("Store name is required"),
  description: yup.string().required("Store description is required"),
  image: yup.string().required("Store Main Image is required"),
  city: yup.string().required("Store City is required"),
  location: yup.string().required("Store Location Image is required"),
  categories: yup.array().required("Store Categories is required").min(1),
});

export const AddOnBoardScreenSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  color: yup.string().required("Color is required"),
  image: yup.string().required("Image is required"),
});

export const SocialSchema = yup.object().shape({
  social: yup.string().required("Social Media Platform is required"),
  userName: yup.string().required("Social Handle is required"),
});

export const editStoreSchema = yup.object().shape({
  ...StoreSchema.fields,
  approved: yup
    .boolean()
    .required("Please accept the temporary deactivation of your store")
    .default(false),
});

/**
 * @name containsPlaceholders
 * @param value
 * @returns
 */
// PRODUCT_NAME PRODUCT_DESCRIPTION PRODUCT_PRICE
const containsPlaceholders = (value: any) => {
  return (
    value.includes("PRODUCT_NAME") &&
    value.includes("PRODUCT_SHOP") &&
    value.includes("PRODUCT_PRICE") &&
    value.includes("PRODUCT_DESCRIPTION")
  );
};
export const shareMessageSchema = yup.object().shape({
  message: yup
    .string()
    .required("Message is required")
    .test(
      "contains-placeholders",
      "Message must contain PRODUCT_NAME, PRODUCT_SHOP, PRODUCT_PRICE and PRODUCT_DESCRIPTION",
      containsPlaceholders
    ),
});
