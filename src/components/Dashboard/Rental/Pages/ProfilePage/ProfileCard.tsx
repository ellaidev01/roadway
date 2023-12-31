import { Button } from "antd";
import React from "react";
import { UserProfileObj } from "./ProfilePage";

type ProfileCardProps = {
  handleEdit: () => void;
  userProfile?: UserProfileObj[];
  isCountriesError: boolean;
  isStatesError: boolean;
  isCitiesError: boolean;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  handleEdit,
  userProfile,
  isCountriesError,
  isStatesError,
  isCitiesError,
}) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between">
        {!Array.isArray(userProfile) && <p>Error Fetching data. please check your network.</p>}
        {Array.isArray(userProfile) &&
          userProfile?.map((user) => (
            <div key={user?.uid} className="flex mt-2 ml-2 gap-4">
              <div className="space-y-2">
                <div className="flex space-x-1">
                  <p className="text-gray-500">Name:</p>
                  <p>{user?.name}</p>
                </div>
                <div className="flex space-x-1">
                  <p className="text-gray-500">Mobile No:</p>
                  <p>{user?.mobile}</p>
                </div>
                {/* <div>
                <p className="text-gray-500">Additional Mobile No:</p>
                <p className="font-semibold">9348534543</p>
              </div> */}
                <div className="flex space-x-1">
                  <p className="text-gray-500">Email:</p>
                  <p className="font-semibold">{user?.email}</p>
                </div>
                {/* <div>
              <p className="text-gray-500">Organization:</p>
              <p className="font-semibold">not included</p>
            </div> */}
                <div className="flex space-x-1">
                  <p className="text-gray-500">Address:</p>
                  <p className="font-semibold">{user?.address}</p>
                </div>
                {/* <div>
              <p className="text-gray-500">PinCode:</p>
              <p className="font-semibold">{user?.pincode || "not included"}</p>
            </div> */}
                <div className="flex space-x-1">
                  <p className="text-gray-500">City:</p>
                  {isCitiesError ? (
                    <div className="text-sm text-red-500">
                      Error Fetching Cities
                    </div>
                  ) : (
                    <p className="font-semibold">{user?.city}</p>
                  )}
                </div>
                <div className="flex space-x-1">
                  <p className="text-gray-500">State:</p>
                  {isStatesError ? (
                    <div className="text-sm text-red-500">
                      Error Fetching States
                    </div>
                  ) : (
                    <p className="font-semibold">{user?.state}</p>
                  )}
                </div>
                <div className="flex space-x-1">
                  <p className="text-gray-500">Country:</p>
                  {isCountriesError ? (
                    <div className="text-sm text-red-500">
                      Error Fetching Countries
                    </div>
                  ) : (
                    <p className="font-semibold">{user.country}</p>
                  )}
                </div>
                {/* <div>
              <p className="text-gray-500">Website/URL_1:</p>
              <p className="font-semibold">not included</p>
            </div> */}
              </div>
            </div>
          ))}
        <div className="mt-2 ml-2 space-x-2 flex flex-col md:flex-row">
          <Button onClick={handleEdit} className="color-btn">
            Edit
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
