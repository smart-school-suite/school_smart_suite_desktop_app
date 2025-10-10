import Table from "../../components/Tables/Tables";
import { electionTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { useGetElections } from "../../hooks/election/useGetElections";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import React, { useState } from "react";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import { DeleteIcon, DetailsIcon, UpdateIcon } from "../../icons/ActionIcons";
import ElectionDetails from "../../ModalContent/Elections/ElectionDetails";
import DeleteElection from "../../ModalContent/Elections/DeleteElection";
import UpdateElection from "../../ModalContent/Elections/UpdateElection";
import LiveElection from "./LiveElection";
import { LiveIcon } from "../../icons/Icons";
function ElectionResults() {
  return (
    <>
    
    </>
  );
}
export default ElectionResults;
