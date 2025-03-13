"use client";

import { ActionTooltip } from "./action-tooltip";
import { IoIosAdd } from "react-icons/io";
export const NavigationAction = () => {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button className="group flex items-center">
          <div
            className="flex m-3 h-[48px] w-[48px] rounded-[24px] 
          group-hover:rounded-[16px] transition-all overflow-hidden 
          items-center justify-center bg-background
           group-hover:bg-emerald-500"
          >
            <IoIosAdd
              className="group-hover:text-white transition  "
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
