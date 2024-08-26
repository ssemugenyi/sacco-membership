import React, { useEffect, useState } from "react";
import { GGButton } from "../UI";
import { Formik } from "formik";
import { Input } from "../Common";
import { SlClose } from "react-icons/sl";

const BenefeciariesForm = ({
  setFieldValue,
  beneficiariesData,
}: {
  setFieldValue: any;
  beneficiariesData: any;
}) => {
  const [beneficiaries, setBeneficiaries] = useState<any>([]);

  useEffect(() => {
    setBeneficiaries(beneficiariesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitHandler = async (values: any) => {
    setBeneficiaries([...beneficiaries, values]);
  };

  useEffect(() => {
    setFieldValue("beneficiaries", beneficiaries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beneficiaries]);

  return (
    <div>
      <div className="my-2">
        {beneficiaries?.map((item: any, index: number) => (
          <div
            className={`p-1 grid gap-3 grid-col-1 sm:grid-cols-4 my-1 font-sans relative group cursor-pointer ${
              index % 2 === 0 ? "bg-primary/10 " : ""
            }`}
            key={index}
          >
            <p className="capitalize">{item.fname}</p>
            <p>{item.relationship}</p>
            <p>{item.Age}</p>
            <p>{item.dob}</p>
            <button
              className=" absolute top-0 right-1 text-red-500 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setBeneficiaries(
                  beneficiaries.filter((_: any, i: number) => i !== index)
                );
              }}
            >
              <SlClose className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          fname: "",
          relationship: "",
          Age: "",
          dob: "",
        }}
        // validationSchema={forgotPasswordSchema}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmitHandler(values);
          resetForm();
        }}
      >
        {({ handleSubmit, dirty, isValid, resetForm }) => (
          <form className="py-3 rounded-md shadow">
            <div className="grid gap-3 grid-col-1 sm:grid-cols-4">
              <Input type="text" name="fname" label="Full Name" />
              <Input type="text" name="relationship" label="Relationship" />
              <Input type="text" name="Age" label="Age" />
              <Input type="date" name="dob" label="Date Of Birth" />
            </div>
            <GGButton
              type="submit"
              onClick={handleSubmit}
              disable={!dirty || !isValid}
            >
              Add
            </GGButton>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BenefeciariesForm;
