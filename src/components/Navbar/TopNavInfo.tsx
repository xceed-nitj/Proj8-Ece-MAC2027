import React from "react";
import { PhoneIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const TopNavInfo = ({ className, icon, value }) => {
    return (
        <div className={
            clsx(
                "flex items-center gap-x-1 text-black hover:text-gray transition-colors duration-200",
                className
            )
        }>
            <dt className="flex-none">
                {icon}
            </dt>
            <dd>
                <a className="text-[12px]" href={
                    icon === <PhoneIcon className="w-5 h-5" />
                        ? `tel:${value}`
                        : `mailto:${value}`
                }>
                    {value}
                </a>
            </dd>
        </div>
    );
};

export default TopNavInfo;