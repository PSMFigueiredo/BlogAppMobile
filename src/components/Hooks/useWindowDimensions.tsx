// import {useEffect, useState} from "react";
// import { Dimensions } from 'react-native'
//
// export const useWindowDimensions = () => {
//     const [windowDimensions, setWindowDimensions] = useState({
//         screenHeight: Dimensions.get('window').height,
//         screenWidth: Dimensions.get('window').width,
//     });
//     useEffect(() => {
//         const handleResize = () => {
//             setWindowDimensions({
//                 screenHeight: Dimensions.get('window').height,
//                 screenWidth: Dimensions.get('window').width,
//             });
//         };
//
//         Dimensions.addEventListener('change', handleResize);
//
//         return () => {
//             Dimensions.removeEventListener('change', handleResize);
//         }
//     }, []);
//
//     return windowDimensions;
// };