// import React, {createContext, useContext} from "react";
// import {useWindowDimensions} from "../components/Hooks/useWindowDimensions";
//
// const WindowDimensionsContext = createContext({
//     screenHeight: 0,
//     screenWidth: 0,
// });
//
// export const WindowDimensionsProvider: React.FC = ({ children }) => {
//     const dimensions = useWindowDimensions();
//     return (
//         <WindowDimensionsContext.Provider value ={dimensions}>
//             {children}
//         </WindowDimensionsContext.Provider>
//     );
// };
//
// export const useWindowDimensionsContext = () => useContext(WindowDimensionsContext);