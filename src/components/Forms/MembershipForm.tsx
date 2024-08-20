import React, { useEffect, useState } from "react";
import { GGButton } from "../UI";
import { GGTable, Input } from "../Common";

import { Formik } from "formik";
import { onValue, push, ref } from "firebase/database";
import { db } from "../../store/firebase";

const MembershipForm = () => {
  const [formData, setFormData] = useState<any>({});
  const handleSubmitHandler = async (values: any) => {
    push(ref(db, "membership/"), {
      surname: values.surname,
      otherNames: values.otherNames,
      dob: values.dob,
      profession: values.profession,
      residential: values.residential,
      postalAddress: values.postalAddress,
      email: values.email,
      employer: values.employer,
      phone1: values.phone1,
      phone2: values.phone2,
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, "membership/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setFormData(data);
    });
  }, []);

  console.log("Test", formData);

  return (
    <div>
      <div>
        <GGTable
          showExportButton
          onEditHandler={() => {}}
          data={([...Object.values(formData)] as any) || []}
          columns={[
            {
              Header: "Surname",
              accessor: "surname",
            },
            {
              Header: "Other Names",
              accessor: "otherNames",
            },
            {
              Header: "DOB",
              accessor: "dob",
            },
            {
              Header: "Profession",
              accessor: "profession",
            },
            {
              Header: "Residential",
              accessor: "residential",
            },
            {
              Header: "Postal Address",
              accessor: "postalAddress",
            },
            {
              Header: "Email",
              accessor: "email",
            },
            {
              Header: "Employer",
              accessor: "employer",
            },
            {
              Header: "Phone 1",
              accessor: "phone1",
            },
            {
              Header: "Phone 2",
              accessor: "phone2",
            },
          ]}
        />
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          surname: formData?.surname || "",
          otherNames: formData?.otherNames || "",
          dob: formData?.dob || "",
          profession: formData?.profession || "",
          residential: formData?.residential || "",
          postalAddress: formData?.postalAddress || "",
          email: formData?.email || "",
          employer: formData?.employer || "",
          phone1: formData?.phone1 || "",
          phone2: formData?.phone2 || "",
        }}
        // validationSchema={forgotPasswordSchema}
        onSubmit={async (values) => {
          await handleSubmitHandler(values);
        }}
      >
        {({ handleSubmit, dirty, isValid }) => (
          <form className="p-8 rounded-md shadow">
            <h2 className="font-bold uppercase text-md my-3">
              212 STAFF SACCO MEMBERSHIP REGISTRATION FORM
            </h2>
            <Input type="text" name="surname" label="Surname" />
            <Input type="text" name="otherNames" label="Other Names" />
            <Input type="date" name="dob" label="Date Of Birth" />
            <Input type="text" name="profession" label="Occupation" />
            <Input type="text" name="residential" label="Residential" />
            <Input type="text" name="postalAddress" label="Postal Address" />
            <Input type="email" name="email" label="Email" />
            <Input type="text" name="employer" label="EMployer" />
            <Input type="text" name="phone1" label="Mobile" />
            <Input type="text" name="phone2" label="Fixed" />
            <h2 className="font-bold uppercase text-md my-3">
              Savings beneficiaries declaration
            </h2>
            <p>
              In the event of death, I hereby nominate the following persons to
              be considered for the receipt of all benefits less liabilities
              payable to me, under the 212 Staff SACCO.
            </p>
            <p>
              NB; Persons under the age of 18 years should not be nominated;
              instead a trustee should be considered:
            </p>

            <Input type="text" name="surname" label="Surname" />
            <Input type="text" name="dob" label="Date Of Birth" />
            <Input type="text" name="profession" label="Occupation" />
            <Input type="text" name="residential" label="Residential" />
            <Input type="text" name="postalAddress" label="Postal Address" />
            <Input type="email" name="email" label="Email" />
            <Input type="text" name="employer" label="EMployer" />
            <Input type="text" name="phone1" label="Mobile" />
            <Input type="text" name="phone2" label="Fixed" />

            <p>
              In the event that the above named beneficiary is totally not
              available is totally absent, I nominate
            </p>
            <Input type="text" name="surname" label="Surname" />
            <Input type="text" name="dob" label="Date Of Birth" />
            <Input type="text" name="profession" label="Occupation" />
            <Input type="text" name="residential" label="Residential" />
            <Input type="text" name="postalAddress" label="Postal Address" />
            <Input type="email" name="email" label="Email" />
            <Input type="text" name="employer" label="EMployer" />
            <Input type="text" name="phone1" label="Mobile" />
            <Input type="text" name="phone2" label="Fixed" />
            <h2 className="font-bold uppercase text-md my-3">
              SAVINGS BENEFICIARIES PARTICULARS
            </h2>
            <p>
              (Limited to Spouse, Biological Children and Biological Parents)
            </p>
            <div className="grid gap-3 grid-col-1 sm:grid-cols-4">
              <Input type="text" name="name" label="Name" />
              <Input type="text" name="Relationship" label="Name" />
              <Input type="text" name="Age" label="Age" />
              <Input type="date" name="dob" label="Date Of Birth" />
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

export default MembershipForm;
