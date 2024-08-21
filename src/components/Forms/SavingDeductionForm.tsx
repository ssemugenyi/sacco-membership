import React, { useEffect, useState } from "react";
import { GGTable, Input } from "../Common";
import { GGButton } from "../UI";
import { Formik } from "formik";
import { auth, db } from "../../store/firebase";
import { onValue, push, ref } from "firebase/database";

const SavingDeductionForm = () => {
  const [Data, setData] = useState<any>({});
  const user = auth?.currentUser;

  const handleSubmitHandler = async (values: any) => {
    push(ref(db, "savings/"), {
      cellPhone: values.cellPhone,
      employerName: values.employerName,
      membershipNumber: values.membershipNumber,
      employeeSignature: values.employeeSignature,
      administratorSignature: values.administratorSignature,
      hrSignature: values.hrSignature,
      dob: values.dob,
      email: user?.email,
    });
  };
  useEffect(() => {
    const starCountRef = ref(db, "savings/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);

  const formData =
    [...Object.values(Data)]?.find(
      (obj: any) => (obj.email as any) === user?.email
    ) || ({} as any);

  const isAdmin = user?.email === "ssemugenyiisaac2@gmail.com";

  return (
    <div>
      {isAdmin ? (
        <div>
          <GGTable
            showExportButton
            onEditHandler={() => {}}
            data={([...Object.values(Data)] as any) || []}
            columns={[
              {
                Header: "Cell Phone",
                accessor: "cellPhone",
              },
              {
                Header: "Employer Name",
                accessor: "employerName",
              },
              {
                Header: "Membership Number",
                accessor: "membershipNumber",
              },
              {
                Header: "Employee Signature",
                accessor: "employeeSignature",
              },
              {
                Header: "Administrator Signature",
                accessor: "administratorSignature",
              },
              {
                Header: "HR Signature",
                accessor: "hrSignature",
              },
              {
                Header: "DOB",
                accessor: "dob",
              },
            ]}
          />
        </div>
      ) : (
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
                I hereby give the Company permission to deduct from my salary,
                an amount equivalent to Ugx 50,000 and Ugx 30,000 being payment
                for my membership and annual subscription respectively, under
                the 212 Staff SACCO.
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
                disable={!dirty || !isValid}
                width="100%"
              >
                Submit
              </GGButton>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default SavingDeductionForm;
