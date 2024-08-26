import React, { useEffect, useState } from "react";
import { GGButton } from "../UI";
import { GGTable, Input } from "../Common";

import { Formik } from "formik";
import { onValue, set, ref } from "firebase/database";
import { auth, db } from "../../store/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { SlClose } from "react-icons/sl";
import BenefeciariesForm from "./BenefeciariesForm";

const MembershipForm = ({ isEdit }: { isEdit?: boolean }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = auth?.currentUser;
  const userId = user?.uid as string;
  const [Data, setData] = useState<any>({});
  const handleSubmitHandler = async (values: any) => {
    const data = {
      id: id ? id : userId,
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
      bsurname: values.bsurname,
      bothername: values.bothername,
      bdob: values.bdob,
      bprofession: values.bprofession,
      bresidential: values.bresidential,
      bpostalAddress: values.bpostalAddress,
      bemail: values.bemail,
      bemployer: values.bemployer,
      bphone1: values.bphone1,
      bphone2: values.bphone2,
      b2surname: values.b2surname,
      b2otherNames: values.b2otherNames,
      b2dob: values.b2dob,
      b2profession: values.b2profession,
      b2residential: values.b2residential,
      b2postalAddress: values.b2postalAddress,
      b2email: values.b2email,
      b2employer: values.b2employer,
      b2phone1: values.b2phone1,
      b2phone2: values.b2phone2,

      beneficiaries: values.beneficiaries,
      approved: values.approved,
      declinedReason: values.declinedReason,
    };

    const dataToBeSent = data;

    set(ref(db, `memberships/${id ? id : userId}`), dataToBeSent);
  };

  const isAdmin = user?.email === "ssemugenyiisaac2@gmail.com";
  useEffect(() => {
    const starCountRef = ref(
      db,
      `memberships/${isAdmin ? (id ? id : "") : userId}`
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
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
              console.log(data);
              navigate(`${data.id}`);
            }}
            data={([...Object.values(Data)] as any) || []}
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
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            surname: Data?.surname || "",
            otherNames: Data?.otherNames || "",
            dob: Data?.dob || "",
            profession: Data?.profession || "",
            residential: Data?.residential || "",
            postalAddress: Data?.postalAddress || "",
            email: Data?.email || "",
            employer: Data?.employer || "",
            phone1: Data?.phone1 || "",
            phone2: Data?.phone2 || "",
            bsurname: Data?.bsurname || "",
            bothername: Data?.bothername || "",
            bdob: Data?.bdob || "",
            bprofession: Data?.bprofession || "",
            bresidential: Data?.bresidential || "",
            bpostalAddress: Data?.bpostalAddress || "",
            bemail: Data?.bemail || "",
            bemployer: Data?.bemployer || "",
            bphone1: Data?.bphone1 || "",
            bphone2: Data?.bphone2 || "",
            b2surname: Data?.b2surname || "",
            b2otherNames: Data?.b2otherNames || "",
            b2dob: Data?.b2dob || "",
            b2profession: Data?.b2profession || "",
            b2residential: Data?.b2residential || "",
            b2postalAddress: Data?.b2postalAddress || "",
            b2email: Data?.b2email || "",
            b2employer: Data?.b2employer || "",
            b2phone1: Data?.b2phone1 || "",
            b2phone2: Data?.b2phone2 || "",
            beneficiaries: Data?.beneficiaries || [],

            approved: Data?.approved || "",
            declinedReason: Data?.declinedReason || "",
          }}
          // validationSchema={forgotPasswordSchema}
          onSubmit={async (values) => {
            await handleSubmitHandler(values);
            isEdit && navigate("../membership");
          }}
        >
          {({ handleSubmit, dirty, isValid, values, setFieldValue }) => (
            <form className="p-8 rounded-md shadow">
              <h2 className="font-bold uppercase text-md my-3">
                212 STAFF SACCO MEMBERSHIP REGISTRATION FORM
              </h2>

              {!isAdmin &&
                values.declinedReason &&
                values.approved !== "yes" && (
                  <p className="flex items-center gap-4 rounded-md bg-red-300 p-5">
                    <SlClose className="w-6 h-6" />
                    {values.declinedReason}
                  </p>
                )}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input type="text" name="surname" label="Surname" />
                <Input type="text" name="otherNames" label="Other Names" />
                <Input type="date" name="dob" label="Date Of Birth" />
                <Input type="text" name="profession" label="Occupation" />
                <Input type="text" name="residential" label="Residential" />
                <Input
                  type="text"
                  name="postalAddress"
                  label="Postal Address"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  type="text"
                  name="postalAddress"
                  label="Postal Address"
                />
                <Input type="email" name="email" label="Email" />
                <Input type="text" name="employer" label="Employer" />
                <Input type="text" name="phone1" label="Mobile Number" />
                <Input type="text" name="phone2" label="Fixed Number" />
              </div>

              <h2 className="font-bold uppercase text-md my-3">
                Savings beneficiaries declaration
              </h2>
              <p>
                In the event of death, I hereby nominate the following persons
                to be considered for the receipt of all benefits less
                liabilities payable to me, under the 212 Staff SACCO.
              </p>
              <p>
                NB; Persons under the age of 18 years should not be nominated;
                instead a trustee should be considered:
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input type="text" name="bsurname" label="Surname" />
                <Input type="text" name="bothername" label="Other Names" />
                <Input type="date" name="bdob" label="Date Of Birth" />
                <Input type="text" name="bprofession" label="Occupation" />
                <Input type="text" name="bresidential" label="Residential" />
                <Input
                  type="text"
                  name="bpostalAddress"
                  label="Postal Address"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input type="email" name="bemail" label="Email" />
                <Input type="text" name="bemployer" label="Employer" />
                <Input type="text" name="bphone1" label="Mobile Number" />
                <Input type="text" name="bphone2" label="Fixed Number" />
              </div>

              <p className="my-2">
                In the event that the above named beneficiary is totally not
                available is totally absent, I nominate
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input type="text" name="b2surname" label="Surname" />
                <Input type="text" name="b2otherNames" label="Other Name" />
                <Input type="date" name="b2dob" label="Date Of Birth" />
                <Input type="text" name="b2profession" label="Occupation" />
                <Input type="text" name="b2residential" label="Residential" />
                <Input
                  type="text"
                  name="b2postalAddress"
                  label="Postal Address"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input type="email" name="b2email" label="Email" />
                <Input type="text" name="b2employer" label="Employer" />
                <Input type="text" name="b2phone1" label="Mobile Number" />
                <Input type="text" name="b2phone2" label="Fixed Number" />
              </div>

              <h2 className="font-bold uppercase text-md my-3">
                SAVINGS BENEFICIARIES PARTICULARS
              </h2>
              <p>
                (Limited to Spouse, Biological Children and Biological Parents)
              </p>
              <BenefeciariesForm
                setFieldValue={setFieldValue}
                beneficiariesData={values.beneficiaries || []}
              />
              {isAdmin && (
                <div className="grid gap-3 grid-col-1 sm:grid-cols-2">
                  <Input
                    type="select"
                    name="approved"
                    label="Approval Status"
                    options={[
                      { label: "Yes", value: "yes" },
                      { label: "No", value: "no" },
                    ]}
                  />
                  {values.approved === "no" && (
                    <Input
                      type="textarea"
                      name="declinedReason"
                      label="Declined Reason"
                    />
                  )}
                </div>
              )}
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

export default MembershipForm;
