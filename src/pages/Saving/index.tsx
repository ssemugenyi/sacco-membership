import React from "react";
import SavingDeductionForm from "../../components/Forms/SavingDeductionForm";

const Saving = ({ isEdit }: { isEdit?: boolean }) => {
  return (
    <div>
      <SavingDeductionForm isEdit={isEdit} />
    </div>
  );
};

export default Saving;
