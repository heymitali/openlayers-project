import { useState } from "react";
import { lineString } from "../utils/constants";
import WPTable from "./WPTable";

const ActionPanel = ({ drawing, setDrawType, addCoords }) => {
    const [missionModalOpen, setMissionModalOpen] = useState(false);

    const handleDraw = (type) => {
        setDrawType(type);
        setMissionModalOpen(true);
    };

    return (
        <div className="float-right">
            {!missionModalOpen && <div className="flex justify-end p-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDraw(lineString)}
                >
                    Draw
                </button>
            </div>}
            {missionModalOpen && (
                <div className="">
                    <div className="bg-gray-100 rounded-xl w-96 ">

                        <div className="text-lg font-semibold flex justify-between border-b border-gray-300 p-2 shadow-md">
                            <div>
                                Mission Creation
                            </div>
                            <div className="text-gray-400 flex items-center hover:cursor-pointer mr-1 hover:text-gray-600"
                                onClick={() => setMissionModalOpen(false)}
                            >
                                x
                            </div>

                        </div>


                        <div className="p-2 border-b border-gray-300">
                            <div className="flex justify-start p-2 mb-1">
                                Waypoint Navigation
                            </div>

                            {
                                drawing?.coords?.length > 0 &&
                                <div className="p-2 border-b border-gray-300">
                                    <WPTable drawing={drawing} />
                                </div>

                            }

                            <div className="p-2 border-dashed border-2 border-gray-300 rounded-md bg-gray-200">
                                Click on the map to mark points of the route and the press ↵ to complete the route.
                            </div>


                        </div>


                        <div className="p-2 flex justify-end">
                            <button className="bg-[#4f46e5] hover:bg-[#6366f1] text-white  py-2 px-4 rounded">
                                Generate Data
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default ActionPanel;