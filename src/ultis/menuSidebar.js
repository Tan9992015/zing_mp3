import icons from "./icons" 
const {MdOutlineLibraryMusic,MdOutlineFeed,RiDonutChartLine,TbChartArcs} = icons
export const menuSidebar = [
    {
        path : 'mymusic',
        text : 'cá nhân',
        icon : <MdOutlineLibraryMusic size={24}/>
    },
    {
        path : '',
        text : 'khám phá',
        end : true,
        icon : <TbChartArcs size={24}/>
    },
    {
        path : 'zingchart',
        text : '#zingchart',
        icon : <RiDonutChartLine size={24}/>
    },
    {
        path : 'follow',
        text : 'theo dõi',
        icon : <MdOutlineFeed size={24}/>
    },
]