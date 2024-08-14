import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import SideBar from "./sidebar";

const Header = () => {
    return (
        <Card>
            <CardContent className="justify-between items-center flex flex-row p-5">
                <Image src="/logo.png" height={18} width={120} alt="FSW Barver" />


                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SideBar />
                </Sheet>
            </CardContent>
        </Card>
    );
}

export default Header;