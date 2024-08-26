import React from "react";
import DeductionForm from "../../components/Forms/DeductionForm";

const Deduction = ({ isEdit }: { isEdit?: boolean }) => {
  return (
    <div>
      <DeductionForm isEdit={isEdit} />
    </div>
  );
};

export default Deduction;
