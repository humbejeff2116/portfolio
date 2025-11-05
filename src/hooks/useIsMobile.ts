import { useMediaQuery } from "usehooks-ts";


export function useIsMobile() {
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    return isSmallScreen;
}