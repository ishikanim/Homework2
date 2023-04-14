import Link from "next/link"


export default function ErrorPageNotFound(){
    return(
        <>
        <div>
        <h1>404ERROR PAGE DOES NOT EXIST</h1>
        <Link href='/'>Return to Home Page</Link>
        </div>
        </>
    )
}