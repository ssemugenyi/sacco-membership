import React from "react";
import { Input } from "../Common";
import { GGButton } from "../UI";
import { Formik } from "formik";

const DeductionForm = () => {
  return (
    <div>
      {" "}
      <Formik
        enableReinitialize
        initialValues={{
          email: "",
        }}
        // validationSchema={forgotPasswordSchema}
        onSubmit={async (values) => {
          //   await handleSubmitHandler(values);
        }}
      >
        {({ handleSubmit, dirty, isValid }) => (
          <form className="p-8 rounded-md shadow">
            <h2 className="font-bold uppercase text-md my-3">
              212 Staff SACCO Membership - Salary Deduction Form
            </h2>
            <Input type="text" name="employerName" label="Employer Name" />
            <Input type="text" name="cellPhone" label="Cell phone" />
            <Input
              type="text"
              name="membershipNumber"
              label="SACCO Membership Number"
            />

            <p className="my-3">
              I hereby give the Company permission to deduct from my salary, an
              amount equivalent to Ugx 50,000 and Ugx 30,000 being payment for
              my membership and annual subscription respectively, under the 212
              Staff SACCO.
            </p>

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              <Input
                type="text"
                name="employeeSignature"
                label="Employee Signature"
              />
              <Input type="date" name="dob" label="Date" />
            </div>

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              <Input
                type="text"
                name="employeeSignature"
                label="Approved by SACCO Administrator"
              />
              <Input type="date" name="dob" label="Date" />
            </div>

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 mb-3">
              <Input
                type="text"
                name="employeeSignature"
                label="Authorized by HR Manage"
              />
              <Input type="date" name="dob" label="Date" />
            </div>

            <GGButton
              type="submit"
              onClick={handleSubmit}
              disable={!dirty || !isValid}
              width="100%"
            >
              Submit
            </GGButton>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default DeductionForm;
