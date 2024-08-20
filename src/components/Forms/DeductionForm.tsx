import React, { useEffect, useState } from "react";
import { Input } from "../Common";
import { GGButton } from "../UI";
import { Formik } from "formik";
import { db } from "../../store/firebase";
import { onValue, ref, set } from "firebase/database";

const DeductionForm = () => {
  const [formData, setFormData] = useState<any>({});

  const handleSubmitHandler = async (values: any) => {
    set(ref(db, "deductions/"), {
      cellPhone: values.cellPhone,
      employerName: values.employerName,
      membershipNumber: values.membershipNumber,
      employeeSignature: values.employeeSignature,
      administratorSignature: values.administratorSignature,
      hrSignature: values.hrSignature,
      dob: values.dob,
    });
  };
  useEffect(() => {
    const starCountRef = ref(db, "deductions/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setFormData(data);
    });
  }, []);

  const isFilled = Object.keys(formData).length > 0;

  return (
    <div>
      {" "}
      <Formik
        enableReinitialize
        initialValues={{
          cellPhone: formData?.cellPhone || "",
          employerName: formData?.employerName || "",
          membershipNumber: formData?.membershipNumber || "",
          employeeSignature: formData?.employeeSignature || "",
          administratorSignature: formData?.employeeSignature || "",
          hrSignature: formData?.employeeSignature || "",
          dob: "",
        }}
        // validationSchema={forgotPasswordSchema}
        onSubmit={async (values) => {
          await handleSubmitHandler(values);
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
                name="administratorSignature"
                label="Approved by SACCO Administrator"
              />
              <Input type="date" name="dob" label="Date" />
            </div>

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 mb-3">
              <Input
                type="text"
                name="hrSignature"
                label="Authorized by HR Manage"
              />
              <Input type="date" name="dob" label="Date" />
            </div>

            <GGButton
              type="submit"
              onClick={handleSubmit}
              disable={!dirty || !isValid || isFilled}
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
