// Component Import
import Search from "../components/Search";
// Custom Hook Import
import useResizer from "./customHooks/useResizer";



export function MobileSearchRenderer(){ 
    const [mobileWidthBreakPoint, screenWidth] = useResizer()
    return (
        <> {screenWidth <= mobileWidthBreakPoint && <Search searchClass={'search--isMobile'}/> } </>
    )
}

export function LargerScreenSearchRenderer({toggleSuggestionModal, searchSuggestionModalOpen}){
    const [mobileWidthBreakPoint, screenWidth] = useResizer()
    return (
        <> {screenWidth >= mobileWidthBreakPoint && <Search toggleSuggestionModal={toggleSuggestionModal} searchSuggestionModalOpen={searchSuggestionModalOpen}/> } </>
    )
}