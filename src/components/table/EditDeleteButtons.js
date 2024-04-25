import React from "react";
import { FiEdit, FiTrash2, FiZoomIn } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const EditDeleteButtons = ({
    id,
    title,
    handleUpdate,
    handleModalOpen,
    isCheck,
    product,
    parent,
    children,
}) => {
    const { t } = useTranslation();

    // Logging id and title
    console.log("ID:", id);
    console.log("Title:", title);

    return (
        <>
            <div className="flex justify-end text-right">
                {children?.length > 0 ? (
                    <>
                        <Link
                            to={`/categories/${id}`}
                            className="p-2 cursor-pointer text-gray-400 hover:text-green-600 focus:outline-none"
                        >
                            <Tooltip
                                id="view"
                                Icon={FiZoomIn}
                                title={t("View")}
                                bgColor="#10B981"
                            />
                        </Link>

                        <button
                            disabled={isCheck?.length > 0}
                            onClick={() => handleUpdate(id)}
                            className="p-2 cursor-pointer text-gray-400 hover:text-green-600 focus:outline-none"
                        >
                            <Tooltip
                                id="edit"
                                Icon={FiEdit}
                                title={t("Edit")}
                                bgColor="#10B981"
                            />
                        </button>
                    </>
                ) : (
                    <button
                        disabled={isCheck?.length > 0}
                        onClick={() => handleUpdate(id, title)}
                        className="p-2 cursor-pointer text-gray-400 hover:text-green-600 focus:outline-none"
                    >
                        <Tooltip
                            id="edit"
                            Icon={FiEdit}
                            title={t("Edit")}
                            bgColor="#10B981"
                        />
                    </button>
                )}

                <button
                    disabled={isCheck?.length > 0}
                    onClick={() => handleModalOpen(id, title, product)}
                    className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                >
                    <Tooltip
                        id="delete"
                        Icon={FiTrash2}
                        title={t("Delete")}
                        bgColor="#EF4444"
                    />
                </button>
            </div>
        </>
    );
};

export default EditDeleteButtons;
