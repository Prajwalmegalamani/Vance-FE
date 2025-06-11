import React, { useState, useEffect } from "react";
import { FaUser, FaUsers } from "react-icons/fa6";
import { MdCampaign } from "react-icons/md";
import UsersComponent from "../components/UsersComponent";
import CampaignsComponent from "../components/CampaignComponent";
import AuthenticatedProfilesComponent from "../components/AuthenticatedProfilesComponent";
import { storage } from "../lib/storage";

const LandingPage: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
    role: string[];
  } | null>(null);
  const [userRole, setUserRole] = useState<string[]>([]);

  useEffect(() => {
    const user = storage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      setUserRole(JSON.parse(user).role);
    }
  }, []);

  {
    /**
   TODO 7A :: Handle the UI rendering based on the user roles
   1. Render the UsersComponent by default, if the signed in user does not have any access
   2. Render both UsersComponent and CampaignsComponent, if the signed in user has CAMPAIGN_MANAGER Role access
   3. Render all UsersComponent, CampaignsComponent and AuthenticatedProfileComponent, if the signed in user has ADMIN role access

   - DONE
   */
  }

  const tabs = [
    {
      label: "Users",
      icon: <FaUsers />,
      component: <UsersComponent />,
      roles: ["USER", "ADMIN", "CAMPAIGN_MANAGER"],
      backgroundColor: "bg-white",
    },
    {
      label: "Campaigns",
      icon: <MdCampaign />,
      component: <CampaignsComponent />,
      roles: ["CAMPAIGN_MANAGER", "ADMIN"],
      backgroundColor: "bg-[#111111]",
    },
    {
      label: "Authenticated Profiles",
      icon: <FaUser />,
      component: <AuthenticatedProfilesComponent />,
      roles: ["ADMIN"],
      backgroundColor: "bg-[#111111]",
    },
  ];

  // Handle Tab Clicks
  const handleTabClick = (index: number) => {
    setActiveScreen(index);
  };

  // Optional Scroll Behavior : Comment this if this bothers you.
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0 && activeScreen < tabs.length - 1) {
        setActiveScreen((prev) => prev + 1);
      } else if (event.deltaY < 0 && activeScreen > 0) {
        setActiveScreen((prev) => prev - 1);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [activeScreen, tabs.length]);

  return (
    <div className="h-screen w-full flex flex-1 flex-col justify-start items-start bg-[#111111] text-white px-40 py-10">
      <div className="w-full h-full">
        {/*Tabs Rendering*/}
        <div className="flex flex-row justify-stretch items-stretch gap-4 bg-[#81EBAB] p-1 rounded-full z-50">
          {tabs.map(
            (tab, index) =>
              Array.isArray(userRole) &&
              tab.roles.some((role) => userRole.includes(role)) && (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`flex flex-row items-center justify-center gap-2 px-4 py-2 font-semibold ${
                    activeScreen === index
                      ? "text-white bg-[#222222] rounded-full"
                      : "text-[#111111]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.icon}
                </button>
              )
          )}
        </div>
        {/**
       TODO 7B:: Handle the UI rendering based on the user roles
        1. Render the UsersComponent by default, if the signed in user does not have any access
        2. Render both UsersComponent and CampaignsComponent, if the signed in user has CAMPAIGN_MANAGER Role access
        3. Render all UsersComponent, CampaignsComponent and AuthenticatedProfileComponent, if the signed in user has ADMIN role access

        - DONE

        */}
        {activeScreen === 0 && tabs[0].component}
        {activeScreen === 1 && tabs[1].component}
        {activeScreen === 2 && tabs[2].component}
      </div>
    </div>
  );
};

export default LandingPage;
