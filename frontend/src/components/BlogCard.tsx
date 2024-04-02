

export interface BlogCardProps{
    authorName: string;
    title: string;
    content: string;
    publishedDate:string
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps) => {
    return <div className=" p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div>
            <Avatar></Avatar> 
            <div className="font-md text-slate-500 pl-2 text-sm inline-block">{authorName}</div>
            <div className="pl-2 text-sm text-slate-400 inline-block">{publishedDate} </div>
        </div>
        <div className="text-2xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-lg text-slate-600">
            {content}
        </div>
        <div className=" text-slate-400 text-sm font-md pt-2">
            {`${Math.ceil(content.length/100)} minute read`}
        </div>
        
    </div>
    
}


function Avatar() {
    return <div className=" inline-block relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <svg className="absolute w-8 h-8 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
    </div>
    
}

export function Avatar1() {
    return (
            <div className=" relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
            </div>
    );
}
    