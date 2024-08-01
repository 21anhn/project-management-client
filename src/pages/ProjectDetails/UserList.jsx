import { assignedUserToIssue } from "@/Redux/Issue/Action";
import { store } from "@/Redux/Store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({ issueDetails }) => {
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);
  const handleAssignIssueToUser = (userId) => {
    dispatch(assignedUserToIssue({issueId: issueDetails.id, userId}))
  };
  return (
    <>
      <div className="space-y-2">
        <div className="border rounded-md">
          <p className="py-2 px-3">{issueDetails.assignee?.fullName || "Unassigned"}</p>
        </div>
        {project.projectDetails?.team.map((item) => (
          <div
          onClick={() => handleAssignIssueToUser(item.id)}
            key={item}
            className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4"
          >
            <Avatar>
              <AvatarFallback>{item.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {item.fullName}
              </p>
              <p className="text-sm text-muted-foreground">
                @{item.fullName.toLowerCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;