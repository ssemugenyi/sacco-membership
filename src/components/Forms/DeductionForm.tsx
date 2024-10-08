import React, { useEffect, useState } from "react";
import { GGTable, Input } from "../Common";
import { GGButton } from "../UI";
import { Formik } from "formik";
import { auth, db } from "../../store/firebase";
import { onValue, set, ref } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";

const DeductionForm = ({ isEdit }: { isEdit?: boolean }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState<any>({});
  const [membership, setMembership] = useState<any>({});
  const user = auth?.currentUser;
  const userId = user?.uid as string;

  const isAdmin = user?.email === "ssemugenyiisaac2@gmail.com";

  const handleSubmitHandler = async (values: any) => {
    set(ref(db, `deductions/${userId}`), {
      id: id ? id : userId,
      name: values.name,
      cellPhone: values.cellPhone,
      employerName: values.employerName,
      membershipNumber: values.membershipNumber,
      employeeSignature: values.employeeSignature,
      administratorSignature: values.administratorSignature,
      hrSignature: values.hrSignature,
      edob: values.edob,
      adob: values.adob,
      hdob: values.hdob,
      email: user?.email,
    });
  };
  useEffect(() => {
    const starCountRef = ref(
      db,
      `deductions/${isAdmin ? (id ? id : "") : userId}`
    );

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const membership = ref(db, `memberships/${isAdmin ? id : userId}`);
    onValue(membership, (snapshot) => {
      const data = snapshot.val();
      setMembership(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {isAdmin && !isEdit ? (
        <div>
          <GGTable
            showExportButton
            onViewHandler={(data) => {
              navigate(`${data.id}`);
            }}
            data={([...Object.values(Data)] as any) || []}
            columns={[
              {
                Header: "Employee Name",
                accessor: "name",
              },
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
            name: membership?.surname || "",
            cellPhone: membership?.phone1 || "",
            employerName: membership?.employer || "",
            membershipNumber: Data?.membershipNumber || "",
            employeeSignature: membership?.employer || "",
            administratorSignature: Data?.employeeSignature || "",
            hrSignature: Data?.employeeSignature || "",
            edob: "",
            adob: "",
            hdob: "",
          }}
          // validationSchema={forgotPasswordSchema}
          onSubmit={async (values) => {
            await handleSubmitHandler(values);
            isEdit && navigate("../subscription-deduction");
          }}
        >
          {({ handleSubmit, dirty, isValid }) => (
            <form className="p-8 rounded-md shadow">
              <h2 className="font-bold uppercase text-md my-3">
                212 Staff SACCO Membership - Salary Deduction Form
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input type="text" name="name" label="Employee Name" />
                <Input type="text" name="cellPhone" label="Cell phone" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input type="text" name="employerName" label="Employer Name" />
                <Input
                  type="text"
                  name="membershipNumber"
                  label="SACCO Membership Number"
                />
              </div>
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
                <Input type="date" name="edob" label="Date" />
              </div>

              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                <Input
                  type="text"
                  name="administratorSignature"
                  label="Approved by SACCO Administrator"
                />
                <Input type="date" name="adob" label="Date" />
              </div>

              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 mb-3">
                <Input
                  type="text"
                  name="hrSignature"
                  label="Authorized by HR Manage"
                />
                <Input type="date" name="hdob" label="Date" />
              </div>

              <GGButton
                type="submit"
                onClick={handleSubmit}
                disable={!dirty || !isValid}
                width="100%"
              >
                {isEdit ? "Update" : "Submit"}
              </GGButton>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default DeductionForm;
