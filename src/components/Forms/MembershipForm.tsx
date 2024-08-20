import React from "react";
import { GGButton } from "../UI";
import { Input } from "../Common";

import { Formik } from "formik";

const MembershipForm = () => {
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
