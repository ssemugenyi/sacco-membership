import React from "react";
import MembershipForm from "../../components/Forms/MembershipForm";

const Membership = ({ isEdit }: { isEdit?: boolean }) => {
  return (
    <div>
      <MembershipForm isEdit={isEdit} />
    </div>
  );
};

export default Membership;
