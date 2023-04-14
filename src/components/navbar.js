import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"

export function NavBar(){
    return (
        


        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className = "navbar-item" href = "/">Ishika's Task App</Link>

            </div>
            <div className="navbar-menu">
                <Link className="navbar-item" href="/todos/">Tasks</Link>
                <Link className="navbar-item" href="/done/">Finished Tasks</Link>
            </div>
            <div className="navbar-end">
                <div className="buttons">
                    <SignedIn>
                        <UserButton className="button is-primary" afterSignOutUrl="/"/>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton className="button is-primary" redirectUrl="/todos/">Log In</SignInButton>
                    </SignedOut>
                </div>
            </div>
            
            
        </nav> 
        



    )   
}