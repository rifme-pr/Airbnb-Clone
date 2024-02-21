
import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
    currentUser?: SafeUser | null;
}


const NavBar: React.FC<NavbarProps> = ({currentUser}) => {
    console.log({currentUser});
    
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-2">
                <Container>
                    <div
                        className="flex flex-row items-center justify-between">
                        <Logo></Logo>
                        <Search></Search>
                        <UserMenu currentUser={currentUser}></UserMenu>
                    </div>
                    <Categories></Categories>
                </Container>
            </div>
        </div>
    );
};

export default NavBar;